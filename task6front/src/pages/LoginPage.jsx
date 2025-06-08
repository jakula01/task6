import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { faker } from "@faker-js/faker";
import { Button, InputGroup, FormControl, Form } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext.jsx";

export default function LoginPage() {
  const [localUsername, setLocalUsername] = useState("");
  const navigate = useNavigate();
  const { setUsername } = useContext(UserContext);
  const generateUsername = () => {
    const newName = faker.helpers.arrayElement(usernameTemplates)();
    setLocalUsername(newName.length > 40 ? newName.slice(0, 40) : newName);
  };
  useEffect(() => {
    if (!localUsername) {
      generateUsername();
    }
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    if (!localUsername.trim()) return;
    setUsername(localUsername);
    navigate("/presentations");
  };
  const backGrnImgUrl =
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1920&q=80";

  const usernameTemplates = [
    () =>
      `${capitalizeFirstLetter(faker.word.adjective())} ${faker.word.noun()}`,
    () => `${faker.person.fullName()}`,
  ];

  const isValid = localUsername.trim() !== "" && localUsername.length <= 40;

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundImage: `url('${backGrnImgUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <div
        className="text-white fw-bold fs-2 mb-4"
        style={{
          textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
        }}
      >
        <i className="bi bi-easel2 me-2"></i>Presentations
      </div>

      <Form onSubmit={handleLogin}>
        <div
          className="bg-white bg-opacity-75 p-4 rounded shadow"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <InputGroup className="mb-3">
            <FormControl
              type="text"
              value={localUsername}
              onChange={(e) => {
                if (e.target.value.length <= 40) {
                  setLocalUsername(e.target.value);
                }
              }}
              placeholder="Username"
            />
            <Button
              variant="light"
              onClick={generateUsername}
              title="Generate username"
              className="border-start-0 rounded-start-0"
              style={{
                border: "1px solid #ced4da",
                backgroundColor: "#fff",
              }}
            >
              <i className="bi bi-shuffle"></i>
            </Button>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </InputGroup>
          {!isValid && (
            <div className="text-danger small">Username must be not empty</div>
          )}
        </div>
      </Form>
    </div>
  );
}

function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
