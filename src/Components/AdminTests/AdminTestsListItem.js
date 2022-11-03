import { Button } from 'react-bootstrap'

import './AdminTestsListItem.css'

export default function TestsListItem(props) {

    const deleteItem = () => {
        const url = `http://testrf-api.tmweb.ru/api/v1/tests/${props.id}`
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

    return (
        <>
            <tr>
                <th scope="col">{props.index}</th>
                <th scope="col">{props.title}</th>
                <th scope="col">{props.topic.title}</th>
                <th scope="col">{props.description}</th>
                <th scope="col">{props.questionsCount}</th>
                <th scope="col">
                    <Button className='mb-2' variant="outline-info" href="edit-test">Редактировать</Button>
                    <Button className='mb-2' variant="outline-danger" onClick={deleteItem}>Удалить</Button> 
                </th>
            </tr>
        </>
    )
}
