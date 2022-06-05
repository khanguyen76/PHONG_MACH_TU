import { gql } from '@apollo/client';

export const getPage = gql`
    query ($page: Int, $pageSize: Int) {
        DS_TAI_KHOAN(page: $page, pageSize: $pageSize) {
            pages
            total
            doc {
                quyen
                ngay_sinh
                gioi_tinh
                mat_khau
                email
                _id
                ho_ten
            }
        }
    }
`

export const login = gql`
    mutation ($email: String!, $matKhau: String!) {
        DANG_NHAP(email: $email, mat_khau: $matKhau) {
            accessToken
            doc {
                _id
                ho_ten
                email
                mat_khau
                gioi_tinh
                ngay_sinh
                quyen
            }
        }
    }
`

export const getProfile = gql`
    query ($token: String!) {
        TAI_KHOAN(token: $token) {
            _id
            ho_ten
            email
            gioi_tinh
            ngay_sinh
            quyen
        }
    }
`

// Xoá 1 phần tử với Id
export const deleteItemById = gql`
    mutation ($id: ID!) {
        XOA_TAI_KHOAN(_id: $id) {
            code
            success
            message
        }
    }
`