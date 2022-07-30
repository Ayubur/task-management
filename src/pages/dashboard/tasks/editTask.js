import React, { useEffect, useState } from "react";
import { Container, Row, Form, Card, Col, Button } from "react-bootstrap";
import {
  LOCALSTORAGE_TASK_DATA_KEY,
  LOCALSTORAGE_MEMBER_DATA_KEY
} from "../../../config";
import { useDispatch } from "react-redux";
import { memberAdd } from "../../../redux/member/memberAction";
import { taskAdd } from "../../../redux/tasks/taskAction";
import { save, getData } from "../../../services/storage";
import { useParams } from "react-router-dom";

import Layout from "../../../layout/layout";

const EditTask = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    user: null
  });

  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    let tasks = getData(LOCALSTORAGE_TASK_DATA_KEY);
    tasks = JSON.parse(tasks);
    if (tasks && tasks != null) {
      tasks = tasks?.filter((el) => el?.id == id);
      if (tasks?.length > 0) {
        setData((prev) => ({
          ...prev,
          title: tasks[0]?.title,
          description: tasks[0]?.description,
          user: tasks[0]?.user
        }));
      }
    }

    let data = getData(LOCALSTORAGE_MEMBER_DATA_KEY);
    if (data && data != null) {
      data = JSON.parse(data);
      dispatch(memberAdd(data));
      setUser(data);
    }
  }, []);

  const _save = (e) => {
    e.preventDefault();
    if (data["title"] == "") {
      return;
    }
    let prevData = getData(LOCALSTORAGE_TASK_DATA_KEY);
    if (prevData && prevData != null) {
      prevData = JSON.parse(prevData);
      prevData?.map((el) => {
        if (el?.id == id) {
          el["title"] = data?.title;
          el["description"] = data?.description;
          el["user"] = data?.user;
        }
      });
    } else {
      prevData = [];
      data["id"] =
        prevData?.length == 0 ? 1 : prevData[prevData?.length - 1]?.id + 1;

      prevData?.push(data);
    }
    dispatch(taskAdd(prevData));
    save(LOCALSTORAGE_TASK_DATA_KEY, prevData);

    // update user tasks
    // let new_user = user;
    // console.log(new_user);
    // new_user?.map((el) => {
    //   if (el?.id == data?.user?.id) {
    //     el["tasks"] = [...[data]];
    //   }
    // });
    // save(LOCALSTORAGE_MEMBER_DATA_KEY, new_user);

    window.location.href = "/tasks";
  };
  return (
    <Layout>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Card>
              <Card.Title>
                <h3 style={{ marginLeft: 20, marginTop: 10 }}>Edit Task</h3>
              </Card.Title>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Enter title"
                      value={data?.title}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          title: e.target.value
                        }))
                      }
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label>Description</Form.Label>
                    <textarea
                      className="form-control"
                      placeholder="Enter description"
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          description: e.target.value
                        }))
                      }
                    >
                      {data?.description}
                    </textarea>
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label>Assign To</Form.Label>
                    <Form.Select
                      value={data?.user?.id}
                      onChange={(e) => {
                        let id = e.target.value;
                        let new_user = user?.filter((el) => el?.id == id);
                        if (new_user?.length > 0) {
                          setData((prev) => ({ ...prev, user: new_user[0] }));
                        }
                      }}
                    >
                      <option></option>
                      {user?.map((el, i) => (
                        <option key={i} value={el?.id}>
                          {el?.name}
                        </option>
                      ))}
                    </Form.Select>
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

export default EditTask;
