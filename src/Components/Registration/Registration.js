import { useState } from 'react';
import { Form, Button } from "react-bootstrap";

import "../modal/modal.css"


export default function Registration(props) {

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [patronymic, setPatronymic] = useState();
    const [login, setLogin] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirmation, setPasswordConfirmation] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        let formdata = new FormData(e.target);
        fetch("http://testrf-api.tmweb.ru/api/v1/auth/register", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
            },
            body: formdata
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }


    let formClass = `modal-bg ${props.visible ? 'visible' : 'invisible'}`

    return (
        <div className={formClass} onClick={props.closeModal}>
            <Form
                className="modal-form bg-light"
                onSubmit={handleSubmit}
                id="registration-form"
                onClick={e => e.stopPropagation()}
            >
                <p className="label">Регистрация</p>
                <Form.Control
                    className="modal-form__item"
                    type="text"
                    name="first_name"
                    placeholder="Имя"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} />
                <Form.Control
                    className="modal-form__item"
                    type="text"
                    name="last_name"
                    placeholder="Фамилия"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)} />
                <Form.Control
                    className="modal-form__item"
                    type="text"
                    name="middle_name"
                    placeholder="Отчество"
                    value={patronymic}
                    onChange={(e) => setPatronymic(e.target.value)} />
                <Form.Control
                    className="modal-form__item"
                    type="text"
                    name="login"
                    placeholder="Login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)} />
                <Form.Control
                    className="modal-form__item"
                    type="text"
                    name="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <Form.Control
                    className="modal-form__item"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <Form.Control
                    className="modal-form__item"
                    name="password_confirmation"
                    type="password"
                    placeholder="Подтвердите пароль"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)} />

                <Button
                    variant="success"
                    className="button"
                    type="submit"
                >
                    Регистрация
                </Button>
            </Form>
        </div>
    )
}