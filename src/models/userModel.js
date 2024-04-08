import mongoose from "mongoose"
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
import crypto from 'crypto'

const userModel = mongoose.Schema({
  name :{
    type:String,
    required:[true, "Name is required"],
    maxLength:[50, "Name must be less than 50 characters"]
  },
  email:{
    type:String,
    required:[true,'email is required'],
    unique:true
  },
  password:{
    type:String,
    required:[true,'password is required']
  },
  role:{
    type:String,
    default:"user"
  },
  state:{
    type: String,
    required:[true,'constituency is required'] 
  },
  constituency:{
    type: String,
    required:[true,'constituency is required'] 
  },
  isVoted:{
    type:Boolean,
    default:false
  },
  votedCandidateId:{
type:mongoose.Schema.ObjectId,
ref:"Candidate",
default:null
  },
  profilePicture:{
    type:String,
    default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
  },
  forgotPasswordToken:String,
  forgotPasswordExpiry:Date,

},{timestamps:true})



userModel.pre("save", async function(next) {
 
  if(!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password,10) 
  
  // console.log(this.password)
next();
} )

userModel.methods = {
  comparePassword:async function (enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
  },
  getJwtToken: function(){
    return JWT.sign({_id:this._id, role:this.role},process.env.JWT_SECRET,{expiresIn:"7d"})
  },
  generateForgotPasswordToken: function(){
    const forgotToken = crypto.randomBytes(20).toString('hex');
    console.log("------")
    console.log(forgotToken)
   
    this.forgotPasswordToken = crypto.createHash('sha256').update(forgotToken).digest("hex")
    console.log( this.forgotPasswordToken)
    console.log('--------')
    this.forgotPasswordExpiry = Date.now() +20*60*1000;

    return forgotToken
  },
}

export default mongoose.model("User",userModel)