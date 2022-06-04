import React, { useState, useEffect, useMemo } from "react"
import Grid from '@material-ui/core/Grid'
import { useQuery, useMutation } from "@apollo/client"
import { getPage, deleteItemById } from "../../graphql-queries/BENH_NHAN"
// Material UI
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
// Components
import Breadcrumb from "../../components/breadcrumb"
import Table from "../../components/table"
import Notify from "../../components/notify"
// Vendors
import moment from 'moment'
import Swal from 'sweetalert2'
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

  const [xoaPhieuKham] = useMutation(deleteItemById);

  const handleChangePage = (pageNumber) => {
    setParams({ ...params, page: pageNumber })
  }
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
        let res = await xoaPhieuKham({
          variables: { id }
        })
        if (res.data.XOA_BENH_NHAN.success) {
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
          label: "Bệnh nhân"
        }
      ]}
    />
    <div className="container">
      <div style={{ textAlign: "right" }}>
        <button className="btn btn--primary mb-2">Thêm bệnh nhân</button>
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
              <div className="group-button">
<<<<<<< HEAD
                <button className="btn btn__icon btn__outline btn__outline--warning mr-1"><EditIcon /></button>
                <button onClick={() => handleDeleteItem(row._id, row.ho_ten)} className="btn btn__icon btn__outline btn__outline--danger mr-2"><DeleteIcon /></button>
=======
                <button ><PrintIcon  style={{color:"#5AB88A", background:"white"}}/></button>
                <button> <CreateIcon  style={{color:"#B99D0C", background:"white"}}/> </button>
                <button> <DeleteIcon  style={{color:"#BF2A2A", background:"white"}}/> </button>
>>>>>>> 2c5ee0c91118562d8f606421cb9d1a27b818041e
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
      />
    </div>
  </div>
}
