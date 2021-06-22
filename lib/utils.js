const User = require('../models/user');

/**
 * Checks whether there is a member with the given maid id in the "user" database.
 * if there is returns true otherwise false 
 */
const isMember = async(mail) => {
    try{
        let member = await User.findOne({emailAddress:mail})
        if(member.length === 0) return false;
        else return true;
    }catch(err){
        throw err;
    }
}

module.exports = {isMember};