import { Button } from 'react-bootstrap'

import './AdminTopicListItem.css'

export default function AdminTopicListItem(props) {

    const handleDelete = () => {
        const url = `http://testrf-api.tmweb.ru/api/v1/topics/${props.id}`
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

    const { id, title, description, index } = props;

    return (
        <>
            <tr>
                <th scope="col">{index}</th>
                <th scope="col">{title}</th>
                <th scope="col">{description}</th>
                <th scope="col">
                    <Button variant="outline-info"
                        onClick={() => { props.openEditModal(id, title, description) }}>
                        Редактировать
                    </Button>
                    <Button variant="outline-danger" onClick={handleDelete}>Удалить</Button>
                </th>
            </tr>
        </>
    )
}

