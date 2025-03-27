const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
    User :{ type :mongoose.Schema.Types.ObjectId,ref:'User'},
    skills:[String],
    bio:String,
    socialLinks:{
        github:String,
        Linkedin:String,

    }
});
module.exports = mongoose.model('Profile',ProfileSchema);