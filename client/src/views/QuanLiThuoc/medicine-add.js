import { useMutation } from '@apollo/client';
import { React, useState, useEffect } from 'react';
import { Component } from "react";
import Modal from "../../components/modal";
import Radio from '../../components/radio-button';
import Select from '../../components/select';
import TextBox from '../../components/textbox';
import { addNew } from '../../graphql-queries/THUOC';
import { getUsageList } from '../../graphql-queries/CACH_DUNG'
import { getUnitList } from '../../graphql-queries/DON_VI'
import { getUsages } from '../../graphql-queries/'
import Swal from 'sweetalert2';

export default function ({
    children,
    open,
    handleClose,
    onAdd
}) {
    const [insertNewMedicine] = useMutation(addNew)
    const [getUsageData] = useLazyQuery(getUsageList);
    const [getUnitData] = useLazyQuery(getUnitList);
    const [updatePatientById] = useMutation(editItemById)

    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [usage, setUsage] = useState()
    const [unit, setUnit] = useState()

    useEffect(() => {
        (async () => {
            let res = await getUsageData();
            console.log("load res=", res)
        })()
    }, []);

    const insertMedicine = async() => {
        let res = await insertNewMedicine({
            variables: { }
        })

        if (res.data.THEM_THUOC.success) {
            console.log("inserted success")
            Swal.fire({
                text: `Thêm thuốc thành công.`,
                icon: 'check',
                showConfirmButton: true,
                confirmButtonText: 'Xác nhận',
                reverseButtons: true
              })
            onAdd()
            handleClose()
        } else {
            console.log("inserted fail")
            Swal.fire({
                text: `Thêm thuốc không thành công, vui lòng thử lại.`,
                icon: 'check',
                showConfirmButton: true,
                confirmButtonText: 'Xác nhận',
                reverseButtons: true
              })
        }
    }

    const onNameChanged = (value) => {
        setName(value.target.value)
        console.log("onNameChanged name=" + name)
    }

    const onPriceChanged = (value) => {
        setPrice(value)
    }

    const onUsageChanged = (value) => {
        setUsage(value.target.value)
    }

    const onUnitChanged = (value) => {
        setUnit(value.target.value)
    }

    return (
        <Modal
            open={open}
            handleClose={handleClose}
        >
            <Modal.header
                handleClose={handleClose}>
                <div className="container">
                    <h1>Thêm thuốc</h1>
                </div>
            </Modal.header>
            <Modal.body>
                <div className="text-with-spacing" style={{
                    display:"flex"
                    }}>
                    <h4>Tên thuốc</h4>
                    <TextBox className="edit-field" onChangeValue={onNameChanged} />
                </div>

                <div className="text-with-spacing" style={{display:"flex"}}>
                    <h4>Đơn giá</h4>
                    <Select className="edit-selects" options={years} onChange={onPriceChanged} />
                </div>

                <div className="text-with-spacing" style={{display:"flex"}}>
                    <h4>Đơn vị tính</h4>
                    <Radio className="edit-field-radio" options={[{id: "1", value: "Nam", label: "Nam"}, {id: "2", value: "Nữ", label: "Nữ"}]} changed={onGenderChanged} />
                </div>

                <div className="text-with-spacing" style={{display:"flex"}}>
                    <h4>Cách dùng</h4>
                    <TextBox className="edit-field" onChangeValue={onUsageChanged} />
                </div>
            </Modal.body>
            <Modal.footer>
                <button class="btn btn-default" onClick={handleClose}>Hủy bỏ</button>
                <button className="btn btn--primary mb-2" onClick={onUnitChanged}>Thêm</button>
            </Modal.footer>
        </Modal>
    )
}