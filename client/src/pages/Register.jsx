import {
  Anchor,
  Button,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Container,
  Alert,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isregisterLoading,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "50px",
      }}
    >
      <Paper
        radius="md"
        p="lg"
        withBorder
        style={{
          width: "400px",
        }}
      >
        <form onSubmit={registerUser}>
          <Stack>
            <TextInput
              name="name"
              label="Name"
              placeholder="Enter your name"
              value={registerInfo.name}
              onChange={(e) =>
                updateRegisterInfo({ ...registerInfo, name: e.target.value })
              }
              radius="md"
            />

            <TextInput
              name="email"
              label="Email"
              placeholder="Enter your email"
              value={registerInfo.email}
              onChange={(e) =>
                updateRegisterInfo({ ...registerInfo, email: e.target.value })
              }
              radius="md"
            />

            <PasswordInput
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={registerInfo.password}
              onChange={(e) =>
                updateRegisterInfo({
                  ...registerInfo,
                  password: e.target.value,
                })
              }
              radius="md"
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => navigate("/login")}
              size="xs"
            >
              Already have an account? Login
            </Anchor>
            <Button type="submit" radius="xl" loading={isregisterLoading}>
              {isregisterLoading ? "Registering..." : "Register"}
            </Button>
            {registerError?.error && (
              <Alert variant="filled" color="red" radius="md" style={{width: "100%"}}>
                <p>{registerError?.message}</p>
              </Alert>
            )}
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
