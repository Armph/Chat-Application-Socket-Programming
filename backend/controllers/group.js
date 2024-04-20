const Group = require("../models/Group");

//GET All Groups
const getallGroups = async(req, res) => {
    try {
        // console.log(req.body);
        const groups = await Group.find().where({directed: false});
        res.status(200).json(groups);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

//Create A Group
const createGroup = async(req, res) => {
    try {
        await console.log(req.params);
        await console.log(req.body);
        const {name} = req.body;
        const newGroup = await Group.create({name});
        const savedGroup = await newGroup.save();
        res.status(201).json(savedGroup);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
module.exports = {
    getallGroups,
    createGroup
  };
