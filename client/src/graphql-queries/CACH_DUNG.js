import { gql } from '@apollo/client';

// Lấy danh sách
export const getUsageList = gql`
    query {
        DS_CACH_DUNG {
            _id
            mo_ta_cach_dung
        }
    }
`