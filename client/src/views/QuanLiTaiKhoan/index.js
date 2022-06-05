
import React, { useState, useEffect, useMemo } from "react";
import Grid from '@material-ui/core/Grid';
import { useQuery, useMutation } from "@apollo/client";
import { getPage, deleteItemById } from "../../graphql-queries/TAI_KHOAN";
// Material UI
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// Components
import Breadcrumb from "../../components/breadcrumb";
import Table from "../../components/table";
import Notify from "../../components/notify"
// Vendors
import moment from 'moment';
import Swal from 'sweetalert2';
export default function () {
  console.log("re-render");
  const [xoaTaiKhoan] = useMutation(deleteItemById);
  const [notify, setNotify] = useState()
  const [params, setParams] = useState({
    page: 1,
    pageSize: 4
  })
  const { loading, error, data, refetch } = useQuery(getPage, {
    variables: params,
    fetchPolicy: 'network-only'
  });

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

  const handleChangePage = (pageNumber) => {
    setParams({ ...params, page: pageNumber })
  }
  const handleDeleteItem = (id, email) => {
    Swal.fire({
      text: `Bạn có chắc muốn xoá tài khoản ${email}?`,
      icon: 'question',
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: 'Xoá',
      cancelButtonText: 'Huỷ bỏ',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isDenied) {
        let res = await xoaTaiKhoan({
          variables: { id }
        })
        if (res.data.XOA_TAI_KHOAN.success) {
          refetch({ ...params, params })
          setNotify({
            type: "success",
            message: "Phiếu khám bệnh đã được xoá thành công.",
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
  return <div className="data">
    {
      useMemo(() => (
        <Notify option={notify} />
      ), [notify])
    }
    <Breadcrumb
      titlePage="Tài khoản"
      crumbs={[
        {
          label: "Trang chủ",
          path: '/'
        },
        {
          label: "Tài khoản"
        }
      ]}
    />
    <div className="container">
      <div style={{ textAlign: "right" }}>
        <button className="btn btn--primary mb-2">Tạo tài khoản</button>
      </div>
      <Table
        onFilter={handleFilter}
        isLoading={loading}
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
            isSearchable: true,
            props: {
              width: 300
            },
            accessor: row => row.ho_ten
          },
          {
            label: "Giới tính",
            textAlign: "center",
            props: {
              width: 150
            },
            accessor: row => row.gioi_tinh
          },
          {
            label: "Chức vụ",
            textAlign: "center",
            props: {
              width: 150
            },
            accessor: row => {
              switch (row.quyen) {
                case 'bacsi':
                  return 'Bác sĩ'
                case 'letan':
                  return 'Lễ Tân'
              }
            }
          },
          {
            label: "Email",
            accessor: row => row.email
          },
          {
            label: "",
            textAlign: "right",
            accessor: (row) => (
              <div className="group-button">
                <button className="btn btn__icon btn__outline btn__outline--warning mr-1"><EditIcon /></button>
                <button onClick={() => handleDeleteItem(row._id, row.email)} className="btn btn__icon btn__outline btn__outline--danger mr-2"><DeleteIcon /></button>
              </div>
            ),
            props: {
              width: 200
            }
          }
        ]}
        data={data?.DS_TAI_KHOAN.doc}
        pagination={{
          currentPage: params.page,
          totalPage: data?.DS_TAI_KHOAN.pages,
          totalRecord: data?.DS_TAI_KHOAN.total,
        }}
        onPageChange={handleChangePage}
      />
    </div>
  </div>
}
