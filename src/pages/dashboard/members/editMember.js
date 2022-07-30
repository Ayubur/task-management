import React, { useState, useEffect } from "react";
import { Container, Row, Form, Card, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { LOCALSTORAGE_MEMBER_DATA_KEY } from "../../../config";
import { save, getData } from "../../../services/storage";
import Layout from "../../../layout/layout";

const EditMember = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    tasks: []
  });
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    let data = getData(LOCALSTORAGE_MEMBER_DATA_KEY);
    data = JSON.parse(data);
    if (data && data != null) {
      data = data?.filter((el) => el?.id == id);
      if (data?.length > 0) {
        setData((prev) => ({
          ...prev,
          name: data[0]?.name,
          email: data[0]?.email,
          tasks: data[0]?.tasks
        }));
      }
    }
  }, []);

  const _save = (e) => {
    e.preventDefault();
    if (data["name"] == "") {
      return;
    }
    let prevData = getData(LOCALSTORAGE_MEMBER_DATA_KEY);
    if (prevData && prevData != null) {
      prevData = JSON.parse(prevData);
      prevData?.map((el) => {
        if (el?.id == id) {
          el["name"] = data?.name;
          el["email"] = data?.email;
        }
      });
    } else {
      prevData = [];
      data["id"] =
        prevData?.length == 0 ? 1 : prevData[prevData?.length - 1]?.id + 1;

      prevData?.push(data);
    }

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
                <h3 style={{ marginLeft: 20, marginTop: 10 }}>Edit Member</h3>
              </Card.Title>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Enter name"
                      value={data?.name}
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
                      value={data?.email}
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
                      Update
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

export default EditMember;
