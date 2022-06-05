const { gql } = require('apollo-server-express')

const mutation = gql`
    type Mutation {
        THEM_BENH_NHAN(ho_ten: String!,gioi_tinh: String!,nam_sinh: Int!,dia_chi: String!): COMMON_RESPONSE
        CAP_NHAT_BENH_NHAN(_id: ID!,ho_ten: String,gioi_tinh: String,nam_sinh: Int,dia_chi: String): COMMON_RESPONSE
        XOA_BENH_NHAN(_id: ID!): COMMON_RESPONSE

        THEM_LOAI_BENH(ten_loai_benh: String!): LOAI_BENH
        CAP_NHAT_LOAI_BENH(_id: ID!,ten_loai_benh: String): LOAI_BENH
        XOA_LOAI_BENH(_id: ID!): COMMON_RESPONSE

        THEM_DON_VI(ten_don_vi: String!): DON_VI
        CAP_NHAT_DON_VI(_id: ID!,ten_don_vi: String): DON_VI
        XOA_DON_VI(_id: ID!): COMMON_RESPONSE

        THEM_CACH_DUNG(mo_ta_cach_dung: String!): CACH_DUNG
        CAP_NHAT_CACH_DUNG(_id: ID!,mo_ta_cach_dung: String): CACH_DUNG
        XOA_CACH_DUNG(_id: ID!): COMMON_RESPONSE

        THEM_THUOC(ten_thuoc: String!,ma_don_vi:String!,ma_cach_dung:String!,don_gia:Int!): THUOC
        CAP_NHAT_THUOC(_id: ID!,ten_thuoc: String,ma_don_vi:String,ma_cach_dung:String,don_gia:Int): THUOC
        XOA_THUOC(_id: ID!): COMMON_RESPONSE

        THEM_PHIEU_KHAM(ma_benh_nhan:String!,ngay_kham: Date): PHIEU_KHAM
        CAP_NHAT_PHIEU_KHAM(_id: ID!,ma_loai_benh:String,trieu_chung:String,ngay_kham: Date,don_thuoc: [THUOC_KE_DON]): PHIEU_KHAM
        XOA_PHIEU_KHAM(_id: ID!): COMMON_RESPONSE

        TAO_TAI_KHOAN(ho_ten: String!,email:String!,mat_khau:String!,gioi_tinh:String!,ngay_sinh:Date!,quyen:String!) :TAI_KHOAN,
        CAP_NHAT_TAI_KHOAN(_id: ID!,ho_ten: String,email:String,mat_khau:String,gioi_tinh:String,ngay_sinh:Date,quyen:String) : TAI_KHOAN,
        XOA_TAI_KHOAN(_id: ID!) : COMMON_RESPONSE,
        KHOI_PHUC_TAI_KHOAN(_id: ID!) : TAI_KHOAN,
        DANG_NHAP(email: String!,mat_khau: String!) : AUTHENCATION_RESPONSE,
        DANG_XUAT(email: String!,mat_khau: String!) : AUTHENCATION_RESPONSE,
        QUEN_MAT_KHAU(_id: ID!,email: String!) : TAI_KHOAN,
        DOI_MAT_KHAU(_id: ID!,mat_khau_cu: String!,mat_khau_moi: String!) : TAI_KHOAN
    }
`
module.exports = mutation