import React, { useEffect, useState } from "react";
import { Container, Row, Button, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { memberAdd } from "../../../redux/member/memberAction";
import { taskAdd } from "../../../redux/tasks/taskAction";
import { getData, save } from "../../../services/storage";
import {
    LOCALSTORAGE_MEMBER_DATA_KEY,
    LOCALSTORAGE_TASK_DATA_KEY
} from "../../../config";
import Layout from "../../../layout/layout";

const MemberLists = () => {
    const [members, setMembers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        let data = getData(LOCALSTORAGE_MEMBER_DATA_KEY);
        if (data && data != null) {
            data = JSON.parse(data);
            dispatch(memberAdd(data));
            setMembers(data);
        }

        let tasks = getData(LOCALSTORAGE_TASK_DATA_KEY);
        if (tasks && tasks != null) {
            tasks = JSON.parse(tasks);
            dispatch(taskAdd(tasks));
            setTasks(tasks);
        }
    }, []);

    const _remove = (id) => {
        let prevData = members;
        prevData = prevData?.filter((el) => el?.id != id);
        setMembers(prevData);
        save(LOCALSTORAGE_MEMBER_DATA_KEY, prevData);
    };

    const _getCount = (id) => {
        return tasks?.filter((el) => el?.user?.id == id)?.length;
    };
    return (
        <Layout>
            <Container>
                <Row>
                    <div style={{ textAlign: "right" }}>
                        <a href="/member/create">
                            <Button variant="primary" className="mt-1">
                                Create New Member
                            </Button>
                        </a>
                    </div>
                </Row>
                {members?.length > 0 && (
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
                                        <th>Name</th>
                                        <th>No. of task assigned</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {members?.map((el, i) => (
                                        <tr key={el?.id}>
                                            <td>
                                                <a href={`/member/${el?.id}`} style={{textDecoration:'none'}}>
                                                    {el?.name}
                                                </a>
                                            </td>
                                            <td>{_getCount(el?.id)}</td>
                                            <td>
                                                <a href={`/member/edit/${el?.id}`}>
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

export default MemberLists;
