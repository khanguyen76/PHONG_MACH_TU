import React, { useState, useEffect, useMemo } from "react";
import Grid from '@material-ui/core/Grid';
import { useQuery } from "@apollo/client";
import { getAll } from "../../graphql-queries/BENH_NHAN";
import Breadcrumb from "../../components/breadcrumb";
import Table from "../../components/table";
import PatrientDetail from './components/PatrientDetail';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PrintIcon from '@material-ui/icons/Print';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

function App() {
  const [patrientSelected, SetPatrientSelected] = useState()
  const { loading, error, data } = useQuery(getAll);

  // if (loading) return <div className="loading">Loading...</div>;
  return <div className="data">
    <Breadcrumb />
    <div className="container">
    
      <div style={{textAlign:"right"}}>
       <button className="btn btn--primary mb-2 btn--hover">Lập phiếu khám</button>
      </div>
      <Table
        isSort={true}
        columns={[
          {
            label: "STT",
            accessor: (row, key) => key + 1,
            textAlign: "center",
            props: {
              width: 80
            }
          },
          {
            label: "Họ tên",
            accessor: "ho_ten",
            isSearchable: true,
            props: {
              width: 300
            }
          },
          {
            label: "Giới tính",
            accessor: "gioi_tinh",
            textAlign: "center",
            props: {
              width: 150
            }
          },
          {
            label: "Năm sinh",
            accessor: "nam_sinh",
            textAlign: "center",
            isSearchable: true,
            props: {
              width: 150
            }
          },
          {
            label: "Địa chỉ",
            accessor: "dia_chi",
            isSearchable: true
          },
          {
            label: "",
            textAlign: "right",
            accessor: () => (
              <div className="group-button">
                <button ><PrintIcon  style={{color:"#5AB88A", background:"white"}}/></button>
                <button> <CreateIcon  style={{color:"#B99D0C", background:"white"}}/> </button>
                <button> <DeleteIcon  style={{color:"#BF2A2A", background:"white"}}/> </button>
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
            <ExpandMoreIcon className="user-box__arrow" fontSize="small"/>

          </div>
        )}
        pagination={true}
      />
    </div>
  </div>
}

export default App;