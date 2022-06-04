import { gql } from '@apollo/client';

export const getPage = gql`
    query ($page: Int, $pageSize: Int){
        DS_BENH_NHAN(page: $page, pageSize: $pageSize) {
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
