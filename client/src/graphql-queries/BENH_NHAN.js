import { gql } from '@apollo/client';

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

