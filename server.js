const express = require('express')
const { default: mongoose } = require('mongoose')
const user = require('./Routes/user')
const produit = require('./Routes/produit')

const app = express()
require('dotenv').config()

const PORT =5000
app.use(express.json())




mongoose
    .connect(`${process.env.MONGO_URI}`)
    .then(()=> console.log('Labase a été bien connecter'))
    .catch(err => console.log(err))


app.use('/api/user', user)
app.use('/api/produit', produit) 
app.listen(PORT, () => {
    console.log("le server est en cours ")
})  