// Officina Didattica: card dei contenuti generate da dati/catalogo.json
//
// Uso in una pagina:
//   <div class="game-grid" data-catalogo="gioco" data-limite="3" data-segnaposto="3"></div>
//   <div class="filters" data-filtri></div>   (facoltativo: filtri per scuola, classe, materia)
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

  function valida(voce, tipo) {
    var ok = voce && voce.id && voce.titolo && voce.descrizione &&
      voce.tipo === tipo && voce.stato === "pubblicato" &&
      PERCORSO_VALIDO.test(voce.percorso || "") &&
      (!voce.copertina || IMMAGINE_VALIDA.test(voce.copertina));
    if (voce && voce.tipo === tipo && voce.stato === "pubblicato" && !ok) {
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
      cover.textContent = String(numero).padStart(2, "0");
    }

    body.appendChild(crea("div", "tag", dati.tag));
    body.appendChild(crea("h3", null, dati.titolo));
    body.appendChild(crea("p", null, dati.descrizione));

    if (dati.percorso) {
      var link = crea("a", "game-link", "Gioca ora →");
      link.href = new URL(dati.percorso, RADICE).href;
      body.appendChild(link);
    } else {
      body.appendChild(crea("span", "game-link", "In arrivo"));
    }

    card.appendChild(cover);
    card.appendChild(body);
    return card;
  }

  function datiCard(voce) {
    var parti = [voce.materia ? etichetta(voce.materia) : "Gioco"];
    if (classiDi(voce).length) parti.push(etichettaClassi(classiDi(voce)));
    return {
      tag: parti.join(" · "),
      titolo: voce.titolo,
      descrizione: voce.descrizione,
      percorso: voce.percorso,
      copertina: voce.copertina
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

  function avviaFiltri(contenitore, griglia, voci) {
    var scelta = { scuola: "", classe: "", materia: "" };
    var conteggio = crea("p", "filters-count");
    conteggio.setAttribute("aria-live", "polite");

    function corrisponde(voce, salta) {
      var classi = classiDi(voce);
      return (salta === "scuola" || !scelta.scuola || classi.some(function (c) {
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
        classiDi(v).forEach(function (c) {
          if (chiave === "classe" && (!scelta.scuola || leggiClasse(c).scuola === scelta.scuola)) trovati[c] = true;
          if (chiave === "scuola") trovati[leggiClasse(c).scuola] = true;
        });
      });
      var elenco = Object.keys(trovati);
      if (chiave === "scuola") return ordinaScuole(elenco);
      if (chiave === "classe") return ordinaClassi(elenco);
      return elenco.sort();
    }

    var GRUPPI = [
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

    function aggiorna() {
      var risultato = voci.filter(function (v) { return corrisponde(v); });
      disegna();
      conteggio.textContent = risultato.length === 1
        ? "1 gioco"
        : risultato.length + " giochi";
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
        var tipo = griglia.getAttribute("data-catalogo");
        var limite = Number(griglia.getAttribute("data-limite")) || Infinity;
        var segnaposto = Number(griglia.getAttribute("data-segnaposto")) || 0;
        var voci = catalogo.filter(function (v) { return valida(v, tipo); })
          .sort(function (a, b) {
            return (b.dataPubblicazione || "").localeCompare(a.dataPubblicazione || "");
          });
        var filtri = document.querySelector("[data-filtri]");

        if (filtri && limite === Infinity) {
          avviaFiltri(filtri, griglia, voci);
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
