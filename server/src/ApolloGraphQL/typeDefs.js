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

    type Query {
        DS_BENH_NHAN: [BENH_NHAN]
        BENH_NHAN (_id: ID!): BENH_NHAN

        DS_PHIEU_KHAM: [PHIEU_KHAM]
        PHIEU_KHAM (_id: ID!): PHIEU_KHAM

        DS_LOAI_BENH: [LOAI_BENH]
        LOAI_BENH (_id: ID!): LOAI_BENH
    }

    type Mutation {
        THEM_BENH_NHAN(ho_ten: String,gioi_tinh: String,nam_sinh: Int,dia_chi: String): BENH_NHAN
        THEM_LOAI_BENH(ten_loai_benh: String): LOAI_BENH
    }
`
module.exports = typeDefs