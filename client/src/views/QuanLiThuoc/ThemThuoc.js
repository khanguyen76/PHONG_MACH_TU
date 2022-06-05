import React, { useState, useEffect, useMemo } from 'react'
// Components
import Modal from '../../components/modal'
import Table from '../../components/table'
// API
import { useQuery } from "@apollo/client"
import { getPage } from "../../graphql-queries/BENH_NHAN"
export default function ({
    openModal,
    onClose
}) {

    // const { loading, error, data, refetch } = useQuery(getPage, {
    //     variables: params,
    //     // fetchPolicy: 'network-only'
    // });
    return (
        <Modal open={openModal}>
            <Modal.header handleClose={onClose}>
                <h1>Thêm thuốc</h1>
            </Modal.header>
            <Modal.body>
                <Table
                    columns={[
                        {
                            label: "Tên thuốc",
                            accessor: (row, key) => (key + 1) + (params.page > 1 ? params.pageSize : 0),
                            textAlign: "center",
                            props: {
                                width: 80
                            }
                        },
                        {
                            label: "Đơn giá",
                            accessor: 'ho_ten',
                            isSearchable: 'ho_ten',
                            props: {
                                width: 300
                            }
                        },
                        {
                            label: "Đơn vị tính tính",
                            accessor: 'gioi_tinh',
                            textAlign: "center",
                            props: {
                                width: 150
                            }
                        },
                        {
                            label: "Cách dùng",
                            accessor: 'nam_sinh',
                            textAlign: "center",
                            props: {
                                width: 150
                            }
                        }
                    ]}
                />
            </Modal.body>
        </Modal>
    )
}
