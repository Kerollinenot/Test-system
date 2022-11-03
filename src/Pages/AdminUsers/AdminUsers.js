import { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';

import AdminUsersList from '../../Components/AdminUsers/AdminUsersList'
import AdminUserCreateModal from '../../Components/AdminUsers/AdminUserCreateModal';
import AdminUserEditModal from '../../Components/AdminUsers/AdminUserEditModal';

export default function AdminUsers() {
    const [usersList, setUsersList] = useState([]);
    const [visibleCreateModal, setVisibleCreateModal] = useState(false);
    const [visibleEditModal, setVisibleEditModal] = useState(false);

    const [id, setId] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [middleName, setMiddleName] = useState()
    const [email, setEmail] = useState()
    const [isRoleUserChecked, setRoleUserChecked] = useState()
	const [isRoleAdminChecked, setRoleAdminChecked] = useState()

    useEffect(() => {
        loadList()
    }, []);

    const openEditModal = (id, firstName, lastName, middleName, email, roles) => {
        console.log(roles)
        setId(id);
        setFirstName(firstName);
        setLastName(lastName);
        setMiddleName(middleName);
        setEmail(email);
        setRoleUserChecked(roles[0] ? true : false)
        setRoleAdminChecked(roles[1] ? true : false)
        setVisibleEditModal(!visibleEditModal);
    }

    const loadList = () => {
        fetch("http://testrf-api.tmweb.ru/api/v1/users/", {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setUsersList(data.data);
            });
    }

    return (
        <>
            <Container className='bg-light'>
                <Button
                    style={{ margin: 15 }}
                    variant="success"
                    onClick={() => { setVisibleCreateModal(true) }}>
                    Добавить
                </Button>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ФИО</th>
                            <th scope="col">Email</th>
                            <th scope="col">Роль</th>
                            <th scope="col">Средний балл</th>
                            <th scope="col">Столбец действий</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AdminUsersList
                            openEditModal={openEditModal}
                            usersList={usersList}
                            updateList={loadList} />
                    </tbody>
                </table>
            </Container>
            <AdminUserCreateModal
                closeModal={() => {
                    setVisibleCreateModal(false); //Вызывает ошибку
                    loadList();
                }}
                visible={visibleCreateModal} />

            <AdminUserEditModal
                id={id}
                setId={setId}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                middleName={middleName}
                setMiddleName={setMiddleName}
                email={email}
                setEmail={setEmail}
                isRoleUserChecked = {isRoleUserChecked}
                setRoleUserChecked = {setRoleUserChecked}
                isRoleAdminChecked = {isRoleAdminChecked}
                setRoleAdminChecked = {setRoleAdminChecked}
                closeModal={() => {
                    setVisibleEditModal(false); //Вызывает ошибку
                    loadList();
                }}
                visible={visibleEditModal} />
        </>
    )
}
