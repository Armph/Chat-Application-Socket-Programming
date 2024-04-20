const privateMessage = async (req, res) => {
    console.log(req.body);
    res.send('Message received');
};

const groupMessage = async (req, res) => {
    console.log(req.body);
    res.send('Message received');
}

module.exports = { privateMessage, groupMessage };
