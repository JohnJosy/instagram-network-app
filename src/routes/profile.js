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
        console.log('ProfiloUtente', profileUserData)//Stampo dati profilo
        const mediaPostsData = await instagram.get('users/self/media/recent')//Prendo i dati dei Post del profilo
        console.log('DatiPostUtente: ', mediaPostsData )// Stampo dati Post
        res.render('profile',{
            userName: profileUserData.data.username,
            imgProfile: profileUserData.data.profile_picture,
            fullName: profileUserData.data.full_name,
            bioProfile: profileUserData.data.bio,
            /* Ora Passo i dati dei Post ch eè un array */
            posts: mediaPostsData.data
        })//renderizzo tutto a video creandio un oggetto con le proprietà prese dalle due richieste fatte prima
    } catch (error) {
        console.log(error)
    }
})

module.exports = router