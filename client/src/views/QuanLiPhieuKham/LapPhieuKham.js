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
    const [params, setParams] = useState({
        page: 1,
        pageSize: 4
    })

    const { loading, error, data, refetch } = useQuery(getPage, {
        variables: params,
        // fetchPolicy: 'network-only'
    });

    console.log(data);

    return (
        <Modal open={openModal}>
            <Modal.header handleClose={onClose}>
                <h1>Lập phiếu khám</h1>
            </Modal.header>
            <Modal.body>
                <Table
                    columns={[
                        {
                            label: "STT",
                            accessor: (row, key) => (key + 1) + (params.page > 1 ? params.pageSize : 0),
                            textAlign: "center",
                            props: {
                                width: 80
                            }
                        },
                        {
                            label: "Họ tên",
                            accessor: 'ho_ten',
                            isSearchable: 'ho_ten',
                            props: {
                                width: 300
                            }
                        },
                        {
                            label: "Giới tính",
                            accessor: 'gioi_tinh',
                            textAlign: "center",
                            props: {
                                width: 150
                            }
                        },
                        {
                            label: "Năm sinh",
                            accessor: 'nam_sinh',
                            textAlign: "center",
                            props: {
                                width: 150
                            }
                        },
                        {
                            label: "Địa chỉ",
                            accessor: 'dia_chi',
                        },
                        {
                            label: "",
                            textAlign: "right",
                            accessor: (row) => (
                                <div className="group-button no-wrap">
                                    <button className="btn btn--primary mr-2">Lập phiếu</button>
                                </div>
                            ),
                            props: {
                                width: 200
                            }
                        }
                    ]}
                    data={data?.DS_BENH_NHAN.doc}
                    pagination={{
                        currentPage: params?.page,
                        totalPage: data?.DS_BENH_NHAN.pages,
                        totalRecord: data?.DS_BENH_NHAN.total,
                    }}
                    // onPageChange={handleChangePage}
                    style={{border:'none'}}
                />
            </Modal.body>
        </Modal>
    )
}
