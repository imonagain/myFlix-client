import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./login-view.scss";

//login for user - taking username and password
export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    props.onRegister(true);
  };

  return (
    <form>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      <br />
      <button type="submit" onClick={handleRegister}>
        Register
      </button>
    </form>
  );
}
