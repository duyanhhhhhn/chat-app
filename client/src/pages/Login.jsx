

import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Alert,
} from "@mantine/core";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import classes from "../assets/css/AuthenticationImage.module.css";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const { loginError, loginUser, loginInfo, updateLoginInfo, isloginLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <form onSubmit={loginUser}>
      <div className={classes.wrapper}>
        <Paper className={classes.form}>
          <Title order={2} className={classes.title}>
            Welcome back to my Chatapp!
          </Title>

          <TextInput
            name="email"
            label="Email address"
            placeholder="Enter your email"
            size="md"
            radius="md"
            value={loginInfo.email}
            onChange={(e) =>
              updateLoginInfo({ ...loginInfo, email: e.target.value })
            }
          />
          <PasswordInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            mt="md"
            size="md"
            radius="md"
            value={loginInfo.password}
            onChange={(e) =>
              updateLoginInfo({ ...loginInfo, password: e.target.value })
            }
          />
          <Button fullWidth mt="xl" size="md" radius="md" type="submit">
            {isloginLoading ? "Đang đăng nhập" : "Đăng nhập"}
          </Button>
          {loginError?.error && (
            <Alert variant="filled" color="red" radius="md" style={{width: "100%", marginTop: "10px"}}>
              <p>{loginError?.message}</p>
            </Alert>
          )}

          <Text ta="center" mt="md">
            Don&apos;t have an account?{" "}
            <Anchor
              fw={500}
              onClick={() => navigate("/register")}
            >
              Register
            </Anchor>
          </Text>
        </Paper>
      </div>
    </form>
  );
}
