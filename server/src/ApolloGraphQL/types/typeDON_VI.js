const { gql } = require('apollo-server-express')

const typeDON_VI = gql`
    type DON_VI {
        _id: ID,
        ten_don_vi: String,
        created_at: Date,
        updated_at: Date,
    }      
`
module.exports = typeDON_VI