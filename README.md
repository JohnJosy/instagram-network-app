# instagram-network-app
App con autenticazione Token Instagram

#Creo Cartella Progetto NODE INSTAGRAM APP

##Creo il progetto da Terminale con 'npm init --yes' => Crea package.json dove ci sono le informazioni dell'app con moduli utilizzati (nome, versione, autore)

##Installo il framewoork EXPRESS per gestire alcune chiamate di nodeJs (npm i express)

##Installo MORGAN dipendenza di EXPRESS serve per eseguire un log delle richieste fatte dall'utente(pagine che ha ceracto di visitare)

##Installo un template-enjine (hbs, handlebars, ejs) per creare html 

##Installo node-instagram che mi permette di fare petizioni a insagram per sapere da dati del profilo il nome_utente foto etc

## Dobbiamo far loggare l'utente ad instagram (non vogliamo che l'utente si debba loggare ogni volta coosì salviamo i dati in un cookie) ed utilizziamo cookie-session(si puo anche salvare nella memoria del server o in DATaBASE)

##Per non dover riavviare il serve ogni volta installo nodemon (lo salvo come dipendenza di sviluppatore e non come dipendenza principale) npm i nodemon -D 
###Configuro NodeMon per eviatre di riavviare il server manualmente, vado nel file package.json e nella chiave "script" e aggiungiamo il valore "dev":"nodemon src/index.js" => da terminale eseguo: npm run dev

##Creo la cartella src dove inserirò tutti i file della mia app

##Dentro SRC creo il file app.js => file del SERVER

##Creo un altro file keys.js in cui inserisco le chiavi segrete ed il token dei servizi che andrò ad utilizzare

##Creo la cartella views per inviare viste all'utente
##senza routes non posso inviare viste
##Creo la cartella routes per gestire le views (nella cartella routes inserimo le URL dell APP) esempio dentro routes/index.js esegue il routing all' home Page 

## Creo la cartella public per i file statici (css, img, fonts...)

## Riga - 2 - Creo primo collegamento di express const = express = require('express')

## - 3 - Dopo di chè inizializzo express() e lo salvo dentro app

## - 5 - Configuro una porta in ascolto app.set('cosa(port)', alla numer(3000))

##  Dopo di che utilizzo il meotdo LISTEN di app per dirgli dove deve mettersi in ascolto 

###  Creo i Middlewares sono funzioni che si eseguono prima di passarle alle routes (rotte links)

##  Creo le routes

##  Creo gli static file (cartella public)

## Ora Vado a richiamare il modulo MORGAN riga 4 => MORGAN è un MIDDLEWARE quindi lo richiamo nella sezione MIDDLEWARE app.use(morgan(dev)) richiamo morgan con il suo parametro DEV (in poche parole stiamo utilizzando MORGAN con la configurazione di DEVELOPER) in pratica ci fa federe nella console la richiesta che ha fatto l'utente

## Richiamo il modulo hbs per il templating 
### app.set('views', path.join(__dirname, 'views')); // Do il percorso di dove sti trovano el VIEWS (join unisce percorsi);(__dirname => ritorna lil percorso originale del progetto C:\Users\john\Desktop\codiceAggiornamenti\node\httpdocs\node-instagram-app\src\ concatenato 'views')
### app.set('view engine', 'hbs');//gli indico che deve prendere i file con estensione .hbs

## Eseguo il routing: Richiamo il modulo const indexRouter = require('./routes/index'); e nella parte dei routes utilizzo il modulo appena richiamato app.use('/', indexRouter)

## Dentro routes/login.js const Instagram = require('node-instagram').default // QUesto modulo serve per fare l'autenticazione dell'utente dentro la nostra App e per prendere i Dati

## Accedo con accessi del cliente che vuole far visualizzare i suo socialWall a https://www.instagram.com/developer/clients/manage/ per registrare un nuovo cliente => cliccare su Manage Clients => Register a New Client
### Una volta dentro, compilare alcuni : Nome Applicazione  (Do not use Instagram, IG, insta or gram in your app name)
### Dargli un "Website URL": di dove verrà vista la nostra App in questo caso gli passiamo il nostro server locale http://localhost:3000/
### Dopo di chè INSTAGRAM ci torna una risposta al nostro server quindi vuole una "Valid redirect URIs": nel nostro caso http://localhost:3000/handleauth => Instagram invierà qua i dati dopo l'autenticazione
## Una volta Registrata cliccare su MANAGE qui troviamo due dati IMPORTANTI => Client ID e Client Secret => in questo modo possiamo chiedere in maniera sicura dati ad Instagram

### Torno nel mio file keys.js ed inserisco i dati che ho appena generato => Creo un oggetto e lo exporto 
```javascript
module.exports = {
    instagram : {
        clientId: '******************',
        clientSecret: '**********',
    }
}
```

## Dentro /routes/login.js creo un Istanza Di Insagram e gli passo dentro le parentesi un oggetto di configurazione per l'esattezza devo pasasrgli il modulo creato in Keys.js
##// Facendo così richiamo il modulo instagram chiamato nel file /model/keys.js e accedo alle proprità {clientId, clientSecret} presenti dentro l'oggetto instagram
```javascript
const {clientId, clientSecret} = require('../model/keys').instagram  
```
## Creo Un Istanza di INSTAGRAM (modulo) mentre instagram è l'istanza del modulo INSTAGRAM;
```javascript
const instagram = new Instagram({
    clientId: clientId,
    clientSecret: clientSecret
}) 
```