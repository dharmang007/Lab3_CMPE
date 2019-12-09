

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
    type Restaurants {
        _id: ID
        name: String! 
        email: String!
        password: String!
        cuisine: String!
        profileImg: String
        menu: [
            MenuItem!
        ]

    }

    type Token {
        token: String!
    }

    type Query {
        getPrint:String
        getCurrentCustomer: Customer
    }

    type Mutation {
        createCustomer(name: String!, email: String!, password: String!,contact:String,profileImg:String): Token
        signinCustomer(email: String!, password: String!): Token
        setProfileIMG(email: String!, profileImage: String!): Customer

    }

    schema{
        query : Query
        mutation : Mutation
    }
`;
module.exports = typeDefs;