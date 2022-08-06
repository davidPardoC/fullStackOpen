import React from "react";
import { useState } from "react";
import loginService from "../services/login";

const LoginForm = ({ onLogin, onError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginService.login({ username, password });
      onLogin(data);
    } catch (error) {
      onError(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Login into app</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsername}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePassword}
      />
      <input type="submit" value="Login" />
    </form>
  );
};

export default LoginForm;
