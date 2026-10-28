// Officina Didattica: card dei contenuti generate da dati/catalogo.json
//
// Uso in una pagina:
//   <div class="game-grid" data-catalogo="gioco" data-limite="3" data-segnaposto="3"></div>
//   <div class="filters" data-filtri></div>   (facoltativo: filtri per destinatari, scuola, classe, materia)
//   La pagina accetta filtri iniziali dall'indirizzo, es. giochi/?per=studenti
(function () {
  // Radice del sito, ricavata dalla posizione di questo file (assets/js/)
  var RADICE = new URL("../../", document.currentScript.src);

  var PERCORSO_VALIDO = /^[a-z0-9-]+(\/[a-z0-9-]+)*\/?$/;
  var IMMAGINE_VALIDA = /^[a-z0-9-]+(\/[a-z0-9-]+)*\.(webp|png|jpg|jpeg|svg)$/;
  var ORDINE_SCUOLE = ["infanzia", "primaria", "secondaria"];

  function crea(tag, classe, testo) {
    var el = document.createElement(tag);
    if (classe) el.className = classe;
    if (testo) el.textContent = testo;
    return el;
  }

  function etichetta(valore) {
    var testo = String(valore).replace(/-/g, " ");
    return testo.charAt(0).toUpperCase() + testo.slice(1);
  }

  // "2-secondaria" → { numero: 2, scuola: "secondaria" }; "infanzia" → { numero: 0, scuola: "infanzia" }
  function leggiClasse(valore) {
    var parti = /^(\d)-([a-z-]+)$/.exec(valore);
    return parti
      ? { numero: Number(parti[1]), scuola: parti[2] }
      : { numero: 0, scuola: valore };
  }

  function etichettaClasse(valore) {
    var c = leggiClasse(valore);
    return c.numero ? c.numero + "ª " + c.scuola.replace(/-/g, " ") : etichetta(c.scuola);
  }

  // ["4-primaria", "5-primaria"] → "4ª, 5ª primaria"
  function etichettaClassi(classi) {
    var perScuola = {};
    classi.forEach(function (valore) {
      var c = leggiClasse(valore);
      (perScuola[c.scuola] = perScuola[c.scuola] || []).push(c.numero);
    });
    return ordinaScuole(Object.keys(perScuola)).map(function (scuola) {
      var numeri = perScuola[scuola].filter(Boolean).sort();
      var nome = scuola.replace(/-/g, " ");
      return numeri.length
        ? numeri.map(function (n) { return n + "ª"; }).join(", ") + " " + nome
        : etichetta(scuola);
    }).join(" · ");
  }

  function posizioneScuola(scuola) {
    var i = ORDINE_SCUOLE.indexOf(scuola);
    return i === -1 ? ORDINE_SCUOLE.length : i;
  }

  function ordinaScuole(scuole) {
    return scuole.sort(function (a, b) { return posizioneScuola(a) - posizioneScuola(b); });
  }

  function ordinaClassi(classi) {
    return classi.sort(function (a, b) {
      var ca = leggiClasse(a), cb = leggiClasse(b);
      return posizioneScuola(ca.scuola) - posizioneScuola(cb.scuola) || ca.numero - cb.numero;
    });
  }

  function classiDi(voce) {
    return Array.isArray(voce.classe) ? voce.classe : [];
  }

  // Un materiale per entrambi ha i due valori; "entrambi" resta accettato per compatibilità
  function destinatariDi(voce) {
    var d = Array.isArray(voce.destinatari) ? voce.destinatari : [];
    return d.indexOf("entrambi") !== -1 ? ["studenti", "docenti"] : d;
  }

  function valida(voce, tipo) {
    var ok = voce && voce.id && voce.titolo && voce.descrizione &&
      tipo.indexOf(voce.tipo) !== -1 && voce.stato === "pubblicato" &&
      PERCORSO_VALIDO.test(voce.percorso || "") &&
      (!voce.copertina || IMMAGINE_VALIDA.test(voce.copertina));
    if (voce && tipo.indexOf(voce.tipo) !== -1 && voce.stato === "pubblicato" && !ok) {
      console.warn("Voce del catalogo non valida:", voce.id || voce);
    }
    return ok;
  }

  function creaCard(numero, dati) {
    var card = crea("article", "game-card");
    var cover = crea("div", "game-cover");
    var body = crea("div", "game-body");

    if (dati.copertina) {
      var img = document.createElement("img");
      img.src = new URL(dati.copertina, RADICE).href;
      img.alt = "";
      cover.appendChild(img);
    } else {
      cover.textContent = dati.numero || String(numero).padStart(2, "0");
    }

    body.appendChild(crea("div", "tag", dati.tag));
    body.appendChild(crea("h3", null, dati.titolo));
    body.appendChild(crea("p", null, dati.descrizione));

    if (dati.percorso) {
      var link = crea("a", "game-link", dati.azione || "Gioca ora →");
      link.href = new URL(dati.percorso, RADICE).href;
      body.appendChild(link);
    } else {
      body.appendChild(crea("span", "game-link", "In arrivo"));
    }

    card.appendChild(cover);
    card.appendChild(body);
    return card;
  }

  // "2026-10-25" → "25 ottobre 2026"
  var MESI = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio",
    "agosto", "settembre", "ottobre", "novembre", "dicembre"];
  function dataEstesa(iso) {
    var p = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
    return p ? Number(p[3]) + " " + MESI[Number(p[2]) - 1] + " " + p[1] : "";
  }

  // Testi che cambiano con il tipo di materiale
  var TIPI = {
    gioco: { azione: "Gioca ora →", uno: "gioco", molti: "giochi", filtro: "Giochi" },
    mappa: { azione: "Apri la mappa →", uno: "mappa", molti: "mappe", filtro: "Mappe" },
    scheda: { azione: "Apri la scheda →", uno: "scheda", molti: "schede", filtro: "Schede" }
  };
  var TIPO_GENERICO = { azione: "Apri →", uno: "materiale", molti: "materiali" };

  function infoTipo(tipo) {
    return TIPI[tipo] || TIPO_GENERICO;
  }

  function datiCard(voce) {
    // Articoli e report: tipo e data al posto di materia e classe
    if (voce.tipo === "report" || voce.tipo === "articolo") {
      return {
        tag: [voce.rubrica || etichetta(voce.tipo), dataEstesa(voce.dataPubblicazione)].filter(Boolean).join(" · "),
        titolo: voce.titolo,
        descrizione: voce.descrizione,
        percorso: voce.percorso,
        copertina: voce.copertina,
        azione: "Leggi →",
        // Senza copertina, al posto del numero compare la data (es. 25.10)
        numero: (voce.dataPubblicazione || "").split("-").reverse().slice(0, 2).join(".")
      };
    }
    var parti = [voce.materia ? etichetta(voce.materia) : etichetta(voce.tipo)];
    if (classiDi(voce).length) parti.push(etichettaClassi(classiDi(voce)));
    return {
      tag: parti.join(" · "),
      titolo: voce.titolo,
      descrizione: voce.descrizione,
      percorso: voce.percorso,
      copertina: voce.copertina,
      azione: infoTipo(voce.tipo).azione
    };
  }

  function mostra(griglia, voci, segnaposto) {
    griglia.textContent = "";

    voci.forEach(function (voce, i) {
      griglia.appendChild(creaCard(i + 1, datiCard(voce)));
    });

    for (var n = voci.length; n < segnaposto; n++) {
      griglia.appendChild(creaCard(n + 1, {
        tag: "Prossimamente",
        titolo: n === voci.length ? "Nuovo gioco" : "Nuova attività",
        descrizione: n === voci.length
          ? "Un nuovo contenuto interattivo sarà presto disponibile."
          : "Altre attività e materiali verranno aggiunti progressivamente."
      }));
    }

    if (!voci.length && !segnaposto) {
      griglia.appendChild(crea("p", "game-grid-message",
        "Nessun gioco corrisponde a questa scelta. Prova a togliere un filtro."));
    }
  }

  // ---------- Filtri: scuola, classe, materia ----------

  function avviaFiltri(contenitore, griglia, voci, tipi) {
    var CHIAVI = ["tipo", "per", "scuola", "classe", "materia"];
    var parole = tipi.length === 1 ? infoTipo(tipi[0]) : TIPO_GENERICO;
    var parametri = new URLSearchParams(location.search);
    var scelta = {};
    CHIAVI.forEach(function (k) { scelta[k] = parametri.get(k) || ""; });
    var conteggio = crea("p", "filters-count");
    conteggio.setAttribute("aria-live", "polite");

    function corrisponde(voce, salta) {
      var classi = classiDi(voce);
      return (salta === "tipo" || !scelta.tipo || voce.tipo === scelta.tipo) &&
        (salta === "per" || !scelta.per || destinatariDi(voce).indexOf(scelta.per) !== -1) &&
        (salta === "scuola" || !scelta.scuola || classi.some(function (c) {
          return leggiClasse(c).scuola === scelta.scuola;
        })) &&
        (salta === "classe" || !scelta.classe || classi.indexOf(scelta.classe) !== -1) &&
        (salta === "materia" || !scelta.materia || voce.materia === scelta.materia);
    }

    // Valori disponibili per un filtro, tenendo conto degli altri già scelti
    function valori(chiave) {
      var trovati = {};
      voci.filter(function (v) {
        return chiave === "classe" ? corrisponde(v, "classe") : true;
      }).forEach(function (v) {
        if (chiave === "materia" && v.materia) trovati[v.materia] = true;
        if (chiave === "per") destinatariDi(v).forEach(function (d) { trovati[d] = true; });
        if (chiave === "tipo") trovati[v.tipo] = true;
        classiDi(v).forEach(function (c) {
          if (chiave === "classe" && (!scelta.scuola || leggiClasse(c).scuola === scelta.scuola)) trovati[c] = true;
          if (chiave === "scuola") trovati[leggiClasse(c).scuola] = true;
        });
      });
      var elenco = Object.keys(trovati);
      if (chiave === "scuola") return ordinaScuole(elenco);
      if (chiave === "classe") return ordinaClassi(elenco);
      if (chiave === "per") return ["studenti", "docenti"].filter(function (d) { return trovati[d]; });
      return elenco.sort();
    }

    var GRUPPI = [
      { chiave: "tipo", titolo: "Tipo", tutti: "Tutti", nome: function (t) { return infoTipo(t).filtro || etichetta(t); } },
      { chiave: "per", titolo: "Per chi", tutti: "Tutti", nome: etichetta },
      { chiave: "scuola", titolo: "Scuola", tutti: "Tutte", nome: etichetta },
      { chiave: "classe", titolo: "Classe", tutti: "Tutte", nome: etichettaClasse },
      { chiave: "materia", titolo: "Materia", tutti: "Tutte", nome: etichetta }
    ];

    function disegna() {
      contenitore.textContent = "";

      GRUPPI.forEach(function (g) {
        var opzioni = valori(g.chiave);
        if (opzioni.length < 2 && !scelta[g.chiave]) return;

        var gruppo = crea("div", "filter-group");
        gruppo.setAttribute("role", "group");
        var idTitolo = "filtro-" + g.chiave;
        var titolo = crea("span", "filter-label", g.titolo);
        titolo.id = idTitolo;
        gruppo.setAttribute("aria-labelledby", idTitolo);
        gruppo.appendChild(titolo);

        [""].concat(opzioni).forEach(function (valore) {
          var b = crea("button", "filter-button", valore ? g.nome(valore) : g.tutti);
          b.type = "button";
          b.setAttribute("aria-pressed", scelta[g.chiave] === valore ? "true" : "false");
          b.addEventListener("click", function () {
            scelta[g.chiave] = valore;
            if (g.chiave === "scuola") scelta.classe = "";
            aggiorna();
            var stesso = contenitore.querySelector('[data-filtro="' + g.chiave + ':' + valore + '"]');
            if (stesso) stesso.focus();
          });
          b.setAttribute("data-filtro", g.chiave + ":" + valore);
          gruppo.appendChild(b);
        });

        contenitore.appendChild(gruppo);
      });

      contenitore.appendChild(conteggio);
    }

    // Riporta i filtri scelti nell'indirizzo, così la pagina si può condividere
    function salvaIndirizzo() {
      var p = new URLSearchParams();
      CHIAVI.forEach(function (k) { if (scelta[k]) p.set(k, scelta[k]); });
      var query = p.toString();
      history.replaceState(null, "", location.pathname + (query ? "?" + query : ""));
    }

    function aggiorna() {
      salvaIndirizzo();
      var risultato = voci.filter(function (v) { return corrisponde(v); });
      disegna();
      conteggio.textContent = risultato.length === 1
        ? "1 " + parole.uno
        : risultato.length + " " + parole.molti;
      mostra(griglia, risultato, 0);
    }

    aggiorna();
  }

  // ---------- Avvio ----------

  var griglie = document.querySelectorAll("[data-catalogo]");
  if (!griglie.length) return;

  fetch(new URL("dati/catalogo.json", RADICE))
    .then(function (risposta) {
      if (!risposta.ok) throw new Error(risposta.status);
      return risposta.json();
    })
    .then(function (catalogo) {
      griglie.forEach(function (griglia) {
        var tipo = griglia.getAttribute("data-catalogo").split(",");
        var limite = Number(griglia.getAttribute("data-limite")) || Infinity;
        var segnaposto = Number(griglia.getAttribute("data-segnaposto")) || 0;
        // Dal più recente; a parità di data, prima l'ultimo aggiunto al catalogo
        var voci = catalogo.filter(function (v) { return valida(v, tipo); })
          .map(function (v, i) { return { voce: v, ordine: i }; })
          .sort(function (a, b) {
            return (b.voce.dataPubblicazione || "").localeCompare(a.voce.dataPubblicazione || "") ||
              b.ordine - a.ordine;
          })
          .map(function (x) { return x.voce; });
        var filtri = document.querySelector("[data-filtri]");

        if (filtri && limite === Infinity) {
          avviaFiltri(filtri, griglia, voci, tipo);
        } else {
          mostra(griglia, voci.slice(0, limite), segnaposto);
        }
      });
    })
    .catch(function () {
      griglie.forEach(function (griglia) {
        griglia.textContent = "";
        griglia.appendChild(crea("p", "game-grid-message",
          "Al momento non è possibile caricare l'elenco dei giochi. Riprova più tardi."));
      });
    });
})();
