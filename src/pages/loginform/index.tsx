import React, { useState, FormEvent } from "react";
import axios from "axios";
import styles from "@/styles/Login.module.css";

const LoginForm: React.FC = () => {
  // State for form fields
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<Array<string>>([]);

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage([]);
    // Basic validation
    if (!userName || !password) {
      if (!userName) {
        setMessage((prevMessage) => [...prevMessage, "Email is required"]);
      }
      if (!password) {
        setMessage((prevMessage) => [...prevMessage, "Password is required"]);
      }
      return;
    }

    // If validation passes, you can proceed
    axios
      .post(`/api/get_user`, {
        username: userName,
        password: password,
      })
      .then((res) => {
        setMessage(["Sign in successfully"]);
      })
      .catch((err) => {
        setMessage(["Invalid username or password"]);
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Login Form</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="email"></label>
          <input
            id="email"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={styles.input}
            placeholder="UserName"
          />
        </div>

        <div>
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="password"
          />
        </div>
        <div className={styles.errorMessage}>
          {message.map((msg, index) => {
            return <p key={index}>{msg}</p>;
          })}
        </div>
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
