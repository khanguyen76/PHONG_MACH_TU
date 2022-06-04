
import React, { useState, useEffect, useMemo } from "react";
// API
import { useQuery } from "@apollo/client";
import { getPage } from "../../graphql-queries/PHIEU_KHAM";
// Material UI
import CalendarIcon from '@material-ui/icons/CalendarToday';
import PrintIcon from '@material-ui/icons/Print';
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
  const [params, setParams] = useState({
    page: 1,
    pageSize: 4
  })
  const { loading, error, data, refetch } = useQuery(getPage, {
    variables: params,
    fetchPolicy: 'network-only'
  });

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

  const handleDeleteItem = (date,name) => {
    Swal.fire({
      text: `Bạn có chắc muốn xoá phiếu khám bệnh ngày ${moment(date).format("DD/MM/YYYY")} của bệnh nhân ${name}?`,
      icon: 'question',
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: 'Xoá',
      cancelButtonText: 'Huỷ bỏ',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isDenied) {
        
      }
    })
  }

  // if (loading) return <div className="loading">Loading...</div>;
  return <div className="data">
    <Breadcrumb
      titlePage="Khám bệnh"
      crumbs={[
        {
          label: "Trang chủ",
          path: '/'
        },
        {
          label: "khám bệnh"
        }
      ]}
    />
    <div className="container">
      <div style={{ textAlign: "right" }}>
        <button className="btn btn--primary mb-2">Lập phiếu khám</button>
      </div>
      <Table
        isLoading={loading}
        isSort={true}
        onFilter={handleFilter}
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
            accessor: row => row.benh_nhan.ho_ten
          },
          {
            label: "Giới tính",
            textAlign: "center",
            props: {
              width: 150
            },
            accessor: row => row.benh_nhan.gioi_tinh
          },
          {
            label: "Năm sinh",
            textAlign: "center",
            isSearchable: true,
            props: {
              width: 150
            },
            accessor: row => row.benh_nhan.nam_sinh
          },
          {
            label: "Địa chỉ",
            isSearchable: true,
            accessor: row => row.benh_nhan.dia_chi
          },
          {
            label: "Ngày khám",
            textAlign: "center",
            isSearchable: true,
            props: {
              width: 150
            },
            accessor: row => moment(row.ngay_kham).format("DD/MM/YYYY")
          },
          {
            label: "",
            textAlign: "right",
            accessor: row => (
              <div className="group-button no-wrap">
                <button className="btn btn__icon btn__outline btn__outline--primary mr-1"><PrintIcon /></button>
                <button className="btn btn__icon btn__outline btn__outline--warning mr-1"><EditIcon /></button>
                <button onClick={()=>handleDeleteItem(row.ngay_kham,row.benh_nhan.ho_ten)} className="btn btn__icon btn__outline btn__outline--danger mr-2"><DeleteIcon /></button>
              </div>
            ),
            props: {
              width: 150
            }
          }
        ]}
        data={data?.DS_PHIEU_KHAM.doc}
        // controlAddOn={() => (
        //   <div className="date-picker"
        //     style={{
        //       marginRight: 40,
        //       display: "flex",
        //       alignItems: "center",
        //       cursor: "pointer"
        //     }}
        //   >
        //     <CalendarIcon style={{ marginRight: 10, fontSize: 14 }} />
        //     <span style={{ fontWeight: 500 }}>{moment(new Date()).format("dddd, DD/MM/YYYY")}</span>
        //   </div>
        // )}
        pagination={{
          currentPage: params.page,
          totalPage: data?.DS_PHIEU_KHAM.pages,
          totalRecord: data?.DS_PHIEU_KHAM.total,
        }}
        onPageChange={handleChangePage}
      />
    </div>
  </div>
}
