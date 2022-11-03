import { Form } from 'react-bootstrap'

export default function Answer(props) {
    const {questionId, id} = props

    return (
        <div className="p-3">
            <div className="input-group-prepend">
                <span className="input-group-text">{id} ответ</span>
            </div>
            <input name={`questions[${questionId}][answers][${id}][text]`} className="form-control" ></input>
            <Form.Check
                name={`questions[${questionId}][answers][${id}][is_correct]`}
                type="checkbox"
                label={`Правильный ответ`}
                defaultValue={0}
                onChange={props.toogleCheckboxValue}
            />
        </div>
    )
}
