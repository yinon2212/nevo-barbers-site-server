const userModel = require('../models/user.model');

const add_user = (req, res) => {
    const user = new userModel(req.body);

    try{
        user.save();
        res.status(200).send(user);
    } catch(error) {
        res.status(500).send(error);
    }
}

const get_users = async (req, res) => {
    
    const users = await userModel.find({});
    
    try{
        res.status(200).send(users);
    } catch(error) {
        res.status(500).send(error);
    }
}

const get_hours = async (req, res) => {
    const allHours = ["20:00", "20:45", "21:30", "22:15"];

    userModel.aggregate([
        {
            $group: {
                _id: null,
                hours: {$push: '$hour'}
            }
        },
        {
            $project: {
                availableHours: {
                    $filter: {
                        input: allHours,
                        cond: {$not: {$in: ['$$this', '$hours']}}
                    }
                }
            }
        }
    ])
    .exec()
    .then(result => {
        res.status(200).send(result);
    })
    
}

module.exports = {
    add_user,
    get_users,
    get_hours
}