const { gql } = require('apollo-server-express')

const typeBENH_NHAN = gql`
    type BENH_NHAN {
        _id: ID,
        ho_ten: String,
        nam_sinh: Int,
        gioi_tinh: String,
        dia_chi: String,
        is_deleted: Boolean,
        created_at: Date,
        updated_at: Date,
    }
    type DS_BENH_NHAN_RESPONSE {
        code: Int
        success: Boolean
        message: String
        pages: Int,
        total: Int
        doc: [BENH_NHAN]
    }
    type BENH_NHAN_RESPONSE {
        code: Int
        success: Boolean
        message: String
        doc: BENH_NHAN
    }
`
module.exports = typeBENH_NHAN