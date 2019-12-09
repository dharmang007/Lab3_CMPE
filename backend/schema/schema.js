

const typeDefs = `
    type Customer {
        _id: ID
        email: String!
        name: String! 
        contact:String!
        password: String!
        profileImg: String
    }
    type MenuItem {
        _id:ID
        item:String!
        desc:String
        price:Float!
        section:String!
    }
    type Restaurant {
        _id: ID
        name: String! 
        email: String!
        password: String!
        cuisine: String!
        profileImg: String
        menu: [MenuItem]

    }
    type Query {
        getPrint:String
        getCurrentCustomer: Customer
    }

    type Mutation {
        createCustomer(name: String!, email: String!, password: String!,contact:String,profileImg:String): Customer
        signinCustomer(email: String!, password: String!): Customer
        setCustomerProfileIMG(email: String!, profileImage: String!): Customer
        createRestaurant(name: String!, email: String!, password: String!,contact:String,cuisine:String, profileImg:String): Restaurant
        signinRestaurant(email: String!, password: String!): Restaurant
        setRestaurantProfileIMG(email: String!, profileImage: String!): Restaurant
        addMenuItem(email: String, item:String!,desc:String,price:String!,section:String!): [MenuItem]
        editCustomerProfile(email:String,name:String,newEmail:String,password:String,contact:String):Customer
        editRestaurantProfile(email:String,name:String,newEmail:String,password:String,contact:String,cuisine:String):Restaurant
    }

    schema{
        query : Query
        mutation : Mutation
    }
`;
module.exports = typeDefs;