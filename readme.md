# Istruzioni per l'Agente: Creazione Progetto "express-blog-intro"

Sei un assistente alla programmazione esperto in Node.js e Express. Il tuo compito è aiutarmi a creare l'infrastruttura base per un blog personale. Procedi passo dopo passo scrivendo il codice necessario e spiegando brevemente i passaggi.

## 1. Setup Iniziale
- Inizializza il progetto Node.js (genera il `package.json`).
- Installa la dipendenza `express`.
- Crea il file entrypoint dell'applicazione (es. `app.js`).

## 2. Configurazione Base e Rotta Root
- Importa Express e inizializza l'app.
- Metti il server in ascolto su una porta a tua scelta (es. 3000).
- Crea una rotta `GET` sull'endpoint `/` che restituisca esclusivamente questo testo semplice: `"Server del mio blog"`.

## 3. Creazione del Database (Array locale)
- Crea un array contenente almeno 5 oggetti che rappresentano i post del blog.
- Ogni oggetto post deve obbligatoriamente contenere queste proprietà:
  - `titolo` (Stringa)
  - `contenuto` (Stringa)
  - `immagine` (Stringa, usa un percorso relativo per simulare un file locale, es. `/images/ciambellone.jpg`)
  - `tags` (Array di stringhe)

## 4. Rotta Bacheca (API)
- Crea una rotta `GET` sull'endpoint `/bacheca`.
- Questa rotta deve restituire una risposta in formato JSON contenente l'array dei post appena creato (restituisci un oggetto con una chiave `posts` e la lunghezza dell'array).

## 5. Configurazione Asset Statici
- Configura l'applicazione Express per servire file statici.
- Usa una cartella chiamata `public` per gli asset statici (presumi che le immagini dei post si troveranno in `public/images/`). Assicurati che i path nell'array dei post siano coerenti con questa configurazione.

## 6. Test e Verifica
- Al termine della stesura del codice, forniscimi un breve riepilogo con gli URL esatti delle due rotte create (`/` e `/bacheca`), così che io possa testarli direttamente su Postman.