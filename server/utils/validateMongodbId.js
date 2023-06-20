const mongoose = require('mongoose');
const validateMongodbId = (id) =>{
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid){
        res.send("This id is not not valid or not found!");
    }
}

module.exports = {validateMongodbId}