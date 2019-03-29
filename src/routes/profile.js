'use strict'
const router = require('express').Router()
const Instagram = require('node-instagram').default
const {clientId, clientSecret, accessToken} = require('../models/keys').instagram
const instagram = new Instagram({
    clientId: clientId,
    clientSecret: clientSecret,
    accessToken: accessToken
})

//Utilizzo una chiamata asincrona
router.get('/', async (req, res) => {
    try {
        const profileUserData = await instagram.get('users/self')//Predno i dati del profilo
        //console.log('/profile ProfiloUtente', profileUserData)//Stampo dati profilo
        const mediaPostsData = await instagram.get('users/self/media/recent')//Prendo i dati dei Post del profilo
        console.log('/Profile DatiPostUtente: ', mediaPostsData)// Stampo dati Post di tutto l'array di oggetti
        //console.log('Accedo a un Immagine ', mediaPostsData.data[0].images) //Stampo la prima immagine dell'array di oggetti
        console.log('Data', mediaPostsData.data[0].created_time)// Stampo la prima data di creazione dell'array
        res.render('profile',{
            user: profileUserData.data,
            posts: mediaPostsData.data,
        })//renderizzo tutto a video creandio un oggetto con le proprietà prese dalle due richieste fatte prima
    } catch (error) {
        console.log(error)
    }
})

module.exports = router