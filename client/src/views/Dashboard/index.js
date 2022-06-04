
import React, { useState, useEffect, useMemo } from "react";
import Grid from '@material-ui/core/Grid';
import { useQuery } from "@apollo/client";
import { getAll } from "../../graphql-queries/BENH_NHAN";
import Breadcrumb from "../../components/breadcrumb";
import Table from "../../components/table";
import PatrientDetail from './components/PatrientDetail';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import Tab from "../../components/tabs"
import Modal from "../../components/modal"
import TabContent from "../../components/tab-content";
import Radio from "../../components/radio-button";

function App() {
  const [patrientSelected, SetPatrientSelected] = useState()
  //const [showPKModal, setShowModal] = useState(false)
  const [isShowModal, setIsShowModal] = useState(false)
  const { loading, error, data } = useQuery(getAll);

  const radioChange = (value) => {
    console.log("radioChange value=" + value)
  }

  // if (loading) return <div className="loading">Loading...</div>;
  //const modalPkOnClick = () => setShowModal(false);
  return <div className="data">
    <Breadcrumb />

    <div className="container">
      <div style={{ textAlign: "right" }}>
        <button onClick={() => { setIsShowModal(true) }} className="btn btn--primary mb-2">Lập phiếu khám</button>
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
        pagination={true}
      />

      <Modal
        open={isShowModal}
        handleClose={() => setIsShowModal(false)}
      >
        <Modal.header
          handleClose={() => setIsShowModal(false)}>
        </Modal.header>
        <Modal.body>
          <Tab tabData={[{ text: "Thông tin bệnh nhân", key: 0 }, { text: "Lịch sử khám", key: 1 }]}>
            <TabContent>
              <h3>Section 1</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec urna aliquam, ornare eros vel, malesuada lorem. Nullam faucibus lorem at eros consectetur lobortis. Maecenas nec nibh congue, placerat sem id, rutrum velit. Phasellus porta enim at facilisis condimentum. Maecenas pharetra dolor vel elit tempor pellentesque sed sed eros. Aenean vitae mauris tincidunt, imperdiet orci semper, rhoncus ligula. Vivamus scelerisque.</p>
            </TabContent>
            <TabContent>
              <h3>Section 2</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec urna aliquam, ornare eros vel, malesuada lorem. Nullam faucibus lorem at eros consectetur lobortis. Maecenas nec nibh congue, placerat sem id, rutrum velit. Phasellus porta enim at facilisis condimentum. Maecenas pharetra dolor vel elit tempor pellentesque sed sed eros. Aenean vitae mauris tincidunt, imperdiet orci semper, rhoncus ligula. Vivamus scelerisque.</p>
            </TabContent>
          </Tab>
        </Modal.body>
        <Modal.footer>
          <button class="btn btn-default" onClick={() => setIsShowModal(false)}>Hủy bỏ</button>
          <button className="btn btn--primary mb-2">Lưu thay đổi</button>
        </Modal.footer>
      </Modal>

    </div>
  </div>
}

export default App;