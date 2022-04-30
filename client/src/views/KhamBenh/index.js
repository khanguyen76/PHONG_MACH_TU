import React from "react";
import { colors, Divider } from "@material-ui/core"
import { purple } from "@material-ui/core/colors"
import Container from 'react-bootstrap/Container'
import Common from "../Components/Common";
import KhamBenhComponent from "./KhamBenh";
//   import PatrientDetail from './components/PatrientDetail';

// import Button from 'react-bootstrap/Button';
// import { Button } from 'react-bootstrap';
const KhamBenh = () =>
{
    return (
        <>
            {/* <Common {...<KhamBenhComponent/>} ></Common> */}
            {/* <Common title ="aaaa"  ></Common> */}
            <Common data={KhamBenhComponent} ></Common>
        </>
    );
}
export default KhamBenh;
