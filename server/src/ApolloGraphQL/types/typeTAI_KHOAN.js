const { gql } = require('apollo-server-express')

const typeTAI_KHOAN = gql`
    type TAI_KHOAN {
        _id: ID,
        ho_ten: String,
        email: String,
        mat_khau: String,
        gioi_tinh: String,
        ngay_sinh: Date,
        quyen: String,
        is_deleted: Boolean,
        created_at: Date,
        updated_at: Date,
    }       
    type TAI_KHOAN_RESPONSE {
        code: Int
        success: Boolean
        message: String
        doc: TAI_KHOAN
    }
    type AUTHENCATION_RESPONSE {
        code: Int
        success: Boolean
        message: String
        accessToken: String
        doc: TAI_KHOAN
    }
`
module.exports = typeTAI_KHOAN