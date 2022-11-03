import { useState } from "react";
import { Form, Button } from "react-bootstrap";

import "../modal/modal.css"

export default function AdminTopicCreateModal(props) {

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()

    const clearForm = () => {
        setTitle('');
        setDescription('');
        props.closeModal()
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let formdata = new FormData(e.target);
        fetch("http://testrf-api.tmweb.ru/api/v1/topics", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formdata
        })
            .then(() => {
                clearForm()
            })
            .catch(error => console.log('error', error));
    }

    let formClass = `modal-bg ${props.visible ? 'visible' : 'invisible'}`

    return (
        <div className={formClass} onClick={props.closeModal}>
            <Form
                className="modal-form bg-light"
                onSubmit={handleSubmit}
                onClick={e => e.stopPropagation()}>

                <p className="label">Создать новую тему</p>
                <Form.Control
                    className="modal-form__item"
                    name="title"
                    type="text"
                    placeholder="Название темы"
                    value={title}
                    onChange={(e) => { setTitle(e.value) }} />

                <Form.Control
                    className="modal-form__item"
                    name="description"
                    as="textarea"
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => { setDescription(e.value) }} />

                <Button
                    variant="success"
                    className="button"
                    type="submit">
                    Создать
                </Button>
            </Form>
        </div>
    )
}
