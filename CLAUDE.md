# Officina Didattica — Istruzioni operative per Claude Code

## Identità del progetto

**Nome:** Officina Didattica  
**Autore:** Carlo Murru  
**Ruolo:** Animatore Digitale · Istituto Comprensivo Villamar

**Claim:** MATERIALI DA USARE. IDEE DA PROVARE.

**Sottotitolo:**  
Giochi, risorse didattiche, mappe, attività e intelligenza artificiale per imparare e insegnare meglio.

Officina Didattica è un hub didattico personale rivolto a studenti e docenti. I giochi HTML sono una delle categorie del progetto, non l'unico contenuto.

---

## Obiettivi tecnici

Il sito deve essere:

- gratuito;
- pubblicato tramite GitHub Pages;
- semplice da mantenere;
- veloce;
- responsive;
- accessibile;
- facilmente ampliabile;
- progressivamente automatizzabile;
- indipendente dal singolo modello di intelligenza artificiale.

Privilegiare, salvo reale necessità:

- HTML;
- CSS;
- JavaScript;
- JSON.

Non introdurre framework, backend, database o dipendenze esterne se non sono realmente necessari.

---

## Struttura del repository

Struttura di riferimento:

```text
OfficinaDidattica/
├── CLAUDE.md
├── index.html
├── giochi/
├── mappe/
├── unita-didattiche/
├── materiali/
├── guide/
├── ia-didattica/
├── progetti/
├── assets/
│   ├── immagini/
│   ├── copertine/
│   └── icone/
└── dati/
    └── catalogo.json
```

La struttura può evolvere, ma deve restare semplice, coerente e leggibile.

---

## Regole per file e cartelle

Usare nomi:

- in minuscolo;
- senza spazi;
- senza accenti;
- senza caratteri speciali;
- separati da trattini.

Esempio corretto:

```text
battaglia-frazioni
```

Evitare:

```text
Battaglia Frazioni
battaglia_frazioni
BattagliaFrazioni
```

---

## Identità grafica

Lo stile deve essere **pop editoriale, contemporaneo, adulto, energico e professionale**.

Privilegiare:

- tipografia grande;
- geometrie nette;
- blocchi di colore;
- contrasti forti;
- bordi marcati;
- numerazioni editoriali;
- layout puliti;
- icone semplici.

Evitare:

- estetica infantile;
- abuso di emoji;
- grafiche da scuola primaria;
- decorazioni eccessivamente giocose;
- interfacce visivamente confuse.

Palette di riferimento:

- blu elettrico;
- fucsia/corallo;
- giallo forte;
- verde acceso;
- nero;
- bianco;
- grigi neutri.

La grafica non deve mai compromettere leggibilità e usabilità.

---

## Responsive design

Ogni modifica deve essere verificata su:

- desktop;
- tablet;
- smartphone.

Il mobile non deve essere una semplice riduzione del desktop.

Controllare sempre:

- dimensione titoli;
- menu;
- spaziature;
- pulsanti;
- card;
- immagini;
- scrolling;
- leggibilità;
- eventuali overflow orizzontali.

---

## Gestione dei giochi HTML

Ogni gioco deve:

- avere una propria cartella;
- contenere un `index.html`;
- aprirsi direttamente nel browser;
- funzionare con GitHub Pages;
- non richiedere download per essere utilizzato;
- utilizzare correttamente percorsi relativi;
- essere verificato anche da smartphone.

Prima della pubblicazione controllare:

1. presenza di `index.html`;
2. HTML, CSS e JavaScript;
3. percorsi relativi;
4. immagini;
5. audio;
6. file mancanti;
7. link;
8. eventuali errori JavaScript;
9. funzionamento del gioco;
10. visualizzazione responsive.

---

## Procedura per un nuovo gioco

Quando viene aggiunto un nuovo gioco:

1. analizza la struttura dei file;
2. verifica che il gioco funzioni senza modifiche inutili;
3. correggi solo problemi reali;
4. crea o completa i metadati;
5. aggiungi il gioco al catalogo;
6. crea la relativa card o voce nel sito;
7. verifica materia, classe/livello e destinatari;
8. collega eventuale copertina;
9. controlla il link pubblico;
10. verifica desktop e smartphone.

Non alterare la logica didattica del gioco senza richiesta esplicita.

---

## Metadati dei contenuti

Ogni contenuto dovrebbe poter avere almeno:

- titolo;
- tipologia;
- materia;
- classe o livello;
- descrizione breve;
- destinatario;
- percorso;
- copertina;
- stato;
- autore;
- data di pubblicazione;
- parole chiave.

Tipologie possibili:

- gioco;
- mappa;
- unità didattica;
- scheda;
- guida;
- risorsa;
- attività;
- articolo;
- report;
- strumento.

Destinatari:

- studenti;
- docenti;
- entrambi.

Quando possibile, centralizzare questi dati in `dati/catalogo.json` evitando duplicazioni manuali.

---

## Home page

La home deve mantenere questi elementi fondamentali:

- Officina Didattica;
- Carlo Murru;
- Animatore Digitale · Istituto Comprensivo Villamar;
- claim “MATERIALI DA USARE. IDEE DA PROVARE.”;
- sottotitolo ufficiale;
- accesso Studenti;
- accesso Docenti;
- Risorse;
- Giochi;
- IA e Didattica;
- Chi sono.

Non rimuovere o modificare questi elementi senza richiesta esplicita.

---

## IA e Didattica

La sezione deve raccogliere progressivamente:

- novità;
- strumenti;
- guide;
- prompt;
- esperienze;
- casi d'uso;
- report periodici.

Principio editoriale:

**Meno teoria astratta. Più strumenti da provare.**

Per contenuti derivati da articoli esterni:

- non ripubblicare integralmente testi altrui;
- creare sintesi originali;
- citare chiaramente la fonte;
- rimandare all'articolo originale;
- non inventare dati, fonti, autori o citazioni.

I report automatici devono inizialmente essere prodotti come bozze da sottoporre ad approvazione umana.

---

## Paternità dei contenuti

I materiali didattici originali sono prodotti da Carlo Murru.

L'IA può supportare:

- organizzazione;
- sviluppo tecnico;
- classificazione;
- impaginazione;
- pubblicazione;
- metadati;
- controllo;
- ricerca;
- sintesi;
- automazione.

Non attribuire automaticamente all'IA la paternità dei materiali originali e non modificare contenuti didattici sostanziali senza richiesta.

---

## Modalità di lavoro

Prima di modificare il repository:

1. analizza i file coinvolti;
2. comprendi la struttura esistente;
3. preserva ciò che funziona;
4. evita modifiche non richieste;
5. valuta l'impatto sui collegamenti esistenti.

Durante le modifiche:

- privilegia soluzioni semplici;
- evita codice ridondante;
- evita duplicazioni;
- mantieni coerenza grafica;
- mantieni compatibilità con GitHub Pages;
- non introdurre dipendenze inutili;
- non cambiare percorsi pubblici già funzionanti senza necessità.

Dopo le modifiche:

1. verifica i link;
2. verifica eventuali errori;
3. controlla il responsive;
4. controlla che i giochi continuino a funzionare;
5. riepiloga con chiarezza cosa è stato modificato;
6. segnala eventuali problemi ancora aperti.

---

## Priorità

Seguire questo ordine:

1. funzionamento;
2. semplicità;
3. chiarezza;
4. accessibilità;
5. esperienza utente;
6. coerenza grafica;
7. automazione;
8. possibilità di crescita futura.

L'automazione non deve compromettere l'affidabilità.

---

## Principio di indipendenza

Il progetto non deve dipendere da Claude.

- Il codice resta su GitHub.
- I materiali originali restano negli archivi di Carlo Murru.
- Le regole operative restano in questo file.
- I dati strutturati restano nel repository.
- Le decisioni importanti devono essere documentate.

Il progetto deve poter continuare a funzionare anche cambiando strumento di intelligenza artificiale.
