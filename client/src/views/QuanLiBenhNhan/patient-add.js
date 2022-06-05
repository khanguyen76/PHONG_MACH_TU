import { useMutation } from '@apollo/client';
import { React, useState, useEffect } from 'react';
import { Component } from "react";
import Modal from "../../components/modal";
import Radio from '../../components/radio-button';
import Select from '../../components/select';
import TextBox from '../../components/textbox';
import { addNew } from '../../graphql-queries/BENH_NHAN';
import Swal from 'sweetalert2';

export default function ({
    children,
    open,
    handleClose,
    onAdd
}) {
    const [insertNewPatient] = useMutation(addNew)
    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(100),(val, index) => year - index);

    const [name, setName] = useState()
    const [birthYear, setBirthYear] = useState(year)
    const [gender, setGender] = useState()
    const [address, setAddress] = useState()

    const insertPatient = async() => {
        console.log("start call api "+name+" " + birthYear + " " + address + " " + gender)
        let res = await insertNewPatient({
            variables: { hoTen: name, namSinh: parseInt(birthYear), diaChi: address, gioiTinh: gender}
        })

        if (res.data.THEM_BENH_NHAN.success) {
            console.log("inserted success")
            Swal.fire({
                text: `Thêm bệnh nhân thành công.`,
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
                text: `Thêm bệnh nhân không thành công, vui lòng thử lại.`,
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

    const onGenderChanged = (value) => {
        setGender(value)
        console.log("onGenderChanged gender=" + gender)
    }

    const onYearChanged = (value) => {
        setBirthYear(value.target.value)
        console.log("onYearChanged birthYear=" + birthYear)
    }

    const onAddressChanged = (value) => {
        setAddress(value.target.value)
        console.log("onAddressChanged address=" + address)
    }

    return (
        <Modal
            open={open}
            handleClose={handleClose}
        >
            <Modal.header
                handleClose={handleClose}>
                <div className="container">
                    <h1>Thêm bệnh nhân</h1>
                </div>
            </Modal.header>
            <Modal.body>
                <div className="text-with-spacing" style={{
                    display:"flex"
                    }}>
                    <h4>Họ tên</h4>
                    <TextBox className="edit-field" onChangeValue={onNameChanged} />
                </div>

                <div className="text-with-spacing" style={{display:"flex"}}>
                    <h4>Năm sinh</h4>
                    <Select className="edit-selects" options={years} onChange={onYearChanged} />
                </div>

                <div className="text-with-spacing" style={{display:"flex"}}>
                    <h4>Giới tính</h4>
                    <Radio className="edit-field-radio" options={[{id: "1", value: "Nam", label: "Nam"}, {id: "2", value: "Nữ", label: "Nữ"}]} changed={onGenderChanged} />
                </div>

                <div className="text-with-spacing" style={{display:"flex"}}>
                    <h4>Địa chỉ</h4>
                    <TextBox className="edit-field" onChangeValue={onAddressChanged} />
                </div>
            </Modal.body>
            <Modal.footer>
                <button class="btn btn-default" onClick={handleClose}>Hủy bỏ</button>
                <button className="btn btn--primary mb-2" onClick={insertPatient}>Thêm</button>
            </Modal.footer>
        </Modal>
    )
}