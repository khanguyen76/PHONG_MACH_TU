
import React, { useState, useEffect, useMemo } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { useQuery } from "@apollo/client";
import { getPage } from "../../graphql-queries/BENH_NHAN";
import Breadcrumb from "../../components/breadcrumb";
import TextBox from "../../components/textbox";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function () {
  const classes = useStyles();
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
  const handleFilter = ({ key, value }) => {
    let filter = params.search || {}
    if (value) {
      filter[key] = value
    }
    else {
      delete filter[key]
    }
    setParams({ ...params, search: filter })
    refetch({ ...params, search: filter })
  }

  // if (loading) return <div className="loading">Loading...</div>;
  return <div className="data">
    <Breadcrumb
      titlePage="Cài đặt"
      crumbs={[
        {
          label: "Trang chủ",
          path: '/'
        },
        {
          label: "Cài đặt"
        }
      ]}
    />
    <div className="container">
      <Card className={classes.root}>
        <CardContent>
          <form className="form">
              <div className="group-control">
                <label className="control-label">Lượng bệnh nhân tối đa có thể tiếp nhận trong 1 ngày</label>
                <TextBox type="number" />
              </div>
              <div className="group-control">
                <label className="control-label">Tiền khám</label>
                <TextBox type="number" />
              </div>
          </form>
          <div style={{ textAlign: 'right'}}>
            <button className="btn btn--secondary mr-1">Huỷ bỏ</button>
            <button className="btn btn--primary">Lưu thay đổi</button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
}
