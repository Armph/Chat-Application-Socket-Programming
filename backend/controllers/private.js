const Private = require("../models/Private");

//CREATE PRIVATE CHAT
const createPrivateChatandgetId = async(req, res) => {
    try {
        const {user1, user2} = req.body;
        const checkRoom1 = await Private.findOne({user1: user1, user2: user2});
        const checkRoom2 = await Private.findOne({user1: user2, user2: user1});
        let privateId;
        if(checkRoom1){
            privateId = checkRoom1.id;
        }else if(checkRoom2){
            privateId = checkRoom2.id;
        }else{
            const direct = true;
            const newPrivate= await Private.create({user1, user2, direct});
            const savedPrivate = await newPrivate.save();
            privateId = savedPrivate.id;
        }
        res.status(201).json(privateId);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
module.exports = {
    createPrivateChatandgetId
};