const express = require('express')
const user = require('../model/user')
const {  mongoose } = require('mongoose')
const bcrypt = require('bcrypt')
const verifyToken = require('./auth')
const jwt = require('jsonwebtoken')
const router = express.Router()

//requete pour l'affichage d'un utilisateur

router.get('/', async  (req, res) => {
    try {
        const users = await  user.find()
        res.status(201).json({users})
      } catch (error) {
          console.log(error);
         
      }

})

//requete pour la creation d'un utilisateur
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password} = req.body
    const crypte = await bcrypt.genSalt(10)
    const passwordCrypte = await bcrypt.hash(password, crypte)
 try {
        const addUser = await user.create({
            firstName:firstName,
            lastName: lastName,
            email:email,
            password:passwordCrypte
        })
        res.status(201).json({addUser})
 } catch (error) {
    console.log(error)
 }
})

//requete pour le login d'un utilisateur
router.post('/login', async (req, res) => {
    const { email , password} = req.body;
    try{
        const userLogin  = await user.findOne({ email })
        if(!userLogin) return res.status(404).json({message: 'Nom d utilisateur incorrect'})
       const motdepass = await bcrypt.compare(password, userLogin.password)
       if(!motdepass) return res.status(404).json({message: 'Mots de pass incorrect'})

       const token = jwt.sign(
        {userId: user._id},
        process.env.TOKEN_KEY,
        {expiresIn: '24h'}
    );
    userLogin.token = token
    console.log(token)
    return res.status(200).json({token, ...userLogin})  
    }catch(error){
        console.log(error)
    }
})

module.exports = router; 
