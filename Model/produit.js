const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type: String,
    },
    images:{
        type: String
    },
    price:{
        type: Number,
        default:0
    }

})
module.exports =  Produit = mongoose.model('produit', productSchema)
