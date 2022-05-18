const { gql } = require('apollo-server-express')

const mutation = gql`
    type Mutation {
        THEM_BENH_NHAN(ho_ten: String!,gioi_tinh: String!,nam_sinh: Int!,dia_chi: String!): COMMON_RESPONSE
        SUA_BENH_NHAN(_id: ID!,ho_ten: String,gioi_tinh: String,nam_sinh: Int,dia_chi: String): COMMON_RESPONSE
        XOA_BENH_NHAN(_id: ID!): COMMON_RESPONSE

        THEM_LOAI_BENH(ten_loai_benh: String!): LOAI_BENH
        SUA_LOAI_BENH(_id: ID!,ten_loai_benh: String): COMMON_RESPONSE
        XOA_LOAI_BENH(_id: ID!): COMMON_RESPONSE

        TAO_TAI_KHOAN(ho_ten: String!,email:String!,mat_khau:String!,gioi_tinh:String!,ngay_sinh:Date!,quyen:String!) :TAI_KHOAN_RESPONSE,
        SUA_TAI_KHOAN(_id: ID!,ho_ten: String,email:String,mat_khau:String,gioi_tinh:String,ngay_sinh:Date,quyen:String) : TAI_KHOAN_RESPONSE,
        XOA_TAI_KHOAN(_id: ID!) : TAI_KHOAN_RESPONSE,
        KHOI_PHUC_TAI_KHOAN(_id: ID!) : TAI_KHOAN_RESPONSE,
        DANG_NHAP(email: String!,mat_khau: String!) : AUTHENCATION_RESPONSE,
        DANG_XUAT(email: String!,mat_khau: String!) : AUTHENCATION_RESPONSE,
        QUEN_MAT_KHAU(_id: ID!,email: String!) : TAI_KHOAN_RESPONSE,
        DOI_MAT_KHAU(_id: ID!,mat_khau_cu: String!,mat_khau_moi: String!) : TAI_KHOAN_RESPONSE
    }
`
module.exports = mutation