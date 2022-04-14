import { gql } from '@apollo/client';

export const getAll = gql`
    query {
        DS_BENH_NHAN {
            _id
            ho_ten
            nam_sinh
            gioi_tinh
            created_at
            updated_at
            dia_chi
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

