let mg = require('mongoose')

let EntrySchema = new mg.Schema({
   name : String,
   email : String,
   password : String
})

let Collection = mg.model("Entry",EntrySchema)
module.exports = Collection