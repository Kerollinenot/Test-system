import { Navbar, Container, Nav, NavbarBrand, Button, Dropdown } from "react-bootstrap";
import { useState, useEffect } from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import logo from "./logo192.png"

import "./Header.css"

import Authorization from '../Authorization/authorization'
import Registration from "../Registration/Registration";
// import UserTests from '../../Pages/UserTests/UserTests'

export default function Header() {
    const [authorizationVisible, setAuthorizationVisible] = useState(false);
    const [registrationVisible, setRegistrationVisible] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [fullName, setFullName] = useState('ФИО')

    useEffect(() => {
        updateUserInfo()
    }, [])

    const onSignUp = () => {
        localStorage.setItem('token', '')
        setToken()
    }

    const updateUserInfo = () => {
        fetch("http://testrf-api.tmweb.ru/api/v1/me", {
            headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }})
            .then(response => response.json())
            .then(result => setFullName(`${result.user.first_name} ${result.user.last_name} ${result.user.middle_name}`))
            .catch(error => console.log('error', error));
    }

    const onSignIn = () => {
        updateUserInfo()
        setAuthorizationVisible(false);
        setToken(localStorage.getItem('token'));
    }

    return (
        <>

            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Container>
                    <NavbarBrand href="/main-menu">
                        <img
                            src={logo}
                            height="30"
                            width="30"
                            className="d-inline-block align-top"
                            alt="Logo" />
                        Тест.РФ
                    </NavbarBrand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/main-menu"> Главная </Nav.Link>
                            <Nav.Link href="/test-list"> Пройти тесты </Nav.Link>
                            <Nav.Link href="/statistics"> Статистика </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                    <Button className={`nav-btn ${token ? 'd-none' : 'd-block'}`} variant="outline-info" onClick={() => { setRegistrationVisible(!registrationVisible) }}>Регистрация</Button>
                    <Button className={`nav-btn ${token ? 'd-none' : 'd-block'}`} variant="outline-light" onClick={() => { setAuthorizationVisible(!authorizationVisible) }}>Авторизация</Button>

                    <span className={`text-light nav-btn ${token ? 'd-block' : 'd-none'}`}>{fullName}</span>
                    <Dropdown className={`nav-btn ${token ? 'd-block' : 'd-none'}`} >
                        <Dropdown.Toggle variant="success" className="nav-btn">
                            Меню пользователя
                        </Dropdown.Toggle>

                        <Dropdown.Menu bg="dark" variant="dark">
                            <Dropdown.Item href="admin-panel">Перейти в админ. меню</Dropdown.Item>
                            <Dropdown.Item>Какая-нибудь бесполезная херня</Dropdown.Item>
                            <Dropdown.Item>Какая-нибудь бесполезная херня</Dropdown.Item>
                            <Dropdown.Item onClick={onSignUp}>
                                Выйти из аккаунта
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Navbar>

            <Registration
                visible={registrationVisible}
                onSubmit={() => { setRegistrationVisible(!registrationVisible) }}
                closeModal={() => { setRegistrationVisible(false) }} />
            <Authorization
                visible={authorizationVisible}
                onSubmit={onSignIn}
                closeModal={() => { setAuthorizationVisible(false) }} />

            <Routes>
                {/* <Route path='users' element={<AdminUsers />} /> */}
                {/* <Route path='test-list' element={<UserTests />} /> */}
            </Routes>
        </>
    )
}
