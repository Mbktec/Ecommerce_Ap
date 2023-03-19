const express = require('express')
const user = require('../model/user')
const {  mongoose } = require('mongoose')
const router = express.Router()

//requete pour l'affichage d'un utilisateur

router.get('/', (req, res) => {
    res.send("salut users")
})

//requete pour la creation d'un utilisateur
router.post('/register', async (req, res) => {
    const { firstName,
        lastName,
        email,
        password} =req.body
 try {
        const addUser = await user.create({
            firstName:firstName,
            lastName: lastName,
            email:email,
            password:password
        })
        res.status(201).json({addUser})
 } catch (error) {
    console.log(error)
 }
})

//requete pour le login d'un utilisateur
router.post('/login', async (req, res) => {
    const { email : mail, password:pass} = req.body;
    try{
        const foundUser = await user.findOne({email: mail, password: pass}).lean().exec()
        if(!foundUser) return res.status(404).json({message: 'Nom dutilisateur ou mot de pass incorrect'})
        const { password,email, ...returnedUser} = foundUser
        return res.send(returnedUser)
    }catch(error){
        console.log(error)
    }
})

module.exports = router; 
