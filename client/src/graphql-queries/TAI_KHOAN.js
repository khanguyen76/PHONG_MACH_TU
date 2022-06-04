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