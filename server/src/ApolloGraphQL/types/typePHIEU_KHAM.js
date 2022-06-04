const { gql } = require('apollo-server-express')

const typeTAI_KHOAN = gql`
    type PHIEU_KHAM {
        _id: ID,
        ngay_kham: Date,
        benh_nhan: BENH_NHAN,
        loai_benh: LOAI_BENH,
        trieu_chung: String,
        don_thuoc: [CHI_TIET_DON_THUOC],
        tien_kham: Int,
        tong_tien: Int,
        is_deleted: Boolean,
        created_at: Date,
        updated_at: Date,
    }  
    input THUOC_KE_DON {
        ma_thuoc: String,
        so_luong: Int,
    }   
    input TIM_PHIEU_KHAM{
        ngay_kham: Date
    } 
    type CHI_TIET_DON_THUOC {
        thuoc: THUOC,
        so_luong: Int,
        don_gia: Int,
        thanh_tien: Int,
    }
    type DS_PHIEU_KHAM_RESPONSE {
        pages: Int,
        total: Int
        doc: [PHIEU_KHAM]
    }
`
module.exports = typeTAI_KHOAN