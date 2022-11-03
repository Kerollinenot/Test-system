import Answer from './Answer'

export default function Question(props) {
    const toogleCheckboxValue = (e) => {
        e.target.setAttribute('value', e.target.checked ? '1' : '0')
    }

    const id = props.id
    const array = [1, 2, 3, 4]

    const elements = array.map((item, index) => {
        return (
            <Answer
                toogleCheckboxValue={toogleCheckboxValue}
                questionId={id}
                id={index + 1}
                key={index}
            />
        )
    })

    return (
        <div className='shadow rounded mb-5' >
            <h4 className="p-3">Вопрос № {id}</h4>
            <div className="p-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Описание вопроса</span>
                </div>
                <textarea name={`questions[${id}][text]`} className="form-control"></textarea>
            </div>

            <input type="hidden" name={`questions[${id}][is_multiple]`} value={0} />

            {elements}
        </div>
    )
}
