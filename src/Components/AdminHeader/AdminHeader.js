import { Routes, Route } from 'react-router-dom'
import { Navbar, Container, Nav, NavbarBrand, Dropdown } from "react-bootstrap";

import logo from "./logo192.png"

import AdminTopic from '../../Pages/AdminTopic/AdminTopic'
import AdminUsers from '../../Pages/AdminUsers/AdminUsers';
import AdminTests from '../../Pages/AdminTests/AdminTests';
import AdminTestCreate from '../../Pages/AdminTestCreate/AdminTestCreate'
import AdminTestEdit from '../../Pages/AdminTestEdit/AdminTestEdit'

export default function AdminHeader() {
    return (
        <>
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Container>
                    <NavbarBrand href="/">
                        <img
                            src={logo}
                            height="30"
                            width="30"
                            className="d-inline-block align-top"
                            alt="Logo"
                        />
                        Тест.РФ
                    </NavbarBrand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/admin-panel/users"> Пользователи </Nav.Link>
                            <Nav.Link href="/admin-panel/topic"> Темы </Nav.Link>
                            <Nav.Link href="/admin-panel/tests"> Тесты </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                    <Dropdown className={`nav-btn`} >
                        <Dropdown.Toggle variant="success" className="nav-btn">
                            Меню администратора
                        </Dropdown.Toggle>

                        <Dropdown.Menu bg="dark" variant="dark">
                            <Dropdown.Item href="/">Перейти в пользоват. меню</Dropdown.Item>
                            <Dropdown.Item>Какая-нибудь бесполезная херня</Dropdown.Item>
                            <Dropdown.Item>Какая-нибудь бесполезная херня</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Navbar>

            <Routes>
                    <Route path='users' element={<AdminUsers />} />
                    <Route path='topic' element={<AdminTopic />} />
                    <Route path='tests' element={<AdminTests />} />
                    <Route path='create-test' element={<AdminTestCreate />} />
                    <Route path='edit-test' element={<AdminTestEdit id={1} />} />
            </Routes>
        </>
    )
}