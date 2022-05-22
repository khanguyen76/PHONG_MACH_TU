const { gql } = require('apollo-server-express')

const mutation = gql`
    type Query {
        DS_BENH_NHAN (page: Int,size: Int): DS_BENH_NHAN_RESPONSE
        BENH_NHAN (_id: ID!): BENH_NHAN

        DS_PHIEU_KHAM (search: TIM_PHIEU_KHAM, page: Int,size: Int): DS_PHIEU_KHAM_RESPONSE
        PHIEU_KHAM (_id: ID!): PHIEU_KHAM

        DS_LOAI_BENH (page: Int,size: Int): DS_LOAI_BENH_RESPONSE
        LOAI_BENH (_id: ID!): LOAI_BENH_RESPONSE

        DS_DON_VI: [DON_VI]
        DON_VI (_id: ID!): DON_VI

        DS_CACH_DUNG: [CACH_DUNG]
        CACH_DUNG (_id: ID!): CACH_DUNG

        DS_THUOC (page: Int,size: Int): DS_THUOC_RESPONSE
        THUOC (_id: ID!): THUOC
    }
`
module.exports = mutation