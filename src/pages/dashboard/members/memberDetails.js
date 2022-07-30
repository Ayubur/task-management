import React, { useState, useEffect } from "react";
import { Container, Row, Form, Card, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { LOCALSTORAGE_MEMBER_DATA_KEY, LOCALSTORAGE_TASK_DATA_KEY } from "../../../config";
import { save, getData } from "../../../services/storage";
import Layout from "../../../layout/layout";

const MemberDetails = () => {
    const [data, setData]  = useState([]);
    const {id} = useParams();
    useEffect(()=> {
        let tasks = getData(LOCALSTORAGE_TASK_DATA_KEY);
        if(tasks && tasks != null){
            tasks = JSON.parse(tasks);

            let filterData = tasks?.filter(el => el?.user?.id == id);
            setData(filterData);
        }
    },[]);
    return (
        <Layout>
            <Container>
                {
                    data?.length > 0 ? (
                        data.map(el => (
                            <Row key={el?.id}>
                                <Card>
                                    <Card.Title>{el?.title}</Card.Title>
                                    <Card.Body>
                                        {el?.description}
                                    </Card.Body>
                                </Card>
                            </Row>
                        ))
                    ): (
                        <b>No task assigned yet</b>
                    )
                }
            </Container>
        </Layout>
    );
};

export default MemberDetails;
