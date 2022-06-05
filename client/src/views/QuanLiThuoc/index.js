import React, { useState, useEffect, useMemo } from "react";
import Grid from '@material-ui/core/Grid';
import { useQuery,useLazyQuery, useMutation } from "@apollo/client";
import { getPage, deleteItemById, getItemById } from "../../graphql-queries/THUOC";
// Material UI
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// Components
import Breadcrumb from "../../components/breadcrumb";
import Table from "../../components/table";
import Notify from "../../components/notify"
import ThemThuoc from "./ThemThuoc";
import CapNhatThuoc from "./CapNhatThuoc";
// Vendors
import moment from 'moment';
import Swal from 'sweetalert2';
export default function () {
  console.log("re-render");
  const [xoaThuoc] = useMutation(deleteItemById);
  const [getDataItem] = useLazyQuery(getItemById);
  const [notify, setNotify] = useState()
  const [params, setParams] = useState({
    page: 1,
    pageSize: 4
  })
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [dataItem, setDataItem] = useState()
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
  const handleEditItem = async (id) => {
    if(id){
      let res = await getDataItem({
        variables: {id}
      })
      setDataItem(res.data.THUOC)
      setOpenModalEdit(true)
    }
  }
  const handleDeleteItem = (id, name) => {
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
        let res = await xoaThuoc({
          variables: { id }
        })
        if (res.data.XOA_THUOC.success) {
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
    <ThemThuoc 
      openModal={openModalAdd}
      onClose={()=>setOpenModalAdd(false)}
      onSubmited={()=>{
        setOpenModalAdd(false)
        refetch(params)
      }}
    />
    <CapNhatThuoc 
      data={dataItem}
      openModal={openModalEdit}
      onClose={()=>setOpenModalEdit(false)}
      onSubmited={()=>{
        setOpenModalEdit(false)
        refetch(params)
      }}
    />
    <div className="container">
      <div style={{ textAlign: "right" }}>
        <button className="btn btn--primary mb-2" onClick={()=>setOpenModalAdd(true)}>Thêm thuốc </button>
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
                <button className="btn btn__icon btn__outline btn__outline--warning mr-1" onClick={()=>handleEditItem(row._id)}><EditIcon /></button>
                <button onClick={()=>handleDeleteItem(row._id, row.ten_thuoc)} className="btn btn__icon btn__outline btn__outline--danger mr-2"><DeleteIcon /></button>
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
