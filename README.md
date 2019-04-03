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
##senza routes non posso inviare viste(gestisto gli URL)
##Creo la cartella routes per gestire le views (nella cartella routes inserimo le URL dell APP) esempio dentro routes/index.js esegue il routing all' home Page 

## Creo la cartella public per i file statici (css, img, fonts...)

## Riga - 2 - Creo primo collegamento di express const = express = require('express')

##  Dopo di chè inizializzo express() e lo salvo dentro app

##  Configuro una porta in ascolto app.set('cosa(port)', alla numer(3000))

##  Dopo di che utilizzo il meotdo LISTEN di app per dirgli dove deve mettersi in ascolto 

###  Creo i Middlewares sono funzioni che si eseguono prima di passarle alle routes (rotte links)

##  Creo le routes

##  Creo gli static file (cartella public)

## Ora Vado a richiamare il modulo MORGAN riga 6 => MORGAN è un MIDDLEWARE quindi lo richiamo nella sezione MIDDLEWARE app.use(morgan(dev)) richiamo morgan con il suo parametro DEV (in poche parole stiamo utilizzando MORGAN con la configurazione di DEVELOPER) in pratica ci fa federe nella console la richiesta che ha fatto l'utente

## Richiamo il modulo hbs per il templating 
###Il modulo path non c'è bisogno di installarlo perchè è già integrato con Node
### app.set('views', path.join(__dirname, 'views')); // Do il percorso di dove sti trovano el VIEWS (join unisce percorsi);(__dirname => ritorna lil percorso originale del progetto C:\Users\john\Desktop\codiceAggiornamenti\node\httpdocs\node-instagram-app\src\ concatenato 'views')
### app.set('view engine', 'hbs');//gli indico che deve prendere i file con estensione .hbs (per hbs)
###Per EXPRESS-HANDLEBARSS => utilizzo exphbs({defaultLayout: 'main}) per indicare dove si trova il file principale 
``` javascript
const exphbs  = require('express-handlebars')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine','handlebars')
app.set('views', path.join(__dirname, 'views'))
```

## Eseguo il routing: Richiamo il modulo const indexRouter = require('./routes/index'); e nella parte dei routes utilizzo il modulo appena richiamato app.use('/', indexRouter)

## Dentro routes/login.js const Instagram = require('node-instagram').default // QUesto modulo serve per fare l'autenticazione dell'utente dentro la nostra App e per prendere i Dati

## Accedo con accessi del cliente che vuole far visualizzare i suo socialWall a https://www.instagram.com/developer/clients/manage/ per registrare un nuovo cliente => cliccare su Manage Clients => Register a New Client
### Una volta dentro, compilare alcuni campi: Nome Applicazione  (Do not use Instagram, IG, insta or gram in your app name)
### Dargli un "Website URL": di dove verrà vista la nostra App in questo caso gli passiamo il nostro server locale http://localhost:3000/
### Dopo di chè INSTAGRAM ci torna una risposta al nostro server quindi vuole una "Valid redirect URIs": nel nostro caso http://localhost:3000/handleauth => Instagram invierà qua i dati dopo l'autenticazione
## Una volta Registrata cliccare su MANAGE qui troviamo due dati IMPORTANTI => Client ID e Client Secret => in questo modo possiamo chiedere in maniera sicura dati ad Instagram

### Torno nel mio file keys.js ed inserisco i dati che ho appena generato => Creo un oggetto e lo export 
```javascript
module.exports = {
    instagram : {
        clientId: '******************',
        clientSecret: '**********',
        accessToken: '**********'
    }
}
```
## Poi creo la rotta per il login /login in caso non siamo già autenticati non ci sarà bisogno altrimenti dobbiamo loggarci con autenticazione
## Dentro /routes/login.js creo un Istanza Di Insagram e gli passo dentro le parentesi un oggetto di configurazione per l'esattezza devo pasasrgli il modulo creato in Keys.js (tutto ciò per creare un autenticazione con Instagram)
## Facendo così richiamo il modulo instagram chiamato nel file /model/keys.js e accedo alle proprità {clientId, clientSecret} presenti dentro l'oggetto instagram
```javascript
const {clientId, clientSecret} = require('../model/keys').instagram  
```
## Creo Un Istanza di INSTAGRAM (modulo) mentre instagram è l'istanza del modulo INSTAGRAM; (questo modulo serve per far fare autenticazione a Instagram  al nostro utente dalla nostra App e per prendere dati)
```javascript
const instagram = new Instagram({
    clientId: clientId,
    clientSecret: clientSecret,
    accessToken: accessToken
}) //Grazie all'instanza 'instagram' Ora posso fare richieste all'aera sociale, quindi posso fare Login, Eseguire Autenticazioni, richiedereDati 
```
## Prima di chiedere dati devo autenticarmi e creo una rotta che serva ad autenticarmi /auth/instagram
###Prima di fare un autenticazione dobbiamo passare dei dati a Instagram; e passimao l'autorizzazione dentro /auth/instagram tramite SeverSide tramite asyc e await;Quando facciamo una richiesta a instagram eseguiamo un Redirect a un altra rotta redirectUri e la passiamo tramite il modulo e l'istanza di instagram salva dove arriveranno le mie richieste; salvo dentro redirectUri Url dove arriveranno le mie richieste cioe const redirectUri = http://localhost:3000/handleauth;  Come secondo parametro passo i dati che voglio ottenere da Instagram e creo un oggetto e gli chiedo che infomazioni voglio ottenere il numero di Likes post foto commenti ect; Con state: dico lo stato e serve per far funzionare la richiesta (fa parte della documentazione); Così in pratica una volta fatta l'autenticazione Reindirizziamo tutto su handleauth;(Instagram si occupa di eseguire il controllo se i dati sono validi)

``` javascript
const redirectUri = 'http://localhost:3000/handleauth';
 
// First redirect user to instagram oauth
// Handle auth code and get access_token for user
app.get('/auth/instagram', async (req, res) => {
  try {
        res.redirect(
            instagram.getAuthorizationUrl(redirectUri)
        )
    });
    // data.access_token contain the user access_token
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

```

## Creo la rotta in cui farò arrivare tutti i dati /handleauth => su handleauth farò reindirizzare la risposta che ho chiesto a /auth/instagram e mi ritorna un 'codice' che mi permetterà di eseguire un'altra richiesta a isntagram per prendere i dati
###Quindi prima di tutto ricevo il codice con ' const code = req.query.code' e salvo il codice che ricevo in 'code'; Ora con questa variabile code posso fare un'altra petizione Instagram e chiedo dati; Per chiedere dati a Instagram utilizzo chiamate asincrone e utlizzo async await prendo il codide 'code' e faccio un redirect ad handleauth una volta finito il processo
### I 'data' che ricevo li devo salvare da qualche parte per poterli richiedere (per poter chiedere foto post likes abbiamo bisogno di del access_token); così lo salvo nell'instanza di 'instagram' => 1. salvo dentr req.session.access_token = data.access_token; 2. Lo faccio anche per userId
``` javascript
const redirectUri = 'http://localhost:3000/handleauth' 
router.get('/handleauth', async (req, res) => {
    try {
        const code = req.query.code
        const data = await instagram.authorizeUser(code, redirectUri)
        req.session.accessToken = data.access_token
        req.session.userId = data.user.id// il token e user Id li salvo nella sessione del navigatore perchè mi permettono di eseguire richieste alle foto post di instgram
        console.log(data)
        res.json(data)//mostro i dati sulla pagina
    } catch (error) {
        console.log(error)
         res.json(e)
    }
})

```
##In App js creo il Middleware oer salvare dati nella cookies session
``` javascript

app.use(session({//Utilizzo per salvare i dati nel session cookies
    secret: 'Parola segreta', //Perchè la sessione non si alteri
    signed: true
}))

```
##Ora configuro all'istanza di Instagram (instagram) il Token e lo user Id  instagram.config.accessToken = req.session.accessToken instagram.config.userId =  req.session.userId

``` javascript
const redirectUri = 'http://localhost:3000/handleauth' 
router.get('/handleauth', async (req, res) => {
    try {
        const code = req.query.code
        const data = await instagram.authorizeUser(code, redirectUri)
        req.session.accessToken = data.access_token
        req.session.userId = data.user.id// il token e user Id li salvo nella sessione del navigatore perchè mi permettono di eseguire richieste alle foto post di instgram

        instagram.config.accessToken = req.session.accessToken
        instagram.config.userId =  req.session.userId

        console.log(data)
        res.json(data)//mostro i dati sulla pagina
    } catch (error) {
        console.log(error)
         res.json(e)
    }
})

```
##=> Una volta che prendo i dati e li passo a Instagram, alla fine reindirizzo con tuti i dati a '/profile '' 
``` javascript
    res.redirect('/profile')

```
##Ora che reindirizzatto a /profile devo portare i dati che avevo in '/handleauth' e da lì poi posso accedere a foto post ect  
###Prima di renderizzare la pagine devo fare prima una richiesta (non più di autenticazione perchè sono già autenticato)
``` javascript
    'use strict'
const router = require('express').Router()
const Instagram = require('node-instagram').default
const {clientId, clientSecret, accessToken} = require('../models/keys').instagram
const instagram = new Instagram({
    clientId: clientId,
    clientSecret: clientSecret,
    accessToken: accessToken
})
router.get('/', async (req, res) => {
    try {
        const media = await instagram.get('users/self/media/recent')//Con questo richiestaa instagram mi attacco al'endPonint di instagram per prendere i dati dei post(immagini likes ect)
        console.log('Dati Post: ', media )
        res.render('profile')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router

```
### Richiedo anche i dati del foto profilo nome utente ect
``` javascript
    const profileUserData = await instagram.get('users/self')
    console.log(profileUserData)

```
###Grazie ai dati che tiro fuori dalla console 'console.log('Dati Post: ', media )' posso recuperarli e usarli per mostrarli a video
``` javascript
    const profilePostsData = await instagram.get('users/self/media/recent')
    console.log(profilePostsData)

```
###Ora Stampo a video i miei dati grazie alla funzione 'res.render('profile') pasandogli un oggetto che avrà le proprietà prese dalle mie due richieste di profilePostsData e profileUserData
### ProfiloUtente { data:
  ### { id: '8137087849',
  ###   username: 'network_service_',
  ###   profile_picture: 'https://scontent.cdninstagram.com/vp/b264d8d7bb1022bceb84ee238722a945/5D2DA3B7/t51.2885-19/36085905_390942574760171_5317405555260653568_n.jpg?_nc_ht=scontent.cdninstagram.com',
  ###   full_name: 'Network Service',
  ###   bio: 'Network Service è l’agenzia che lavora con soli Hotel, si occupa del tuo sito e del tuo marketing operativo. Obiettivo? Dipendere meno dalle Ota.',
  ###   website: 'https://www.network-service.it/',
  ###   is_business: true,
  ###   counts: { media: 31, follows: 522, followed_by: 149 } },
 ### meta: { code: 200 } }
 ###TUtti i dati sia del profilo che dei media li precno dal json che ricevo in risposta
``` javascript
    res.render('profile', {
        userName: profileUserData.data.username,
        imgProfile: profileUserData.data.profile_picture,
        fullName: profileUserData.data.full_name,
        bioProfile: profileUserData.data.bio
    })

```
##Per passare i posts, essendo un array devo utilizzare un ciclo dentro la view 
``` html
        {{#each posts}}<!-- Questo è l'oggetto che mi restituisce i dati dentro profile.js-->
            <div class="col-md-4">
                <div class="card mb-2">
                    <img src="" alt="">
                    <div class="card-body">
                        {{link}}
                    </div>
                </div>
            </div>
        {{/each}}
```
###Per prendere le immagini che sono un array di oggetti cerco di accedere ad un unico elemento in profile.js
``` javascript
    console.log('Accedo a un Immagine ', mediaPostsData.data[0].images) //per i media(mediaPostsData) accedo al primo oggetto (data[0]) e prendo l'immagine(images)
    /* Ricevo questi dati */
    { /* Accedo a un Immagine */
        thumbnail: { 
            width: 150,
            height: 150,
            url: 'https://scontent.cdninstagram.com/vp/ea217f61684a2533d3eb09c65e14e851/5D39AE5E/t51.2885-15/e35/c0.0.1013.1013a/s150x150/46671217_368765270548040_4618735739296225885_n.jpg?_nc_ht=scontent.cdninstagram.com' 
        },
        low_resolution:{ 
            width: 320,
            height: 319,
            url: 'https://scontent.cdninstagram.com/vp/ee3316f152747f2f4f1cca5cbaa52337/5D4B2F06/t51.2885-15/e35/s320x320/46671217_368765270548040_4618735739296225885_n.jpg?_nc_ht=scontent.cdninstagram.com'
        },
        standard_resolution: {
            width: 640,
            height: 639,
            url: 'https://scontent.cdninstagram.com/vp/c6ad45deb49a066624bc498636e6a5b7/5D456A51/t51.2885-15/sh0.08/e35/s640x640/46671217_368765270548040_4618735739296225885_n.jpg?_nc_ht=scontent.cdninstagram.com' 
        }
    }
    console.log('/Profile DatiPostUtente: ', mediaPostsData.data[3].caption)
    { //Media Caption: 
        id: '17933941315181019',
        text: 'Ok il nostro team building non è fatto di giochini e abbracci, ma pensiamo che un aperitivo top cosi’, possa andare bene 😍 #networkers #team #darsena #top',
        created_time: '1532455966',
        from: { 
            id: '8137087849',
            full_name: 'Network Service',
            profile_picture: 'https://scontent.cdninstagram.com/vp/b264d8d7bb1022bceb84ee238722a945/5D2DA3B7/t51.2885-19/36085905_390942574760171_5317405555260653568_n.jpg?_nc_ht=scontent.cdninstagram.com',
            username: 'network_service_' 
        }
    }
```
##Per la data creo una Funzione accessibile e tutte le mie rotte quindi la creo in app.js prima delle routes per convertire la data di creazione in un formato leggibile e vado a creare un Middleware da 0 (per poter creare una funzione ed utilizzarla con handlebars devo installare il modulo 'handlebars', cos' potrò creareun helper ed utilizzarlo)
``` javascript
    //Creo Middleware per gestire le date
    Handlebars.registerHelper('dataFormattata', (date) => {
        let dataPost = new Date(date * 1000)
        return dataPost.toLocaleDateString()
    })
    // nel template utilizzo la seguente sitassi per stampare a video il risultato della {{funzione e del suo parametro}} {{dataFormattata created_time}}
```

##Per i file statici creo nel file main.handlebars  <link rel="stylesheet" href="css/style.css"> e nel app.js il seguente codice
``` javascript
     // STATIC FILE 
    app.use(express.static('src/public'));   

```
## In fine ci sarà una rotta per il logOut=> /logout