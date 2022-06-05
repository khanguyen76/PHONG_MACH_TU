import { gql } from '@apollo/client';

// Lấy danh sách
export const getList = gql`
    query {
        DS_LOAI_BENH {
            _id
            ten_loai_benh
        }
    }
`