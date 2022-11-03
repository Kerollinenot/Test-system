import { Button } from 'react-bootstrap'

import './AdminUsersListItem.css'

export default function AdminUsersListItem(props) {
    const deleteItem = () => {
        const url = `http://testrf-api.tmweb.ru/api/v1/users/${props.id}`
        fetch(url, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(() => {
            props.updateList()
        }
        ).catch(() => {
            console.log("error")
        })
    }

    let roles = '';
    props.roles.forEach((item) => {
        roles = roles + item.slug + ' '
    })

    const { id, first_name, last_name, middle_name, login, email, index } = props;

    return (
        <>
            <tr>
                <th scope="col">{index}</th>
                <th scope="col">{first_name} {last_name} {middle_name}</th>
                <th scope="col">{email}</th>
                <th scope="col">{roles}</th>
                <th scope="col">{`${props.average_score.totalCorrectAnswersPercentage}%`}</th>
                <th scope="col">
                    <Button variant="outline-info" onClick={() => { props.openEditModal(id, first_name, last_name, middle_name, email, props.roles) }}>Редактировать</Button>
                    <Button variant="outline-danger" onClick={deleteItem}>Удалить</Button>
                </th>
            </tr>  
        </>
    )
}
