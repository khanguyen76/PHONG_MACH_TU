const { gql } = require('apollo-server-express')

const typeDefs = gql`
    scalar Date

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

    type PHIEU_KHAM {
        _id: ID,
        ngay_kham: Date,
        benh_nhan: BENH_NHAN,
        loai_benh: LOAI_BENH,
        is_deleted: Boolean,
        created_at: Date,
        updated_at: Date,
    }

    type LOAI_BENH {
        _id: ID,
        ten_loai_benh: String,
        is_deleted: Boolean,
        created_at: Date,
        updated_at: Date,
    }

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

    type Query {
        DS_BENH_NHAN: [BENH_NHAN]
        BENH_NHAN (_id: ID!): BENH_NHAN

        DS_PHIEU_KHAM: [PHIEU_KHAM]
        PHIEU_KHAM (_id: ID!): PHIEU_KHAM

        DS_LOAI_BENH: [LOAI_BENH]
        LOAI_BENH (_id: ID!): LOAI_BENH
    }

    type TAI_KHOAN_RESPONSE {
        code: Int!
        success: Boolean!
        message: String!
        doc: TAI_KHOAN
    }
    type AUTHENCATION_RESPONSE {
        code: Int!
        success: Boolean!
        message: String!
        accessToken: String!
        doc: TAI_KHOAN
    }


    type Mutation {
        THEM_BENH_NHAN(ho_ten: String,gioi_tinh: String,nam_sinh: Int,dia_chi: String): BENH_NHAN
        THEM_LOAI_BENH(ten_loai_benh: String!): LOAI_BENH
        TAO_TAI_KHOAN(ho_ten: String!,email:String!,mat_khau:String!,gioi_tinh:String!,ngay_sinh:Date!,quyen:String!) :TAI_KHOAN_RESPONSE,
        SUA_TAI_KHOAN(_id: ID!,ho_ten: String,email:String,mat_khau:String,gioi_tinh:String,ngay_sinh:Date,quyen:String) : TAI_KHOAN_RESPONSE,
        XOA_TAI_KHOAN(_id: ID!) : TAI_KHOAN_RESPONSE,
        KHOI_PHUC_TAI_KHOAN(_id: ID!) : TAI_KHOAN_RESPONSE,
        DANG_NHAP(email: String!,mat_khau: String!) : AUTHENCATION_RESPONSE,
        QUEN_MAT_KHAU(_id: ID!,email: String!) : TAI_KHOAN_RESPONSE,
        DOI_MAT_KHAU(_id: ID!,mat_khau_cu: String!,mat_khau_moi: String!) : TAI_KHOAN_RESPONSE
    }
`
module.exports = typeDefs