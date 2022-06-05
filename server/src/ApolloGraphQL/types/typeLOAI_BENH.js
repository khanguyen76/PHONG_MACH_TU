const { gql } = require('apollo-server-express')

const typeTAI_KHOAN = gql`
    type LOAI_BENH {
        _id: ID,
        ten_loai_benh: String,
        is_deleted: Boolean,
        created_at: Date,
        updated_at: Date,
    }      
    type LOAI_BENH_RESPONSE {
        code: Int
        success: Boolean
        message: String
        doc: LOAI_BENH
    }
`
module.exports = typeTAI_KHOAN