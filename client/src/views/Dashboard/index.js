
import React, { useState, useEffect, useMemo } from "react";
import Grid from '@material-ui/core/Grid';
import { useQuery } from "@apollo/client";
import { getAll } from "../../graphql-queries/BENH_NHAN";
import PatrientDetail from './components/PatrientDetail';

function App() {
  const [patrientSelected, SetPatrientSelected] = useState()
  const { loading, error, data } = useQuery(getAll);

  if (loading) return <div className="loading">Loading...</div>;
  return <div className="data">
    <Grid container>
      <Grid md={6} item>
        <h2>Danh sach benh nhan</h2>
        <ul className="box">
          {
            data?.DS_BENH_NHAN.map(item => (
              <li key={item._id} onClick={() => SetPatrientSelected(item._id)}>{item.ho_ten}</li>
            ))
          }
        </ul>
      </Grid>
      <Grid md={6} item>
        <h2>Thong tin benh nhan</h2>
        <div className="box">
          <PatrientDetail patrientId={patrientSelected} />
        </div>
      </Grid>
    </Grid>
  </div>
}

export default App;