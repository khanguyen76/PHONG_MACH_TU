import React, { useState, useEffect, useMemo } from "react";
import Grid from '@material-ui/core/Grid';
import { useQuery } from "@apollo/client";
import { getPage } from "../../graphql-queries/THUOC";
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
  const handleFilter = ({key,value}) => {
    let filter = params.search || {}
    if(value){
      filter[key] = value
    }
    else{
      delete filter[key]
    }
    console.log(filter);
    setParams({...params,search:filter})
    refetch({...params,search:filter})
  }
  const handleDeleteItem = (name) => {
    Swal.fire({
      text: `Bạn có chắc muốn xoá thuốc ${name}?`,
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
      titlePage="Thuốc"
      crumbs={[
        {
          label: "Trang chủ",
          path: '/'
        },
        {
          label: "Thuốc"
        }
      ]}
    />
    <div className="container">
      <div style={{ textAlign: "right" }}>
        <button className="btn btn--primary mb-2" onClick={AddorChangeItem()} >Thêm thuốc </button>
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
            label: "Tên thuốc",
            isSearchable: 'ten_thuoc',
            props: {
              width: 300
            },
            accessor: 'ten_thuoc'
          },
          {
            label: "Đơn vị",
            textAlign: "center",
            props: {
              width: 150
            },
            accessor: row => row.don_vi.ten_don_vi
          },
          {
            label: "Đơn giá",
            textAlign: "center",
            props: {
              width: 150
            },
            accessor: row => row.don_gia
          },
          {
            label: "Cách dùng",
            accessor: row => row.cach_dung.mo_ta_cach_dung
          },
          {
            label: "",
            textAlign: "right",
            accessor: (row) => (
              <div className="group-button">
                <button className="btn btn__icon btn__outline btn__outline--warning mr-1"><EditIcon /></button>
                <button onClick={()=>handleDeleteItem(row.ten_thuoc)} className="btn btn__icon btn__outline btn__outline--danger mr-2"><DeleteIcon /></button>
              </div>
            ),
            props: {
              width: 200
            }
          }
        ]}
        data={data?.DS_THUOC.doc}
        pagination={{
          currentPage: params.page,
          totalPage: data?.DS_THUOC.pages,
          totalRecord: data?.DS_THUOC.total,
        }}
        onPageChange={handleChangePage}
      />
    </div>
  </div>
}
