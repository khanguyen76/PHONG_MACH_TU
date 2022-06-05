import React, { useState, useEffect, useMemo } from 'react'
// Components
import Modal from '../../components/modal'
import Table from '../../components/table'
// API
import { useQuery, useMutation } from "@apollo/client"
import { getPage } from "../../graphql-queries/BENH_NHAN"
import { addNew } from "../../graphql-queries/PHIEU_KHAM"
export default function ({
    openModal,
    onClose,
    onSubmited
}) {
    const [params, setParams] = useState({
        page: 1,
        pageSize: 4
    })

    const { loading, error, data, refetch } = useQuery(getPage, {
        variables: params,
        // fetchPolicy: 'network-only'
    });
    const [saveNewItem] = useMutation(addNew);

    const handleChangePage = (pageNumber) => {
        setParams({ ...params, page: pageNumber })
    }

    const handleAddNew = async (id) => {
        if(id){
            let res = await saveNewItem({
                variables: {maBenhNhan: id}
            })
            onSubmited(res.data.THEM_BENH_NHAN)
        }
    }

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
                                    <button className="btn btn--primary mr-2" onClick={()=>handleAddNew(row._id)}>Lập phiếu</button>
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
                    onPageChange={handleChangePage}
                    style={{ border: 'none' }}
                />
            </Modal.body>
        </Modal>
    )
}
