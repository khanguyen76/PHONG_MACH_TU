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