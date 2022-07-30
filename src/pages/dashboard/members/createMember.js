import React, { useState } from "react";
import { Container, Row, Form, Card, Col, Button } from "react-bootstrap";
import { LOCALSTORAGE_MEMBER_DATA_KEY } from "../../../config";
import { save, getData } from "../../../services/storage";
import Layout from "../../../layout/layout";

const CreateMember = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        tasks: []
    });

    const _save = (e) => {
        e.preventDefault();
        if (data["name"] == "") {
            return;
        }
        let prevData = getData(LOCALSTORAGE_MEMBER_DATA_KEY);
        if (prevData && prevData != null) {
            prevData = JSON.parse(prevData);
        } else {
            prevData = [];
        }
        data["id"] =
            prevData?.length == 0 ? 1 : prevData[prevData?.length - 1]?.id + 1;
        prevData?.push(data);
        save(LOCALSTORAGE_MEMBER_DATA_KEY, prevData);
        window.location.href = "/member";
    };
    return (
        <Layout>
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Card>
                            <Card.Title>
                                <h3 style={{ marginLeft: 20, marginTop: 10 }}>Add Member</h3>
                            </Card.Title>
                            <Card.Body>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter name"
                                            onChange={(e) =>
                                                setData((prev) => ({
                                                    ...prev,
                                                    name: e.target.value
                                                }))
                                            }
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mt-2">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter email"
                                            onChange={(e) =>
                                                setData((prev) => ({
                                                    ...prev,
                                                    email: e.target.value
                                                }))
                                            }
                                        />
                                    </Form.Group>
                                    <div style={{ textAlign: "right" }}>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="mt-3"
                                            onClick={(e) => _save(e)}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default CreateMember;
