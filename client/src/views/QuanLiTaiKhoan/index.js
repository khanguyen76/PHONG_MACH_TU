
import React, { useState, useEffect, useMemo } from "react";
import Grid from '@material-ui/core/Grid';
import { useQuery } from "@apollo/client";
import { getPage } from "../../graphql-queries/TAI_KHOAN";
import Breadcrumb from "../../components/breadcrumb";
import Table from "../../components/table";

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
            accessor: () => (
              <div className="group-button">
                <button>Sửa</button>
                <button>Xoá</button>
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
