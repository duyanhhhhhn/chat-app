import {
  Box,
  Button,
  Group,
  Menu,
  Avatar,
  Text,
  UnstyledButton,
} from "@mantine/core";
import classes from "../assets/css/HeaderMegaMenu.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import cx from "clsx";
import avatar from "../assets/avatar.jpeg";
import Logo from "../assets/Login/Logo.png";



export default function NavBar() {
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(AuthContext);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between " h="100%">
          <Link
            to="/"
            className="text-[#333] text-3xl font-bold mb-2 flex items-center"
            style={{ fontFamily: "Pacifico, cursive" }}
          >
           <img src={Logo} alt="" className="w-16 h-16" />
          </Link>
          {user ? (
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: "pop-top-right" }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened,
                  })}
                >
                  <Group gap={7}>
                    <Avatar
                      src={avatar}
                      alt={user.name}
                      radius="xl"
                      size={30}
                    />
                    <Text fw={500} size="sm" lh={1} mr={3}>
                      {user.name}
                    </Text>
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item color="red" onClick={() => logoutUser()}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Group visibleFrom="sm">
              <Button variant="default" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/register")}>Register</Button>
            </Group>
          )}
        </Group>
      </header>
    </Box>
  );
}
