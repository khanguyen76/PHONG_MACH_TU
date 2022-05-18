const { gql } = require('apollo-server-express')

const typeTAI_KHOAN = gql`
    type PHIEU_KHAM {
        _id: ID,
        ngay_kham: Date,
        benh_nhan: BENH_NHAN,
        loai_benh: LOAI_BENH,
        is_deleted: Boolean,
        created_at: Date,
        updated_at: Date,
    }     
    type DS_PHIEU_KHAM_RESPONSE {
        code: Int
        success: Boolean
        message: String
        pages: Int,
        total: Int
        doc: [PHIEU_KHAM]
    }
    type PHIEU_KHAM_RESPONSE {
        code: Int
        success: Boolean
        message: String
        doc: PHIEU_KHAM
    }
`
module.exports = typeTAI_KHOAN