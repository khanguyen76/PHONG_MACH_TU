import React from "react"
import Badge from "react-bootstrap/Badge"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
// {console.clear()} 
export default function CommonComponent(props) {
    const MyComponent = props.data 
    if(MyComponent.name === 'KhamBenhComponent') {
        return (
            <>
            <div className="content container-box">
            <h1> Hello reactJS 2022! <Badge bg="danger">New</Badge></h1>
                <Container fluid>
                    <Row className="row-top">
                        <Col className="left-side-menu " style ={{background:'pink'}}>1 of 2
                            <div className="container-menu">
                                <div className="item">icon</div>
                                <div className="item">icon</div>
                                <div className="item">icon</div>
                                <div className="item">icon</div>
                                <div className="item">icon</div>
                                <div className="item">icon</div>
                                <div className="item">icon</div>
                                <div className="item">icon</div>
                            </div>
                        </Col>
                        <Col className="right-side-menu"> 2 of 2
                            <MyComponent></MyComponent>
                        </Col>
                    </Row>
                </Container>            
            </div>
            {console.log(props)}   
            {console.log("hello")}
            </>    
        );
    }
    else alert("không có component nào có tên là " + MyComponent.name)
}
