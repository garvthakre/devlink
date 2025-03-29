const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
    user :{ type :mongoose.Schema.Types.ObjectId,ref:'User'},
    skills:[String],
    bio:String,
    socialLinks:{
        github:String,
        linkedin:String,

    }
});
module.exports = mongoose.model('Profile',ProfileSchema);