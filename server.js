const express = require('express')
const user = require('./Routes/user')
const app = express()
const PORT =5000
app.use(express.json())







app.use('/api/user', user)
app.listen(PORT, () => {
    console.log("le server est en cours ")
})