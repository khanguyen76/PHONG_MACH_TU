const { gql } = require('apollo-server-express')

const typeCommon = gql`
    type COMMON_RESPONSE {
        code: Int
        success: Boolean
        message: String
    }
`
module.exports = typeCommon