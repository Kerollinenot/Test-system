import { useEffect, useState } from 'react'
import { Container, Button, Form } from 'react-bootstrap'
import Question from '../../Components/AdminTestCreate/Question'

export default function AdminTestEdit(props) {
    
    
    const id = props.id 
    console.log(id)

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [questions, setQuestions] = useState([1])
    const [topicList, setTopicList] = useState([])
    const [topicId, setTopicId] = useState()

    useEffect(() => {
        loadTopicList()
    }, [])

    const loadTopicList = () => {
        fetch("http://testrf-api.tmweb.ru/api/v1/topics/", {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setTopicList(data.data)
            });
    }

    const loadTest = () => {

    }

    const handleSubmitTest = (e) => {
        e.preventDefault();

        let formdata = new FormData(e.target);

        fetch("http://testrf-api.tmweb.ru/api/v1/tests", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formdata
        })
            .then(response => response.json())
            .then(result => {

            })
            .catch(error => console.log('error', error));
    }

    const questionList = questions.map((item, index) => {
        return (
            <Question
                key={index}
                id={index + 1}
            />
        )
    })

    let topics = topicList.map((item, index) => {
        const { id, title } = item;
        return (
            <option
                key={index}
                value={id}
            >
                {title}
            </option>
        )
    })

    return (
        <>
            <Container>
                <h2 className="mb-3 mt-3">Создать Тест</h2>
                <Form onSubmit={handleSubmitTest}>
                    <Form.Control
                        className="modal-form__item"
                        name="description"
                        type="text"
                        placeholder="Описание"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }} />

                    <Form.Select
                        className="modal-form__item"
                        name="topic"
                        value={topicId}
                        onChange={(e) => { setTopicId(e.target.value) }}>
                        {topics}
                    </Form.Select>

                    <Form.Control
                        className="modal-form__item"
                        name="title"
                        type="text"
                        placeholder="Название"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }} />

                    {questionList}

                    <Button
                        variant="info"
                        className="button"
                        type="button"
                        onClick={(e) => { setQuestions([].concat(questions, '1')) }}>
                        Добавить вопрос

                    </Button>

                    <Button
                        variant="success"
                        className="button"
                        type="submit">
                        Сохранить
                    </Button>
                </Form>
            </Container>
        </>
    )
}
