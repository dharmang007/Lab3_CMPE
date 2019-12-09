/**
 * @author Dharmang Solanki
 * 
 */

const mongoose = require('mongoose');

/**
 * @description Creates the Customer Schema
 *  
 * */
const CustomerSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique:true
  },
  password:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  contact:{
    type: String,
    required: true,
  },
  profileImg:{
    type:String
  },
  cart:[
    {
      restId:{type:mongoose.Schema.Types.ObjectId,required:true},
      itemId:{type:mongoose.Schema.Types.ObjectId,required:true},
      qty:{type:Number,required:true}
    }
  ]

});

//Here the mongoose.model has two arguments 
// 1) the name of model 
// 2) the Schema which will be used 
module.exports = Customer = mongoose.model('customer',CustomerSchema);;