const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var generator = require('generate-password');
const axios = require('axios');
const config = require('config');
const Customer = require('../models/Customer');
const Restaurant = require('../models/Restaurant');
const createToken = (customer, secret, expiresIn) => {

const { name, email } = customer;
return jwt.sign({
    name, email
  }, secret, { expiresIn })

}

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

      const newCustomer = await new Customer({
        name,
        email,
        password,
        contact,
        profileImg,
        cart
      }).save();
    
      return { token: createToken(newCustomer, config.get('jwtSecretToken'), "1hr") };
    },

    signinCustomer : async (root, { email, password }, { Customer }) => {
      const customer= await Customer.findOne({ email });

      if (!customer) {
        throw new Error('User Not Found');
      }

      const checkPassword = await bcrypt.compare(password, customer.password);

      if (!checkPassword) {
        throw new Error('Invalid password');
      }
      //return customer;
      return { token: createToken(customer, config.get('jwtSecretToken'), "1hr") };

    },

    setProfileIMG: async (root, { email, profileImg }, { Customer }) => {
      const customer = await Customer.findOneAndUpdate({ email }, { $set: { profileImg } }, { new: true });
      if (!customer) {
        throw new Error('User Not Found');
      }

      return user;
    }

  }
};
module.exports = resolvers;