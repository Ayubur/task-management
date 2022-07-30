import React from "react";
import Layout from "../../layout/layout";
import { Button } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Layout>
      <div style={{ textAlign: "center" }}>
        <a href="/tasks">
          <Button variant="primary" className="mt-3">
            Tasks
          </Button>
        </a>
        <a href="/member">
          <Button variant="primary" className="mt-3" style={{ marginLeft: 10 }}>
            Members
          </Button>
        </a>
      </div>
    </Layout>
  );
};

export default Dashboard;
