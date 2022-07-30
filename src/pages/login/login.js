import React, { useState } from "react";
import { Container, Row, Form, Card, Col, Button } from "react-bootstrap";
import { LOCALSTORAGE_USER_DATA_KEY } from "../../config";
import { save } from "../../services/storage";
const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const _login = (e) => {
    e.preventDefault();
    save(LOCALSTORAGE_USER_DATA_KEY, loginData);
    window.location.href = "/";
  };
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card style={{ marginTop: 100 }}>
            <Card.Title>
              <h3 style={{ marginLeft: 20, marginTop: 10 }}>Login</h3>
            </Card.Title>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="Enter username"
                    onChange={(e) =>
                      setLoginData((prev) => ({
                        ...prev,
                        username: e.target.value
                      }))
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) =>
                      setLoginData((prev) => ({
                        ...prev,
                        password: e.target.value
                      }))
                    }
                    required
                    minLength="5"
                  />
                </Form.Group>
                <div style={{ textAlign: "right" }}>
                  <Button
                    type="submit"
                    variant="primary"
                    className="mt-3"
                    onClick={(e) => _login(e)}
                  >
                    Login
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
