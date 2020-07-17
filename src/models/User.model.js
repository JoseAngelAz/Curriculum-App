const {Schema} = require('mongoose');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    nombre:{type:String,required:true,trim:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    date:{type:Date,default:Date.now,required:false},
    role:{type:String, default:'USER',required:false}
});

//encryptin pass
userSchema.methods.encryptPass = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
}

//match passwords
userSchema.methods.matchPass = async function (password){
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User',userSchema);