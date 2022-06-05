import React, { useState, useEffect, useMemo } from 'react'
import { useForm } from "react-hook-form"
// Components
import Modal from '../../components/modal'
import Table from '../../components/table'
// import Tab from '../../components/tab'
// M UI
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
// API
import { useQuery, useMutation } from "@apollo/client"
import { getPage } from "../../graphql-queries/BENH_NHAN"
import { addNew } from "../../graphql-queries/PHIEU_KHAM"
import { getList } from "../../graphql-queries/LOAI_BENH"
// Vendors
import moment from 'moment';
export default function ({
    openModal,
    data,
    onClose,
    onAdded
}) {
    const { register, handleSubmit, watch, reset } = useForm({
        loai_benh: data?.loai_benh?._id
    });
    const { loading, data: dataLoaiBenh, error } = useQuery(getList)
    const [prescription, setPrescription] = useState([])

    const onSubmit = (dataHookForm) => {
        console.log(dataHookForm);
    }

    useEffect(()=>{
        if(data){
            reset({
                loai_benh: data?.loai_benh?._id,
                trieu_chung: data?.trieu_chung,
            })
            setPrescription(data?.don_thuoc)
        }
    },[data])

    return (
        <Modal open={openModal}>
            <Modal.header handleClose={onClose}></Modal.header>
            <Modal.body>
                <form style={{ padding: '0 40px 40px 40px' }}>
                    <h1 className='mb-2'>Bệnh án</h1>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <b>Họ tên: </b><span>{data?.benh_nhan.ho_ten}</span>
                        </Grid>
                        <Grid item xs={4}>
                            <b>Năm sinh: </b><span>{data?.benh_nhan.nam_sinh}</span>
                        </Grid>
                        <Grid item xs={4}>
                            <b>Giới tính: </b><span>{data?.benh_nhan.gioi_tinh}</span>
                        </Grid>
                        <Grid item xs={12}>
                            <b>Địa chỉ: </b><span>{data?.benh_nhan.dia_chi}</span>
                        </Grid>
                        <Grid item xs={12}>
                            <b>Ngày khám: </b><span>{moment(data?.ngay_kham).format("DD/MM/YYYY")}</span>
                        </Grid>
                        <Grid item xs={12}>
                            <b>Chuẩn đoán: </b>
                            <span>
                                <select
                                    className='field field-select ml-2'
                                    {...register('loai_benh')}
                                    defaultValue={data?.loai_benh?._id}>
                                    <option value="">Chọn loại bệnh</option>
                                    {
                                        dataLoaiBenh?.DS_LOAI_BENH?.map(item => <option value={item._id}>{item.ten_loai_benh}</option>)
                                    }
                                </select>
                            </span>
                        </Grid>
                        <Grid item xs={12}>
                            <b>Triệu chứng: </b>
                            <div>
                                <textarea className='field field-textarea mt-2' {...register('trieu_chung')} id="" rows="5" defaultValue={data?.trieu_chung}></textarea>
                            </div>
                        </Grid>
                    </Grid>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <h1 className='mt-2 mb-2'>Đơn thuốc</h1>
                        <button className="btn btn--primary mb-2" onClick={() => { }}>Thêm thuốc</button>
                    </div>
                    <Table
                        columns={[
                            {
                                label: "STT",
                                accessor: (row, key) => key + 1,
                                textAlign: "center",
                                props: {
                                    width: 80
                                }
                            },
                            {
                                label: "Tên thuốc",
                                props: {
                                    width: 300
                                },
                                accessor: row => row.thuoc.ten_thuoc
                            },
                            {
                                label: "Số lượng",
                                textAlign: "center",
                                props: {
                                    width: 100
                                },
                                accessor: row => row.so_luong
                            },
                            {
                                label: "Đơn vị",
                                textAlign: "center",
                                props: {
                                    width: 100
                                },
                                accessor: row => row.thuoc.don_vi.ten_don_vi
                            },
                            {
                                label: "Cách dùng",
                                accessor: row => row.thuoc.cach_dung.mo_ta_cach_dung
                            },
                            {
                                label: "",
                                textAlign: "right",
                                accessor: row => (
                                    <div className="group-button no-wrap">
                                        <button
                                            // onClick={() => handleDeleteItem(row.ngay_kham, row.benh_nhan.ho_ten)}
                                            className="btn btn__icon btn__outline btn__outline--danger mr-2"
                                        ><DeleteIcon /></button>
                                    </div>
                                ),
                                props: {
                                    width: 150
                                }
                            }
                        ]}
                        data={prescription}
                    />
                </form>
            </Modal.body>
            <Modal.footer>
                <div style={{ textAlign: 'right', padding: '0 20px' }}>
                    <button className="btn btn--secondary mr-1">Huỷ bỏ</button>
                    <button className="btn btn--primary" onClick={handleSubmit(onSubmit)}>Lưu thay đổi</button>
                </div>
            </Modal.footer>
        </Modal>
    )
}
