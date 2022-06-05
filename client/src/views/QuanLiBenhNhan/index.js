
import React, { useState, useEffect, useMemo } from "react";
import Grid from '@material-ui/core/Grid';
import { useQuery, useMutation } from "@apollo/client";
import { getPage, deleteItemById } from "../../graphql-queries/BENH_NHAN"
import Breadcrumb from "../../components/breadcrumb";
import Table from "../../components/table";
import CalendarIcon from '@material-ui/icons/CalendarToday';
import PatientAddModal from './patient-add'
import PatientEditModal from './patient-edit'
import Notify from "../../components/notify"
import Swal from 'sweetalert2'
// Material UI
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

export default function () {
  const [notify, setNotify] = useState()
  const [params, setParams] = useState({
    page: 1,
    pageSize: 4
  })
  const { loading, error, data, refetch } = useQuery(getPage, {
    variables: params,
    fetchPolicy: 'network-only'
  });
  const [xoaBenhNhan] = useMutation(deleteItemById);

  const handleChangePage = (pageNumber) => {
    setParams({ ...params, page: pageNumber })
  }

  const onAdded = () => {
    refetch({ ...params, params })
  }

  const onModalClosed = () => {
    setIsAddOpenModal(false)
    setIsEditOpen(false)
  }

  const handleEditClick = (id) => {
    console.log("handleEditClick id=" + id)
    setIsEditOpen(true)
    setPatientId(id)
  }

  const [isAddOpen, setIsAddOpenModal] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [patientId, setPatientId] = useState()

  const handleFilter = ({ key, value }) => {
    let filter = params.search || {}
    if (value) {
      filter[key] = value
    }
    else {
      delete filter[key]
    }
    setParams({ ...params, search: filter })
    refetch({ ...params, search: filter })
  }
  const handleDeleteItem = (id, name) => {
    Swal.fire({
      text: `Bạn có chắc muốn xoá bệnh nhân ${name}?`,
      icon: 'question',
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: 'Xoá',
      cancelButtonText: 'Huỷ bỏ',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isDenied) {
        let res = await xoaBenhNhan({
          variables: { id }
        })
        if (res.data.XOA_BENH_NHAN.success) {
          refetch({ ...params, params })
          setNotify({
            type: "success",
            message: "Bệnh nhân đã được xoá thành công.",
            timeout: 3000
          })
        }
        else {
          setNotify({
            type: "error",
            message: "Đã có lỗi xảy ra. Xoá không thành công",
            timeout: 3000
          })
        }
      }
    })
  }
  // if (loading) return <div className="loading">Loading...</div>;
  return <div className="page-wrapper">
    {
      useMemo(() => (
        <Notify option={notify} />
      ), [notify])
    }
    <Breadcrumb
      titlePage="Bệnh nhân"
      crumbs={[
        {
          label: "Trang chủ",
          path: '/'
        },
        {
          label: "bệnh nhân"
        }
      ]}
    />
    <div className="container">
      <div style={{ textAlign: "right" }}>
        <button onClick={() => setIsAddOpenModal(true)} className="btn btn--primary mb-2">Thêm bệnh nhân</button>
      </div>
      <Table
        isLoading={loading}
        onFilter={handleFilter}
        isSort={true}
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
            isSearchable: true,
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
            isSearchable: true,
            props: {
              width: 150
            }
          },
          {
            label: "Địa chỉ",
            accessor: 'dia_chi',
            isSearchable: true,
          },
          {
            label: "",
            textAlign: "right",
            accessor: (row) => (
              <div className="group-button">
                <button onClick={() => handleEditClick(row._id)} className="btn btn__icon btn__outline btn__outline--warning mr-1"><EditIcon /></button>
                <button onClick={() => handleDeleteItem(row._id, row.ho_ten)} className="btn btn__icon btn__outline btn__outline--danger mr-2"><DeleteIcon /></button>
              </div>
            ),
            props: {
              width: 200
            }
          }
        ]}
        data={data?.DS_BENH_NHAN.doc}
        controlAddOn={() => (
          <div className="date-picker"
            style={{
              marginRight: 40,
              display: "flex",
              alignItems: "center",
              cursor: "pointer"
            }}
          >
            <CalendarIcon style={{ marginRight: 10, fontSize: 14 }} />
            <span style={{ fontWeight: 500 }}>Thứ ba, 13/10/2022</span>
          </div>
        )}
        pagination={{
          currentPage: params.page,
          totalPage: data?.DS_BENH_NHAN.pages,
          totalRecord: data?.DS_BENH_NHAN.total,
        }}
        onPageChange={handleChangePage}
      />

      <PatientAddModal
        onAdd={onAdded}
        open={isAddOpen}
        handleClose={onModalClosed} />

      <PatientEditModal
        onAdd={onAdded} open={isEditOpen} handleClose={onModalClosed} patientId={patientId} />
    </div>
  </div>
}
