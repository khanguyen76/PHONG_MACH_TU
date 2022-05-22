const { gql } = require('apollo-server-express')

const typeCACH_DUNG = gql`
    type CACH_DUNG {
        _id: ID,
        mo_ta_cach_dung: String,
        created_at: Date,
        updated_at: Date,
    }      
`
module.exports = typeCACH_DUNG