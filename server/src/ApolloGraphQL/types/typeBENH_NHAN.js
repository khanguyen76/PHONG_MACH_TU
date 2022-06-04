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
    input TIM_BENH_NHAN{
        ho_ten: String
    } 
    type DS_BENH_NHAN_RESPONSE {
        pages: Int,
        total: Int
        doc: [BENH_NHAN]
    }
`
module.exports = typeBENH_NHAN