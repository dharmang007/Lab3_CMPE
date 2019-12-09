const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var generator = require('generate-password');
const axios = require('axios');
const config = require('config');
const Customer = require('../models/Customer');
const Restaurant = require('../models/Restaurant');


const resolvers = {

  Query: {

    getCurrentCustomer: async (root, args, { currentCustomer, Customer }) => {
      if (!currentCustomer) {
        return null;
      }
      const customer = await Customer.findOne({ email: currentCustomer.email });
      return customer;
    }
  },

  Mutation: {
    createCustomer: async (root, { name, email, password, contact, profileImg, cart}) => {
  
      const customer = await Customer.findOne({ email });
      if (customer) {
        throw new Error('User already exits');
      }
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password,salt);
      const newCustomer = await new Customer({
        name,
        email,
        password,
        contact,
        profileImg,
        cart
      }).save();
    
      return newCustomer;
      
    },

    createRestaurant: async (root, { name, email, password, contact, profileImg, cuisine}) => {
  
      const rest = await Restaurant.findOne({ email });
      if (rest) {
        throw new Error('Restaurant already exits');
      }
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password,salt);
      const newRest = await new Restaurant({
        name,
        email,
        password,
        contact,
        profileImg,
        cuisine
      }).save();
      return newRest;
    },

    signinCustomer : async (root, { email, password }) => {
      const customer= await Customer.findOne({ email });

      if (!customer) {
        return {error: "Customer Account does not Exists"}
      }
      console.log(customer)
     const checkPassword = await bcrypt.compare(password, customer.password);

      if (!checkPassword) {
        return {error: "Invalid Password"}
      }
      return customer;
      
    },

    signinRestaurant : async (root, { email, password }) => {
      const rest = await Restaurant.findOne({ email });

      if (!rest) {
        return {error: "Restaurant Account does not Exists"}
      }
      console.log(rest)
      
      const checkPassword = await bcrypt.compare(password, rest.password);
      if (!checkPassword) {
        return {error: "Password Invalid"}
      }
      return rest;
    },

    setCustomerProfileIMG: async (root, { email, profileImg }, { Customer }) => {
      const customer = await Customer.findOneAndUpdate({ email }, { $set: { profileImg } }, { new: true });
      if (!customer) {
        return {error: "Customer Account does not Exists"}
      }
      return user;
    },
    setRestaurantProfileIMG: async (root, { email, profileImg }) => {
      const rest = await Restaurant.findOneAndUpdate({ email }, { $set: { profileImg } }, { new: true });
      if (!rest) {
        return {error: "Restaurant Account does not Exists"}
      }
      return rest;
    },
    addMenuItem: async(root,{email,item,desc,price,sction}) => {
      const rest = await Restaurant.findOne({email});
      rest.menu.push({item,desc,price,section});
      rest.save();
      return rest.menu;
    },
    editCustomerProfile:async(root,{email,name,newEmail,password,contact})=>{
      let customer = null;
      if(newEmail){
         customer = await Customer.findOneAndUpdate({email},{$set:{email:newEmail,name: name,password:password,contact: contact}},{new:true});
      }
      else{
         customer = await Customer.findOneAndUpdate({email},{name: name,contact: contact},{new:true});
      }
      if(!customer){
        return {error:"Error in editing"}
      }
      return customer
    }
  }
};
module.exports = resolvers;