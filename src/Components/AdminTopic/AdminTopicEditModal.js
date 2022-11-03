import { Form, Button } from "react-bootstrap";

import "../modal/modal.css"


export default function AdminTopicEditModal(props) {
    const id = props.id;

    const handleSubmit = (e) => {
        e.preventDefault();

        let formdata = new FormData(e.target);
        fetch(`http://testrf-api.tmweb.ru/api/v1/topics/${id}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formdata
        })
            .then(() => {
                props.closeModal()
            })
            .catch(error => console.log('error', error));
    }

    let formClass = `modal-bg ${props.visible ? 'visible' : 'invisible'}`

    const { title, description } = props;

    return (
        <div className={formClass} onClick={props.closeModal}>
            <Form
                className="modal-form bg-light"
                onSubmit={handleSubmit}
                onClick={e => e.stopPropagation()}
            >

                <p className="label">Редактирование темы {title}</p>
                <Form.Control
                    className="modal-form__item"
                    name="title"
                    type="text"
                    placeholder="Название темы"
                    value={title}
                    onChange={(e) => { props.setTitle(e.value) }} />

                <Form.Control
                    className="modal-form__item"
                    name="description"
                    as="textarea"
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => { props.setDescription(e.value) }} />

                <Button
                    variant="success"
                    className="button"
                    type="submit">
                    Сохранить изменения
                </Button>
            </Form>
        </div>
    )
}
