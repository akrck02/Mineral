import User from "../models/user.js";
import generateId from "../helpers/generateId";


const registerUser = async (req, res) => {

    const existsUser = await User.findOne(req.body.email);

    if(existsUser) {
        const error = new Error("User already exists");
        return res.status(400).json({
            ok: false,
            msg: error.message
        });
    }


    try {
        
        const user = new User(req.body);
        user.token = generateId();
        const savedUser = await user.save();

        res.json(savedUser);
    }
    catch(error) {
        res.json({error, msg: "Error when registering user to database"});
    }
}

const authenticateUser = async (req, res) => {
    const { email, password } = req.body;

    const existsUser = await User.findOne({email});

    if(!existsUser) {
        const error = new Error('User does not exist');
        return res.status(404).json({msg: error.message});
    }

    if(!existsUser.validated) {
        const error = new Error('User needs to be validated');
        return res.status(404).json({msg: error.message});
    }

    if(await existsUser.checkPassword(password)) {
        res.json({
            _id: existsUser._id,
            name: existsUser.name,
            email: existsUser.email
        });
    }
    else {
        const error = new Error('Incorrect password');
        return res.status(404).json({msg: error.message});
    }
}

export  {registerUser, authenticateUser};