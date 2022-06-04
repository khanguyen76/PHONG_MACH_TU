import { gql } from '@apollo/client';

export const getPage = gql`
    query ($page: Int, $size: Int) {
        DS_THUOC(page: $page, size: $size) {
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