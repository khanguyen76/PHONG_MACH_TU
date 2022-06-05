import { gql } from '@apollo/client';

export const getPage = gql`
    query ($page: Int, $pageSize: Int, , $search: TIM_THUOC) {
        DS_THUOC(page: $page, pageSize: $pageSize, search: $search) {
            pages
            total
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
// Lấy phần tử với ID
export const getItemById = gql`
    query THUOC($id: ID!) {
  THUOC(_id: $id) {
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
`
export const getListField = gql`
    query {
        DS_DON_VI {
            _id
            ten_don_vi
        }
        DS_CACH_DUNG {
            _id
            mo_ta_cach_dung
        }
    }
`

export const addNew = gql`
    mutation THEM_THUOC($tenThuoc: String!, $maDonVi: String!, $maCachDung: String!, $donGia: Int!) {
    THEM_THUOC(ten_thuoc: $tenThuoc, ma_don_vi: $maDonVi, ma_cach_dung: $maCachDung, don_gia: $donGia) {
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
`
// Cập nhật thông tin 1 phần từ với Id
export const editItemById = gql`
    mutation Mutation($id: ID!, $tenThuoc: String, $maDonVi: String, $maCachDung: String, $donGia: Int) {
        CAP_NHAT_THUOC(_id: $id, ten_thuoc: $tenThuoc, ma_don_vi: $maDonVi, ma_cach_dung: $maCachDung, don_gia: $donGia) {
            _id
        }
    }
`

// Xoá 1 phần tử với Id
export const deleteItemById = gql`
    mutation ($id: ID!) {
        XOA_THUOC(_id: $id) {
            code
            success
            message
        }
    }
`