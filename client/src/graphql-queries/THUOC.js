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