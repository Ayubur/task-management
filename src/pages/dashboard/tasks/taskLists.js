import React, { useEffect, useState } from "react";
import { Container, Row, Button, Table } from "react-bootstrap";
import { getData, save } from "../../../services/storage";
import { LOCALSTORAGE_TASK_DATA_KEY } from "../../../config";
import { useDispatch } from "react-redux";
import { taskAdd } from "../../../redux/tasks/taskAction";
import Layout from "../../../layout/layout";

const TaskLists = () => {
    const [tasks, setTasks] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        let data = getData(LOCALSTORAGE_TASK_DATA_KEY);
        if (data && data != null) {
            data = JSON.parse(data);
            dispatch(taskAdd(data));
            setTasks(data);
        }
    }, []);

    const _remove = (id) => {
        let prevData = tasks;
        prevData = prevData?.filter((el) => el?.id != id);
        setTasks(prevData);
        dispatch(taskAdd(prevData));
        save(LOCALSTORAGE_TASK_DATA_KEY, prevData);
    };
    return (
        <Layout>
            <Container>
                <Row>
                    <div style={{ textAlign: "right" }}>
                        <a href="/tasks/create">
                            <Button variant="primary" className="mt-1">
                                Create New Task
                            </Button>
                        </a>
                    </div>
                </Row>
                {tasks?.length > 0 && (
                    <div className="mt-4">
                        <Row>
                            <Table
                                striped
                                bordered
                                hover
                                size="sm"
                                style={{ textAlign: "center" }}
                            >
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Assign To</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks?.map((el, i) => (
                                        <tr key={el?.id}>
                                            <td>
                                                <a href={`/tasks/edit/${el?.id}`} style={{textDecoration:'none', color:'black'}}>
                                                    {el?.title}
                                                </a>
                                            </td>
                                            <td>{el?.description}</td>
                                            <td>{el?.user?.name}</td>
                                            <td>
                                                <a href={`/tasks/edit/${el?.id}`}>
                                                    <Button variant="primary" size="sm">
                                                        edit
                                                    </Button>
                                                </a>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    style={{ marginLeft: 6 }}
                                                    onClick={() => _remove(el?.id)}
                                                >
                                                    delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Row>
                    </div>
                )}
            </Container>
        </Layout>
    );
};

export default TaskLists;
