const userModel = require("../Models/userModel")
const bcrypt = require("bcrypt")
const validator = require("validator")
const jwt = require("jsonwebtoken")

const createToken = (_id) => { 
    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.sign({_id}, jwtkey, {expiresIn:"3d"})
}
const registerUser = async (req, res) => {
    try {
    const { name, email, password } = req.body
    let user = await userModel.findOne({ email });
    if (user) return res.status(400).json("Email người dùng này đã tồn tại");
    if (!name || !email || !password) return res.status(400).json("Không được bỏ trống các ô")
    if (!validator.isEmail(email)) return res.status(400).json("Email phải hợp lệ.")
    if (!validator.isStrongPassword(password)) return res.status(400).json("Hãy đặt một mật khẩu manh hơn")
    
    user = new userModel({name, email, password})
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
        await user.save();

    const token = createToken(user._id)
    res.status(200).json({_id :user._id, name, email, token})
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await userModel.findOne({ email });
        if (!user ) return res.status(400).json("email hoặc mật khẩu không hợp lệ ")
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) return res.status(400).json("email hoặc mật khẩu không hợp lệ ...")
        const token = createToken(user._id)
        res.status(200).json({ _id: user._id, name: user.name, email, token })
    } catch (error) {
        console.log(error);
        res.status(400).json("Không được bỏ trống các ô ");
    }
};


const findUser = async (req, res) => {
    try {
         const userId = req.params.userId; 
        const user = await userModel.findById(userId)
     
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};
const getUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};
module.exports = {registerUser,loginUser,findUser,getUsers}