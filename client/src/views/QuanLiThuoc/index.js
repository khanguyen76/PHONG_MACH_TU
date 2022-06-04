
import React, { useState, useEffect, useMemo } from "react";
import Grid from '@material-ui/core/Grid';
import { useQuery } from "@apollo/client";
import { getPage } from "../../graphql-queries/THUOC";
import Breadcrumb from "../../components/breadcrumb";
import Table from "../../components/table";
import CalendarIcon from '@material-ui/icons/CalendarToday';

export default function () {
  console.log("re-render");
  const [params, setParams] = useState({
    page: 1,
    pageSize: 4
  })
  const { loading, error, data } = useQuery(getPage, {
    variables: params,
    fetchPolicy: 'network-only'
  });

  const handleChangePage = (pageNumber) => {
    setParams({ ...params, page: pageNumber })
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
        <button className="btn btn--primary mb-2">Thêm thuốc</button>
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
            label: "Tên thuốc",
            isSearchable: true,
            props: {
              width: 300
            },
            accessor: row => row.ten_thuoc
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
