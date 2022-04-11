const { GraphQLObjectType, GraphQLSchema, GraphQLString } = require("graphql");

const RootQuery = new GraphQLObjectType({
    name:"RootQuery",
    fields:()=>({
        id: {type: GraphQLString}
    })
})

const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{}
})

const schema =  new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

module.exports = schema