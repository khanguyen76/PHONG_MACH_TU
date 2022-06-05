import { useMutation, useLazyQuery } from '@apollo/client';
import { React, useState, useEffect } from 'react';
import { Component } from "react";
import Modal from "../../components/modal";
import Radio from '../../components/radio-button';
import Select from '../../components/select';
import TextBox from '../../components/textbox';
import { editItemById, getItemById } from '../../graphql-queries/BENH_NHAN';
import Swal from 'sweetalert2';

export default function ({
    children,
    open,
    handleClose,
    patientId,
    onAdd
}) {
    const [getData] = useLazyQuery(getItemById);
    const [updatePatientById] = useMutation(editItemById)

    useEffect(() => {
        if (patientId) {
            (async () => {
                let res = await getData({
                    variables: {id:patientId},
                });
                console.log("load res=", res)
                setName(res.data?.BENH_NHAN.ho_ten)
                setBirthYear(res.data?.BENH_NHAN.nam_sinh)
                setGender(res.data?.BENH_NHAN.gioi_tinh)
                setAddress(res.data?.BENH_NHAN.dia_chi)
            })()
        }
    }, [patientId]);

    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(100), (val, index) => year - index);

    const [name, setName] = useState()
    const [birthYear, setBirthYear] = useState(year)
    const [gender, setGender] = useState()
    const [address, setAddress] = useState()

    const updatePatient = async () => {
        console.log("start call api " + name + " " + birthYear + " " + address + " " + gender)
        let res = await updatePatientById({
            variables: { id: patientId, hoTen: name, namSinh: parseInt(birthYear), diaChi: address, gioiTinh: gender }
        })

        if (res.data.CAP_NHAT_BENH_NHAN.success) {
            console.log("updated")
            Swal.fire({
                text: `Cập nhật thành công.`,
                icon: 'check',
                showConfirmButton: true,
                confirmButtonText: 'Xác nhận',
                reverseButtons: true
            })
            onAdd()
            handleClose()
        } else {
            console.log("not updated yet")
            Swal.fire({
                text: `Cập nhật không thành công, vui lòng thử lại.`,
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
                    <h1>Cập nhật bệnh nhân</h1>
                </div>
            </Modal.header>
            <Modal.body>
                <div className="text-with-spacing" style={{
                    display: "flex"
                }}>
                    <h4>Họ tên</h4>
                    <TextBox value={name} className="edit-field" onChangeValue={onNameChanged} />
                </div>

                <div className="text-with-spacing" style={{ display: "flex" }}>
                    <h4>Năm sinh</h4>
                    <Select value={birthYear} className="edit-selects" options={years} onChange={onYearChanged} />
                </div>

                <div className="text-with-spacing" style={{ display: "flex" }}>
                    <h4>Giới tính</h4>
                    <Radio value={gender} className="edit-field-radio" options={[{ id: "1", value: "Nam", label: "Nam" }, { id: "2", value: "Nữ", label: "Nữ" }]} changed={onGenderChanged} />
                </div>

                <div className="text-with-spacing" style={{ display: "flex" }}>
                    <h4>Địa chỉ</h4>
                    <TextBox value={address} className="edit-field" onChangeValue={onAddressChanged} />
                </div>
            </Modal.body>
            <Modal.footer>
                <button class="btn btn-default" onClick={handleClose}>Hủy bỏ</button>
                <button className="btn btn--primary mb-2" onClick={updatePatient}>Lưu thay đổi</button>
            </Modal.footer>
        </Modal>
    )
}