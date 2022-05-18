const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

require('dotenv/config');

// Connects with the database
const url = process.env.DATABASE;
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'PHONG_MACH_TU'
  }
);
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Init app
var app = express();
app.use(cors());
// append /api for our http requests
// const router = require('./src/RestAPI/routes');
// app.use("/api", router);

// *** APOLLO SERVER ***
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./src/ApolloGraphQL/typeDefs')
const resolvers = require('./src/ApolloGraphQL/resolvers')

async function startServer () {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => req.headers
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}
startServer()

// *** EXPRESS GRAPHQL ***
// const { graphqlHTTP } = require("express-graphql");
// const { buildSchema } = require('graphql');
// const schema = require("./src/ExpressGraphQL")
// app.use("/graphql", graphqlHTTP({
//   schema,
//   graphiql: true
// }))

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`LISTENING ON at http://localhost:${PORT}${apolloServer.graphqlPath}`));

// launch our backend into a port
