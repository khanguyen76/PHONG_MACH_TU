import { gql } from '@apollo/client';

// Lấy danh sách có phân trang
export const getPage = gql`
    query ($search: TIM_BENH_NHAN, $pageSize: Int, $page: Int) {
        DS_BENH_NHAN(search: $search, pageSize: $pageSize, page: $page) {
            pages
            total
            doc {
                _id
                ho_ten
                nam_sinh
                gioi_tinh
                dia_chi
            }
        }
    }
`
// Lấy phần tử với ID
export const getItemById = gql`
    query getItemById ($id: ID!){
        BENH_NHAN(_id: $id) {
            _id
            ho_ten
            nam_sinh
            gioi_tinh
            dia_chi
            created_at
            updated_at
        }
    }
`
// Thêm phần tử mới
export const addNew = gql`
    mutation ($hoTen: String!, $namSinh: Int!, $diaChi: String!, $gioiTinh: String!) {
        THEM_BENH_NHAN(ho_ten: $hoTen, nam_sinh: $namSinh, dia_chi: $diaChi, gioi_tinh: $gioiTinh) {
            code
            success
            message
        }
    }
`
// Cập nhật thông tin 1 phần từ với Id
export const editItemById = gql`
    mutation ($id: ID!, $hoTen: String, $gioiTinh: String, $namSinh: Int, $diaChi: String) {
    CAP_NHAT_BENH_NHAN(_id: $id, ho_ten: $hoTen, gioi_tinh: $gioiTinh, nam_sinh: $namSinh, dia_chi: $diaChi) {
            code
            success
            message
        }
    }
`
// Xoá 1 phần tử với Id
export const deleteItemById = gql`
    mutation ($id: ID!) {
        XOA_BENH_NHAN(_id: $id) {
            code
            success
            message
        }
    }
`

