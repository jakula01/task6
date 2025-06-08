import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
export default function Head() {
  const navigate = useNavigate();
  const { username, logout } = useContext(UserContext);
  const handleLogout = () => {
    navigate("/");
    logout();
  };

  return (
    <Navbar bg="light" className="px-4 py-2 shadow-sm">
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        <Navbar.Brand className="fw-bold">
          <i className="bi bi-easel2 me-2"></i>Presentations
        </Navbar.Brand>
        <div className="d-flex align-items-center gap-3">
          <span className="text-muted">{username}</span>
          <Button variant="outline-primary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}
