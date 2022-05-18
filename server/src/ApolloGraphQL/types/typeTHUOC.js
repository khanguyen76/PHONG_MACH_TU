const { gql } = require('apollo-server-express')

const typeTAI_KHOAN = gql`
    type THUOC {
        _id: ID,
        ten_loai_benh: String,
        is_deleted: Boolean,
        created_at: Date,
        updated_at: Date,
    }      
    type DS_THUOC_RESPONSE {
        code: Int
        success: Boolean
        message: String
        pages: Int,
        total: Int
        doc: [THUOC]
    }
    type THUOC_RESPONSE {
        code: Int
        success: Boolean
        message: String
        doc: THUOC_RESPONSE
    }
`
module.exports = typeTAI_KHOAN