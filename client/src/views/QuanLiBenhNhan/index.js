
import React, { useState, useEffect, useMemo } from "react";
import Grid from '@material-ui/core/Grid';
import { useQuery } from "@apollo/client";
import { getPage } from "../../graphql-queries/BENH_NHAN";
import Breadcrumb from "../../components/breadcrumb";
import Table from "../../components/table";
import CalendarIcon from '@material-ui/icons/CalendarToday';
import PatientAddModal from './patient-add'
import PatientEditModal from './patient-edit'

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

  const onAdded = () => {
    refetch({ ...params, params })
  }

  const onModalClosed = () => {
    setIsAddOpenModal(false)
    setIsEditOpen(false)
  }

  const handleEditClick = (id) => {
    console.log("handleEditClick id="+id)
    setIsEditOpen(true)
    setPatientId(id)
  }

  const [isAddOpen, setIsAddOpenModal] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [patientId, setPatientId] = useState()

  // if (loading) return <div className="loading">Loading...</div>;
  return <div className="data">
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
                <button>In</button>
                <button onClick={() => handleEditClick(row.id)}>Sửa</button>
                <button>Xoá</button>
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
