import React from "react"
import Badge from "react-bootstrap/Badge"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
export default function KhamBenhComponent() {
    return (
        <>
            <Container>
                <Row> 
                    <Col >10:30 AM, Thứ </Col>
                    <Col  style ={{background:'lightblue'}}>avatar</Col>
                </Row>
                <Row> 
                    <Col >
                        <h1>Khám bệnh</h1>
                        <p> <b>Trang chủ &gt; </b> khám bệnh</p>
                    </Col>
                    <Col style ={{background:'lightblue'}}> avatarLập phiếu khám</Col>
                </Row> 
                <Row>
                    <h1>Table</h1>
                </Row>                                          
            </Container>
        </>
    );
}
