// import { useContext } from "react";
// import { Container, Nav, Navbar, Stack } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import Notification from "./chat/Notification";

// const NavBar = () => {

//     const { user,logoutUser } = useContext(AuthContext)

//     return (
//         <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
//             <Container>
//                 <h2>
//                     <Link to="/" className="link-light text-decoration-none">Chatapp</Link>
//                 </h2>
//                 {user &&<span className="text-warning">{user?.name} đang đăng nhập</span>}
//                 <Nav>
//                     {!user ?  <Stack direction="horizontal" gap={3}>
//                     <Link to="/login" className="link-light text-decoration-none">Đăng nhập</Link>
//                     <Link to="/register" className="link-light text-decoration-none">Đăng ký</Link>
//                     </Stack> : <>
//                             <Notification/>
//                     <Link onClick={() =>logoutUser()} to="/login" className="link-light text-decoration-none">Đăng xuất</Link>
//                     </>}

//                 </Nav>
//             </Container>
//         </Navbar>
//     );
// }

// export default NavBar;

import { Box, Button, Group, Menu, Avatar, Text, UnstyledButton } from "@mantine/core";
import classes from "../assets/css/HeaderMegaMenu.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import cx from 'clsx';

export default function NavBar() {
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(AuthContext);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link to="/" className="link-light">
            Chat app
          </Link>
          {user ? (
            <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group gap={7}>
                  <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
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
