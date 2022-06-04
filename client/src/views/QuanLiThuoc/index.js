
import React, { useState, useEffect, useMemo } from "react";
import Grid from '@material-ui/core/Grid';
import { useQuery } from "@apollo/client";
import { getPage } from "../../graphql-queries/PHIEU_KHAM";
import Breadcrumb from "../../components/breadcrumb";
import Table from "../../components/table";
import CalendarIcon from '@material-ui/icons/CalendarToday';

export default function () {
  console.log("re-render");
  const [params,setParams] = useState({
    page: 1,
    pageSize: 4
  })
  const { loading, error, data } = useQuery(getPage, {
    variables: params,  
    fetchPolicy:'network-only'
  });

  const handleChangePage = (pageNumber) => {
    setParams({...params,page:pageNumber})
  }

  // if (loading) return <div className="loading">Loading...</div>;
  return <div className="data">
    <Breadcrumb />
    <div className="container">
      <div style={{ textAlign: "right" }}>
        <button className="btn btn--primary mb-2">Lập phiếu khám</button>
      </div>
      <Table
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
        data={data?.DS_PHIEU_KHAM.doc}
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
          totalPage: data?.DS_PHIEU_KHAM.pages,
          totalRecord: data?.DS_PHIEU_KHAM.total,
        }}
        onPageChange={handleChangePage}
      />
    </div>
  </div>
}
