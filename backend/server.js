const express = require('express');
const graphqlHTTP = require('express-graphql');
const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers/resolvers')
const cors = require('cors');
const app = express();
const bodyParser =require('body-parser');
const connectToDataBase = require("./config/db");
const graphql_tools =  require('graphql-tools');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser())
connectToDataBase();

const schema = graphql_tools.makeExecutableSchema({
    typeDefs,
    resolvers
  });
app.use("/graphql",graphqlHTTP({
    schema,
    graphiql: true
}));

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
    console.log(`GraphQL server started on port ${PORT}`);
})
