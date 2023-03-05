const express = require('express')
const users = require('../model/user')
const router = express.Router()

//requete pour l'affichage d'un utilisateur

router.get('/', (req, res) => {
    res.send("salut users")
})

//requete pour la creation d'un utilisateur
router.post('/register', async (req, res) => {
    const { name, description,price,cat,image } =req.body
 try {

 } catch (error) {

 }
})

module.exports = router; 