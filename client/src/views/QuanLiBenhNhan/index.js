
import React, { useState, useEffect, useMemo } from "react";
import Grid from '@material-ui/core/Grid';
import { useQuery } from "@apollo/client";
import { getPage } from "../../graphql-queries/BENH_NHAN";
import Breadcrumb from "../../components/breadcrumb";
import Table from "../../components/table";
import CalendarIcon from '@material-ui/icons/CalendarToday';

export default function () {
  const [params,setParams] = useState({
    page: 1,
    pageSize: 4
  })

  const { loading, error, data,refetch } = useQuery(getPage, {
    variables: params,  
    fetchPolicy:'network-only'
  });

  const handleChangePage = (pageNumber) => {
    setParams({...params,page:pageNumber})
  }
  const handleFilter = ({key,value}) => {
    console.log(key,value);
    let filter = params.search || {}
    if(value){
      filter[key] = value
    }
    else{
      delete filter[key]
    }
    console.log(filter);
    console.log({...params,search:filter});
    setParams({...params,search:filter})
    refetch({...params,search:filter})
  }

  // if (loading) return <div className="loading">Loading...</div>;
  return <div className="data">
    <Breadcrumb 
      titlePage="Bệnh nhân"
      crumbs={[
        {
          label:"Trang chủ",
          path:'/'
        },
        {
          label:"bệnh nhân"
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
            accessor:'ho_ten',
            isSearchable: 'ho_ten',
            props: {
              width: 300
            }
          },
          {
            label: "Giới tính",
            accessor:'gioi_tinh',
            textAlign: "center",
            props: {
              width: 150
            }
          },
          {
            label: "Năm sinh",
            accessor:'nam_sinh',
            textAlign: "center",
            props: {
              width: 150
            }
          },
          {
            label: "Địa chỉ",
            accessor:'dia_chi',
          },
          {
            label: "",
            textAlign: "right",
            accessor: () => (
              <div className="group-button">
                <button>In</button>
                <button>Sửa</button>
                <button>Xoá</button>
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
