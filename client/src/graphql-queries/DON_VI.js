DS_DON_VI
import { gql } from '@apollo/client';

// Lấy danh sách
export const getUnitList = gql`
    query {
        DS_DON_VI {
            _id
            ten_don_vi
        }
    }
`