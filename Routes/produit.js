const cloudinary = require('cloudinary').v2;
const express = require('express')
const router = express.Router() 
const produit = require('../Model/produit')
require('dotenv').config()
const multer = require('multer');
const { Console } = require('console');
const upload = multer({dest: 'uploads'})


cloudinary.config({
    cloud_name:`${process.env.CLOUD_NAME}` ,
    api_key: `${process.env.CLOUD_API_KEY}`, 
    api_secret: `${process.env.CLOUD_API_SECRET_KEY}`
})




router.get('/', async (req, res) => {
    try {
      const produits = await  produit.find()
      res.status(201).json({produits})
    } catch (error) {
        console.log(error);
       
    }
})




router.get('/:id', async (req, res) => {
    try {
        const product = await produit.findById(req.params.id)
            if(!product){
         return res.status(404).json({msg: 'produit not found'})
        }  
        res.json(product) 
        console.log(product)
        res.end()
    } catch (err) {
        res.status(500).json({msg: 'id invalide' })
        res.end()
    }
})




router.put('/:id',upload.single('images'),async (req, res) => {
    try {
        const resultat = await cloudinary.uploader.upload(req.file.path)
        const product = await produit.findById(req.params.id)
        console.log(req.params.id)
        if(!product){
         return res.status(404).json({msg: 'produit not exist'})
        }  
       product.name =req.body.name;
       product.description =req.body.description;
       product.images =resultat.secure_url;
       product.price =req.body.price;
       await product.save();

    return res.status(201).json({msg:`produit with id:${req.params.id}`})
    } catch (err) {
        // res.status(500).json({msg: 'id invalide' })
        console.log(err)
        res.end()
    }
})




router.delete('/:id', async (req, res) => {
    try {
        const product = await produit.findByIdAndDelete(req.params.id)
        if(!product){
         return res.status(404).json({msg: 'produit not exist'})
        }  
    return res.status(201).json({msg:`produit with id:${id}`})
    } catch (err) {
        res.status(500).json({msg: 'id invalide' })
        res.end()
    }
})





router.post('/add', upload.single('images'), async (req,res) => {
    const { name, description, images, price} = req.body
    try {
    const resultat = await cloudinary.uploader.upload(req.file.path)
           const addProduit = await produit.create({
            name:name,
            description: description,
            images:resultat.secure_url,
            price:price
           })
           res.status(201).json({addProduit})
    } catch (error) {
       console.log(error)
    }
   })

module.exports = router;