import { useMutation } from "@apollo/client";
import React, { useContext, useEffect } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { LOGIN } from "../graphql/mutations";
import { useForm } from "../hooks/useForm";

const Login = () => {
  const form = useForm({
    username: { type: "text", name: "username", value: "" },
    password: { type: "password", name: "password", value: "" },
  });
  const { showNotification } = useContext(NotificationContext);

  const [login, result] = useMutation(LOGIN, {
    onError: () => {
      showNotification("Login Error", 1500);
    },
  });
  useEffect(() => {
    const token = result.data?.login.value;
    if (token) {
      localStorage.setItem("loggedInUser", token);
    }
  }, [result?.data]);

  const onSubmit = (e) => {
    e.preventDefault();
    login({
      variables: {
        username: form.username.value,
        password: form.password.value,
      },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        className="form-control"
        placeholder="username"
        {...form.username}
        onChange={form.onChange}
      />
      <input
        className="form-control mt-2"
        placeholder="password"
        {...form.password}
        onChange={form.onChange}
      />
      <button className="btn btn-primary mt-2">Login</button>
    </form>
  );
};

export default Login;
