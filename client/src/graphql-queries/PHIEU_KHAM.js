import { gql } from '@apollo/client';

export const getPage = gql`
    query ($page: Int, $pageSize: Int) {
        DS_PHIEU_KHAM(page: $page, pageSize: $pageSize) {
            pages
            total
            doc {
            _id
            ngay_kham
            benh_nhan {
                ho_ten
                gioi_tinh
                nam_sinh
                dia_chi
                _id
            }
            }
        }
    }
`
export const getListField = gql`
    query {
        DS_LOAI_BENH {
            _id
            ten_loai_benh
        }
        DS_THUOC {
            doc {
                _id
                ten_thuoc
                don_vi {
                    _id
                    ten_don_vi
                }
                cach_dung {
                    _id
                    mo_ta_cach_dung
                }
                don_gia
            }
        }
    }
`

export const getItemById = gql`
    query ($id: ID!) {
    PHIEU_KHAM(_id: $id) {
            _id
            ngay_kham
            benh_nhan {
                _id
                ho_ten
                nam_sinh
                gioi_tinh
                dia_chi
            }
            trieu_chung
            loai_benh {
                _id
                ten_loai_benh
            }
            don_thuoc {
                thuoc {
                    don_vi {
                    _id
                    ten_don_vi
                    }
                    _id
                    ten_thuoc
                    cach_dung {
                    _id
                    mo_ta_cach_dung
                    }
                    don_gia
                }
                so_luong
                don_gia
                thanh_tien
            }
        }
    }
`
export const addNew = gql`
    mutation ($maBenhNhan: String!) {
        THEM_PHIEU_KHAM(ma_benh_nhan: $maBenhNhan) {
            _id
            ngay_kham
            benh_nhan {
                _id
                ho_ten
                nam_sinh
                gioi_tinh
                dia_chi
            }
            tien_kham
            tong_tien
        }
    }
 `
export const updateItemById = gql`
mutation ($id: ID!, $maLoaiBenh: String, $trieuChung: String, $ngayKham: Date, $donThuoc: [THUOC_KE_DON]) {
    CAP_NHAT_PHIEU_KHAM(_id: $id, ma_loai_benh: $maLoaiBenh, trieu_chung: $trieuChung, ngay_kham: $ngayKham, don_thuoc: $donThuoc) {
        code
        success
        message
    }
}
`

// Xo?? 1 ph???n t??? v???i Id
export const deleteItemById = gql`
    mutation ($id: ID!) {
        XOA_PHIEU_KHAM(_id: $id) {
            code
            success
            message
        }
    }
`