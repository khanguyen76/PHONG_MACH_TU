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
import { getListField, updateItemById } from "../../graphql-queries/PHIEU_KHAM"
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
    const { loading, data: dataField, error } = useQuery(getListField)
    const [updateData] = useMutation(updateItemById)
    const [prescription, setPrescription] = useState([])

    const onSubmit = async (dataHookForm) => {
        console.log(dataHookForm);
        let prescriptionData = prescription.filter(i=>i.thuoc)
        console.log(prescriptionData);
        console.log({
            ma_loai_benh: dataHookForm.loai_benh,
            trieu_chung: dataHookForm.trieu_chung,
            don_thuoc: prescriptionData.map(i=>({
                ma_thuoc:i.thuoc._id,
                so_luong:i.so_luong
            }))
        });
        let res = await updateData({
            variables:{
                id: data._id,
                maLoaiBenh: dataHookForm.loai_benh,
                trieuChung: dataHookForm.trieu_chung,
                donThuoc: prescriptionData.map(i=>({
                    ma_thuoc:i.thuoc._id,
                    so_luong:i.so_luong
                }))
            }
        })
    }

    const addMedicine = () => {
        let clone = JSON.parse(JSON.stringify(prescription))
        clone.push({
            so_luong: 1
        })
        setPrescription(clone)
    }

    const deleteMedicine = (idx) => {
        let clone = JSON.parse(JSON.stringify(prescription))
        clone.splice(idx, 1)
        setPrescription(clone)
    }

    const updateMedicine = ({ idx, id }) => {
        let clone = JSON.parse(JSON.stringify(prescription))
        let med = dataField?.DS_THUOC.doc.find(i => i._id == id)
        clone[idx] = {
            so_luong: 1,
            thuoc: med
        }
        setPrescription(clone)
    }

    const updateAmount = ({ idx, value }) => {
        let clone = JSON.parse(JSON.stringify(prescription))
        clone[idx] = {
            ...clone[idx],
            so_luong: value > 1 ? value : 1,
        }
        setPrescription(clone)
    }

    useEffect(() => {
        if (data) {
            reset({
                loai_benh: data?.loai_benh?._id,
                trieu_chung: data?.trieu_chung,
            })
            setPrescription(data?.don_thuoc)
        }
    }, [data])

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
                                        dataField?.DS_LOAI_BENH?.map(item => <option value={item._id}>{item.ten_loai_benh}</option>)
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
                        <button type="button" className="btn btn--primary mb-2" onClick={addMedicine}>Thêm thuốc</button>
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
                                accessor: (row, key) => (
                                    <select
                                        defaultValue={row.thuoc?._id}
                                        onChange={(e) => updateMedicine({
                                            idx: key,
                                            id: e.target.value
                                        })}
                                    >
                                        <option value="">Chọn thuốc</option>
                                        {
                                            dataField?.DS_THUOC.doc?.map((item, key) => <option key={key} value={item._id}>{item.ten_thuoc}</option>)
                                        }
                                    </select>
                                )
                            },
                            {
                                label: "Số lượng",
                                textAlign: "center",
                                props: {
                                    width: 100
                                },
                                accessor: (row,key) => (
                                    <input
                                        type="number"
                                        defaultValue={row.so_luong}
                                        onChange={(e) => updateAmount({
                                            idx: key,
                                            value: e.target.value
                                        })}
                                        style={{ width: 50 }} />
                                )
                            },
                            {
                                label: "Đơn vị",
                                textAlign: "center",
                                props: {
                                    width: 100
                                },
                                accessor: row => row.thuoc?.don_vi.ten_don_vi
                            },
                            {
                                label: "Cách dùng",
                                accessor: row => row.thuoc?.cach_dung.mo_ta_cach_dung
                            },
                            {
                                label: "",
                                textAlign: "right",
                                accessor: (row, key) => (
                                    <div className="group-button no-wrap">
                                        <button
                                            type="button"
                                            onClick={() => deleteMedicine(key)}
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
