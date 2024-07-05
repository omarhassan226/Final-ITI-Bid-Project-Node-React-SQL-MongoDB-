const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;


exports.connection = mongoose.connect(MONGODB_URI,{useNewUrlParser:true},{ useUnifiedTopology: true })
