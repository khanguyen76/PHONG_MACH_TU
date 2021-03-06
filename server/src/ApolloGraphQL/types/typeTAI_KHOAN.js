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
    type DS_TAI_KHOAN_RESPONSE {
        pages: Int,
        total: Int
        doc: [TAI_KHOAN]
    }       
    type AUTHENCATION_RESPONSE {
        accessToken: String
        doc: TAI_KHOAN
    }
    type TAI_KHOAN_RESPONSE {
        _id: ID,
        ho_ten: String,
        email: String,
        gioi_tinh: String,
        ngay_sinh: Date,
        quyen: String,
        created_at: Date,
        updated_at: Date,
    }
`
module.exports = typeTAI_KHOAN