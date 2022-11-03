import { useState, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'

import AdminTestsList from '../../Components/AdminTests/AdminTestsList'
import AdminTestEdit from '../../Pages/AdminTestEdit/AdminTestEdit'

import './Tests.css'

export default function AdminTests() {
    const [testsList, setTestsList] = useState([]);

    useEffect(() => { loadList() }, [])

    const loadList = () => {
        fetch("http://testrf-api.tmweb.ru/api/v1/tests/", {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                updateList(data.data);
            });
    }

    const updateList = (data) => {
        setTestsList(data)
    }


    return (
        <>
            <Container className='bg-light'>
                <Button
                    style={{ margin: 15 }}
                    variant="success"
                    href="/admin-panel/create-test"
                >
                    Добавить
                </Button>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название теста</th>
                            <th scope="col">Тема</th>
                            <th scope="col">Описание</th>
                            <th scope="col">Количество вопросов</th>
                            <th scope="col">Столбец действий</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AdminTestsList
                            updateList={loadList}
                            testsList={testsList} />
                    </tbody>
                </table>
            </Container>

            <Routes>
                <Route path='edit-test' element={<AdminTestEdit id={1} />} />
            </Routes>

        </>
    )
}
