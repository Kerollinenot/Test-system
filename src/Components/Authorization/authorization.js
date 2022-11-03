import { Form, Button } from "react-bootstrap";
import { useState } from 'react';

import "../modal/modal.css"


export default function Authorization(props) {
    const [login, setLogin] = useState('admin');
    const [password, setPassword] = useState('358537fB^');

    const handleSubmit = (e) => {
        e.preventDefault();

        let formdata = new FormData(e.target);
        fetch("http://testrf-api.tmweb.ru/api/v1/auth/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
            },
            body: formdata
        })
            .then(response => response.json())
            .then(result => {
                saveToken(result)
                props.onSubmit()
            })
            .catch(error => console.log('error', error)); //Какая должна быть обработка ошибок?
    }

    const saveToken = (result) => {
        const savedToken = result.authorization.token.text
        localStorage.setItem('token', savedToken)
    }

    let formClass = `modal-bg ${props.visible ? 'visible' : 'invisible'}`

    return (
        <div className={formClass} onClick={props.closeModal}>
            <Form
                className="modal-form bg-light"
                onSubmit={handleSubmit}
                onClick={e => e.stopPropagation()}
            >
                <p className="label">Авторизация</p>
                <Form.Control
                    className="modal-form__item"
                    name="login"
                    type="text"
                    placeholder="Login или E-mail"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <Form.Control
                    className="modal-form__item"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="success"
                    className="button"
                    type="submit">
                    Войти
                </Button>
            </Form>
        </div>
    )
}