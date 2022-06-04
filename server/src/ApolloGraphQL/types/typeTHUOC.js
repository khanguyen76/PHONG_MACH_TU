const { gql } = require('apollo-server-express')

const typeTAI_KHOAN = gql`
    type THUOC {
        _id: ID,
        ten_thuoc: String,
        don_vi: DON_VI,
        cach_dung: CACH_DUNG,
        don_gia: Int,
        is_deleted: Boolean,
        created_at: Date,
        updated_at: Date,
    }        
    input TIM_THUOC{
        ten_thuoc: String
    } 
    type DS_THUOC_RESPONSE {
        pages: Int,
        total: Int
        doc: [THUOC]
    }
`
module.exports = typeTAI_KHOAN