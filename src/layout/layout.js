import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LOCALSTORAGE_USER_DATA_KEY } from "../config";
import { getData, deleteData } from "../services/storage";
const Layout = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    let data = getData(LOCALSTORAGE_USER_DATA_KEY);
    if (data) {
      data = JSON.parse(data);
      setUser(data);
    }
  }, []);

  const _logout = () => {
    deleteData("user");
    window.location.href = "/login";
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <img src="/images/image.png" alt="brand image" height="25" />
            <span style={{ marginLeft: 10 }}>Task Management</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="/">Dashboard</Nav.Link>
              <Nav.Link href="/tasks">Tasks</Nav.Link>
              <Nav.Link href="/member">Members</Nav.Link>
              <NavDropdown title={user?.username} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.2" onClick={(e) => _logout()}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{ height: "83vh" }} className="mt-4">
        {children}
      </Container>
      <div style={{ bottom: 0, textAlign: "center" }}>
        Task Management @ 2022
      </div>
    </div>
  );
};

export default Layout;
