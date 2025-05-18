const Message = require("../model/messageModel");
const bcrypt = require("bcrypt");
module.exports.addMessage = async (req, res, next) => {
  try {
    const {from , to ,message} =  req.body
    const data = Message.create({
        message : {text : message},
        users : [from ,to],
        sender : from
    })
    if(data){
        return res.json({ status: true, message : "Message added successfully" });
    }

    return res.json({ status: false, message : "Problem in adding Message" });
  } catch (error) {
    console.log(error);
    return res.json({ error, status: false });
  }
};
module.exports.getAllMessages = async (req, res, next) => {
    try {
      const { from , to } = req.body;
      const messages = await Message.find({
        users : {
            $all : [from,to]
        }
      })
      .sort({
        updatedAt : 1
      })
      
      const projectedMessages = messages.map((msg)=>{
        return {
        fromSelf : msg.sender.toString()===from ,
        message : msg.message.text,
        }
      })
  
     
      return res.json({ status: true,messages :  projectedMessages });
    } catch (error) {
      console.log(error);
      return res.json({ error, status: false });
    }
  };

