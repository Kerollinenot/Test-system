import { Container, Button } from 'react-bootstrap';

import { useState, useEffect } from 'react';

import AdminTopicList from '../../Components/AdminTopic/AdminTopicList'
import AdminTopicCreateModal from '../../Components/AdminTopic/AdminTopicCreateModal'
import AdminTopicEditModal from '../../Components/AdminTopic/AdminTopicEditModal'

export default function AdminTopic() {
    const [topicList, setTopicList] = useState([]);
    const [visibleCreateModal, setVisibleCreateModal] = useState(false);
    const [visibleEditModal, setVisibleEditModal] = useState(false);
    const [editTitle, setEditTitle] = useState()
    const [editDescription, setEditDescription] = useState()
    const [editId, setEditId] = useState()

    useEffect(() => {
        loadList()
    }, []);

    const openEditModal = (id, title, description) => {
        setEditId(id)
        setEditTitle(title)
        setEditDescription(description)
        setVisibleEditModal(!visibleEditModal)
    }

    const loadList = () => {
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

    return (
        <>
            <Container className='bg-light'>
                <Button
                    style={{ margin: 15 }}
                    variant="success"
                    onClick={() => { setVisibleCreateModal(!visibleCreateModal) }}>
                    Добавить
                </Button>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название</th>
                            <th scope="col">Описание</th>
                            <th scope="col">Столбец действий</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AdminTopicList openEditModal={openEditModal} topicList={topicList} updateList={loadList} />
                    </tbody>
                </table>
            </Container>
            <AdminTopicCreateModal
                closeModal={() => {
                    setVisibleCreateModal(false); //Вызывает ошибку
                    loadList();
                }}
                visible={visibleCreateModal} />

            <AdminTopicEditModal
                title={editTitle}
                setTitle={setEditTitle}
                description={editDescription}
                setDescription={setEditDescription}
                id={editId}
                closeModal={() => {
                    setVisibleEditModal(false); //Вызывает ошибку
                    loadList();
                }}
                visible={visibleEditModal} />
        </>
    )
}
