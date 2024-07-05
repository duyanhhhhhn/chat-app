import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {

    const { user,logoutUser } = useContext(AuthContext)

    return (
        <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
            <Container>
                <h2>
                    <Link to="/" className="link-light text-decoration-none">Chatapp</Link>
                </h2>
                {user &&<span className="text-warning">{user?.name} đang đăng nhập</span>}
                <Nav>
                    {!user ?  <Stack direction="horizontal" gap={3}>
                    <Link to="/login" className="link-light text-decoration-none">Đăng nhập</Link>
                    <Link to="/register" className="link-light text-decoration-none">Đăng ký</Link>
                    </Stack> : <>
                    <Link onClick={() =>logoutUser()} to="/login" className="link-light text-decoration-none">Đăng xuất</Link>
                    </>}
                   
                </Nav>
            </Container>
        </Navbar>
    );
}
 
export default NavBar;