import mongoose from "mongoose";

const candidateModel = mongoose.Schema({
  name:{
    type:String,
    required:[true,'Name of the candidate is required']
  },
  party:{
    type:String,
    required:[true,'Representing party is required']
  },
  constituency:{
    type:String,
    required:[true,'Constituency of candidate is required']
  },
  votes:{
    type:Number,
    default:0
  },
   avatar: {
    public_id: {
      type: String,
      default: "none",
    },
    url: {
      type: String,
      default: "none",
    }
  },
  state:{
    type:String,
    required:[true,'State of candidate is required']
  },
  history:{
    type:String,
    default:null
  }

},{
  timestamps:true
});

candidateModel.methods= {
  addVote : function(userId) {
    this.votes+=1
    this.save();
  }
}

export default mongoose.model('Candidate',candidateModel)
