Officina Didattica — Istruzioni operative
1. Identità del progetto
Nome: Officina Didattica  
Autore: Carlo Murru  
Ruolo: Animatore Digitale · Istituto Comprensivo Villamar
Claim: MATERIALI DA USARE. IDEE DA PROVARE.
Sottotitolo:  
Giochi, risorse didattiche, mappe, attività e intelligenza artificiale per imparare e insegnare meglio.
Officina Didattica è un hub didattico personale rivolto a studenti e docenti.  
I giochi HTML sono una delle categorie del progetto, non l’unico contenuto.
---
2. Principi generali
Il progetto deve essere:
gratuito;
semplice da mantenere;
pubblicato tramite GitHub Pages;
responsive;
accessibile;
progressivamente automatizzabile;
facilmente ampliabile;
indipendente dal singolo strumento di intelligenza artificiale.
Privilegiare:
HTML;
CSS;
JavaScript;
JSON.
Non introdurre framework, backend, database o dipendenze esterne se non esiste una reale necessità.
---
3. Stato attuale del repository
Il repository è ancora in fase iniziale.
Al momento può contenere solo pochi file e una struttura minima.  
Le cartelle indicate in questo documento rappresentano una struttura di riferimento futura e devono essere create solo quando diventano necessarie.
Non creare cartelle vuote o complessità inutili.
Struttura di riferimento:
```text
OfficinaDidattica/
├── CLAUDE.md
├── README.md
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── immagini/
│   ├── copertine/
│   └── icone/
├── dati/
│   └── catalogo.json
├── giochi/
├── mappe/
├── unita-didattiche/
├── materiali/
├── guide/
├── ia-didattica/
└── progetti/
```
---
4. Regole per file e cartelle
Usare nomi:
in minuscolo;
senza spazi;
senza accenti;
senza caratteri speciali;
separati da trattini.
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
I nomi devono descrivere chiaramente il contenuto.
---
5. Identità grafica
Lo stile deve essere:
pop editoriale, contemporaneo, adulto, energico e professionale.
Privilegiare:
tipografia grande;
geometrie nette;
blocchi di colore;
contrasti forti;
bordi marcati;
numerazioni editoriali coerenti;
layout puliti;
icone semplici.
Evitare:
estetica infantile;
abuso di emoji;
grafiche da scuola primaria;
decorazioni eccessivamente giocose;
card troppo “morbide” o da app per bambini;
incoerenze tra pagine.
Palette di riferimento:
blu elettrico;
fucsia/corallo;
giallo forte;
verde acceso;
nero;
bianco;
grigi neutri.
La grafica non deve compromettere leggibilità, accessibilità o usabilità.
---
6. Accessibilità
Standard di riferimento:
WCAG 2.2 livello AA, quando tecnicamente applicabile.
Verificare almeno:
contrasto del testo;
focus visibile da tastiera;
struttura semantica corretta;
presenza di `<main>`;
link “Salta al contenuto” nelle pagine principali;
pulsanti sufficientemente grandi;
testi alternativi per immagini significative;
navigazione comprensibile;
uso del colore non come unico indicatore;
assenza di overflow orizzontali;
messaggi dinamici annunciabili ai lettori di schermo quando necessario.
Nei giochi interattivi, gli esiti delle risposte devono essere accessibili anche a tecnologie assistive quando possibile.
---
7. Responsive design
Ogni modifica deve essere verificata su:
desktop;
tablet;
smartphone.
Il mobile non deve essere una semplice riduzione del desktop.
Controllare sempre:
menu;
dimensioni dei titoli;
spaziature;
pulsanti;
card;
immagini;
scrolling;
overflow;
leggibilità.
Su smartphone non eliminare funzioni di navigazione senza fornire un’alternativa, ad esempio un menu compatto.
---
8. Home page
La home deve mantenere questi elementi:
Officina Didattica;
Carlo Murru;
Animatore Digitale · Istituto Comprensivo Villamar;
claim “MATERIALI DA USARE. IDEE DA PROVARE.”;
sottotitolo ufficiale;
accesso Studenti;
accesso Docenti;
Risorse;
Giochi;
IA e Didattica;
Chi sono.
Gli elementi “Studenti”, “Docenti” e le principali categorie di risorse devono diventare progressivamente navigabili e funzionali, non solo decorativi.
Non usare link `#` permanenti per funzioni inesistenti: se una sezione non è disponibile, preferire testo non cliccabile o stato “in preparazione”.
---
9. CSS e componenti condivisi
Evitare di duplicare lo stesso stile in più pagine.
Quando il sito supera la singola pagina iniziale, usare un foglio di stile condiviso:
```text
assets/css/style.css
```
Le modifiche grafiche comuni devono essere centralizzate.
---
10. Gestione dei giochi HTML
Ogni gioco deve:
avere una propria cartella;
contenere un `index.html`;
aprirsi direttamente nel browser;
funzionare con GitHub Pages;
non richiedere download per essere utilizzato;
usare percorsi relativi corretti;
essere verificato anche da smartphone.
Prima della pubblicazione controllare:
presenza di `index.html`;
HTML, CSS e JavaScript;
percorsi relativi;
immagini;
audio;
file mancanti;
link;
errori JavaScript;
funzionamento del gioco;
responsive;
accessibilità di base;
presenza di un modo chiaro per tornare a Officina Didattica, salvo diversa scelta progettuale.
Non alterare la logica didattica di un gioco senza richiesta esplicita.
---
11. Procedura per un nuovo gioco
Quando viene aggiunto un nuovo gioco:
analizza la struttura dei file;
verifica che il gioco funzioni;
correggi solo problemi reali;
verifica il nome della cartella;
crea o completa i metadati;
aggiungi il contenuto al catalogo;
genera o aggiorna la relativa card;
verifica materia, classe/livello e destinatari;
collega eventuale copertina;
controlla il link pubblico;
verifica desktop e smartphone;
verifica accessibilità di base;
riepiloga le modifiche.
---
12. Catalogo dei contenuti
Il catalogo strutturato deve essere centralizzato in:
```text
dati/catalogo.json
```
Non duplicare manualmente i dati del catalogo in più file quando non necessario.
Schema di riferimento per ogni contenuto:
```json
{
  "id": "battaglia-frazioni",
  "titolo": "Battaglia delle frazioni",
  "tipo": "gioco",
  "materia": "matematica",
  "classe": ["1-secondaria"],
  "destinatari": ["studenti"],
  "descrizione": "Gioco interattivo sul confronto tra frazioni.",
  "percorso": "giochi/battaglia-frazioni/",
  "copertina": "assets/copertine/battaglia-frazioni.webp",
  "autore": "Carlo Murru",
  "stato": "pubblicato",
  "dataPubblicazione": "2026-10-24",
  "paroleChiave": ["frazioni", "matematica", "confronto"]
}
```
Campi obbligatori
`id`
`titolo`
`tipo`
`descrizione`
`percorso`
`autore`
`stato`
Tipi ammessi
`gioco`
`mappa`
`unita-didattica`
`scheda`
`guida`
`risorsa`
`attivita`
`articolo`
`report`
`strumento`
Destinatari ammessi
`studenti`
`docenti`
`entrambi`
Stati ammessi
`bozza`
`in-revisione`
`pubblicato`
`archiviato`
Data
Formato:
```text
YYYY-MM-DD
```
Materia
Usare valori coerenti e stabili, ad esempio:
`matematica`
`italiano`
`scienze`
`storia`
`geografia`
`educazione-civica`
`tecnologia`
`arte`
`musica`
`interdisciplinare`
Aggiungere nuovi valori solo quando serve realmente.
---
13. Workflow Git e pubblicazione
Principio generale:
Claude può preparare modifiche; Carlo approva la pubblicazione.
Non modificare automaticamente `main` per attività rilevanti se esiste un flusso di revisione disponibile.
Workflow preferito:
```text
modifica
↓
branch dedicato
↓
controllo
↓
pull request
↓
approvazione di Carlo
↓
merge su main
↓
GitHub Pages
```
Per modifiche minime e manuali può essere usato `main`, ma l’automazione futura deve privilegiare branch e pull request.
I messaggi di commit devono essere chiari e descrittivi.
Esempi:
```text
Aggiunge catalogo JSON iniziale
Corregge menu mobile della home
Pubblica gioco battaglia-frazioni
Aggiorna accessibilità della home
```
Evitare messaggi generici come:
```text
Update index.html
Changes
Fix
```
---
14. Google Drive e flusso dei materiali
Google Drive è l’archivio dei materiali originali e di lavoro.
GitHub contiene invece ciò che serve alla pubblicazione web.
Flusso di riferimento:
```text
Google Drive
↓
materiale originale o da pubblicare
↓
controllo e preparazione
↓
repository GitHub
↓
revisione
↓
pubblicazione
```
Non cancellare o sovrascrivere materiali originali su Drive durante il processo di pubblicazione.
Quando un file viene trasferito o adattato per il sito:
mantenere l’originale;
creare una versione web separata se necessario;
usare nomi coerenti;
registrare il contenuto nel catalogo.
---
15. Paternità dei contenuti
I materiali didattici originali sono prodotti da Carlo Murru.
L’IA può supportare:
organizzazione;
sviluppo tecnico;
classificazione;
impaginazione;
pubblicazione;
metadati;
controllo;
ricerca;
sintesi;
automazione.
Non attribuire automaticamente all’IA la paternità dei materiali originali.
Non modificare contenuti didattici sostanziali senza richiesta.
---
16. Licenze
Il progetto può contenere due categorie diverse:
Codice
Il codice del sito e dei giochi può avere una licenza software separata.
Materiali didattici
I materiali didattici originali possono avere una licenza Creative Commons separata.
Non applicare automaticamente una licenza senza decisione esplicita di Carlo Murru.
Quando la licenza verrà definita:
aggiungere `LICENSE`;
indicare chiaramente cosa copre;
evitare ambiguità tra codice e materiali.
---
17. Privacy
Principio iniziale:
Officina Didattica non raccoglie dati personali degli studenti e non utilizza sistemi di tracciamento finché non viene esplicitamente deciso diversamente.
Per ora evitare:
account studenti;
login;
profilazione;
cookie pubblicitari;
analytics non necessari;
raccolta di dati personali.
Se in futuro vengono introdotti:
statistiche;
newsletter;
moduli;
servizi esterni;
autenticazione;
strumenti di terze parti;
verificare prima gli impatti su privacy, cookie e trattamento dei dati.
---
18. IA e Didattica
La sezione deve raccogliere progressivamente:
novità;
strumenti;
guide;
prompt;
esperienze;
casi d’uso;
report periodici.
Principio editoriale:
Meno teoria astratta. Più strumenti da provare.
Per contenuti derivati da articoli esterni:
non ripubblicare integralmente testi altrui;
creare sintesi originali;
citare chiaramente la fonte;
rimandare all’articolo originale;
non inventare dati, fonti, autori o citazioni.
I report automatici devono inizialmente essere prodotti come:
```text
bozza
↓
revisione di Carlo
↓
pubblicazione
```
Solo dopo una fase di verifica può essere valutata una pubblicazione automatica per contenuti specifici e a basso rischio.
---
19. Modalità di lavoro
Prima di modificare il repository:
analizza i file coinvolti;
comprendi la struttura esistente;
confronta la richiesta con questo documento;
preserva ciò che funziona;
evita modifiche non richieste;
valuta l’impatto sui collegamenti esistenti.
Durante le modifiche:
privilegia soluzioni semplici;
evita codice ridondante;
evita duplicazioni;
mantieni coerenza grafica;
mantieni compatibilità con GitHub Pages;
non introdurre dipendenze inutili;
non cambiare URL pubblici già funzionanti senza necessità.
Dopo le modifiche:
verifica i link;
verifica eventuali errori;
controlla il responsive;
controlla accessibilità di base;
controlla che i giochi continuino a funzionare;
riepiloga cosa è stato modificato;
segnala eventuali problemi ancora aperti.
---
20. Priorità
Seguire questo ordine:
funzionamento;
semplicità;
chiarezza;
accessibilità;
esperienza utente;
coerenza grafica;
automazione;
possibilità di crescita futura.
L’automazione non deve compromettere l’affidabilità.
---
21. Principio di indipendenza
Officina Didattica non deve dipendere da Claude.
Il codice resta su GitHub.
I materiali originali restano negli archivi di Carlo Murru.
Le regole operative restano in questo file.
I dati strutturati restano nel repository.
Le decisioni importanti devono essere documentate.
In caso di conflitto tra altre istruzioni operative e questo file, per il repository prevale `CLAUDE.md`.
