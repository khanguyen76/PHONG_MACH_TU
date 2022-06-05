import React, { useState, useEffect, useMemo } from 'react'
// Components
import Modal from '../../components/modal'
import Table from '../../components/table'
import Radio from '../../components/radio-button';
import Select from '../../components/select';
import TextBox from '../../components/textbox';
import { useForm } from "react-hook-form"
// API
import { useQuery, useMutation } from "@apollo/client"
import { getListField, addNew, editItemById } from '../../graphql-queries/THUOC';
export default function ({
    openModal,
    data,
    onClose,
    onSubmited
}) {
    const { data: dataField } = useQuery(getListField);
    const [addMedicine] = useMutation(addNew);
    const [updateMedicine] = useMutation(editItemById);
    const { register, handleSubmit, watch, reset } = useForm();

    const onSubmit = async (dataHookForm) => {
        console.log(dataHookForm);
        let res = await updateMedicine({
            variables:{
                id:data._id,
                "tenThuoc": dataHookForm.ten_thuoc,
                "maDonVi": dataHookForm.don_vi,  
                "maCachDung": dataHookForm.cach_dung,
                "donGia": parseInt(dataHookForm.don_gia)
            }
        })
        onSubmited(res)
    }

    useEffect(() => {
      if(data){
          reset({
              ten_thuoc: data.ten_thuoc,
              don_vi: data.don_vi._id,
              don_gia: data.don_gia,
              cach_dung: data.cach_dung._id
          })
      }
    }, [data])
    
    
    return (
        <Modal
            open={openModal}
        >
            <Modal.header handleClose={onClose}>
                <div className="container">
                    <h1>Thêm thuốc</h1>
                </div>
            </Modal.header>
            <Modal.body>
                <form>
                    <div className="text-with-spacing" style={{
                        display: "flex",
                        padding: 20
                    }}>
                        <h4 className='mr-2'>Tên thuốc</h4>
                        <input
                            className='field field-textbox'
                            {...register('ten_thuoc')}
                        />
                    </div>
                    <div className="text-with-spacing" style={{
                        display: "flex",
                        padding: 20
                    }}>
                        <h4 className='mr-2'>Đơn giá</h4>
                        <input
                            type="number"
                            className='field field-textbox'
                            {...register('don_gia')}
                        />
                    </div>
                    <div className="text-with-spacing" style={{
                        display: "flex",
                        padding: 20
                    }}>
                        <h4 className='mr-2'>Đơn vị</h4>
                        <select
                            className='field field-select ml-2'
                            {...register('don_vi')}
                        >
                            <option value="">Chọn đơn vị</option>
                            {
                                dataField?.DS_DON_VI?.map(item => <option value={item._id}>{item.ten_don_vi}</option>)
                            }
                        </select>
                    </div>
                    <div className="text-with-spacing" style={{
                        display: "flex",
                        padding: 20
                    }}>
                        <h4 className='mr-2'>Cách dùng</h4>
                        <select
                            className='field field-select ml-2'
                            {...register('cach_dung')}
                        >
                            <option value="">Chọn cách dùng</option>
                            {
                                dataField?.DS_CACH_DUNG?.map(item => <option value={item._id}>{item.mo_ta_cach_dung}</option>)
                            }
                        </select>
                    </div>
                </form>
            </Modal.body>
            <Modal.footer>
                <button class="btn btn-default" onClick={onClose}>Hủy bỏ</button>
                <button className="btn btn--primary mb-2" onClick={handleSubmit(onSubmit)}>Lưu thay đổi</button>
            </Modal.footer>
        </Modal>
    )
}
