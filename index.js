let express = require('express')
let mg = require('mongoose')
let cors = require('cors')
let Collection = require('./models/EntryModel')
let bcrypt = require('bcrypt')

let app = express()
let PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())

mg.connect(process.env.URL)
.then(() =>
{
    console.log("DB Connected")
})
.catch(() =>
{
    console.log("Not Connected")
})

app.get('/getdata',(req,res) =>
{
    Collection.find()
    .then((user) => res.json(user))
    .catch((e) => console.log(e))
})

app.post('/signup',(req,res) =>
{
    let {name,email,password} = req.body
    bcrypt.hash(password,10)
    .then((hash) =>
    {
        Collection.create({name,email,password:hash})
        .then(entry => res.json(entry))
        .catch(e => console.log(e))
    })
    
})

app.post('/login',(req,res) =>
{   
    let {email,password} = req.body

    Collection.findOne({email:email})
    .then((user) =>
    {
        if(user) 
        {
            bcrypt.compare(password,user.password,(err,response) =>
            {
                if(response) 
                {
                    res.json("Success")
                }
                else
                {
                    res.json("Password is Incorrect")
                }
            })
            
        }
    })
    .catch((e) =>
    {
        console.log(e)
    })

    // Collection.findOne({email:email})
    // .then(user => {
    //     if(user)
    //     {
    //         if(user.password == password)
    //         {
    //             res.json("Success")
    //         }
    //         else
    //         {
    //             res.json("Password is Incorrect")
    //         }
    //     }
    //     else
    //     {
    //         res.json("No User Exist")
    //     }
        
    // }) 
    // .catch((e) => console.log(e))
})

app.listen(PORT,() =>
{
    console.log(`Server is Running on Port No. ${PORT}`)
})
