import { Form, Button } from "react-bootstrap";

import "../modal/modal.css"

export default function AdminUserEditModal(props) {
	const id = props.id
	const roles = [];

	const handleSubmit = (e) => {
		e.preventDefault();

		let formdata = new FormData(e.target);

		roles.forEach((item) => {
			formdata.append("roles[]", item)
		})

		fetch(`http://testrf-api.tmweb.ru/api/v1/users/${id}`, {
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
	
	const {
		firstName, setFirstName,
		lastName, setLastName,
		middleName, setMiddleName,
		email, setEmail,
		isRoleUserChecked, setRoleUserChecked,
		isRoleAdminChecked, setRoleAdminChecked,
	} = props

	return (
		<div className={formClass} onClick={props.closeModal}>
			<Form
				className="modal-form bg-light"
				onSubmit={handleSubmit}
				onClick={e => e.stopPropagation()}
			>
				<p className="label">Редактирование пользователя {firstName}</p>

				<Form.Control
					className="modal-form__item"
					type="text"
					name="firstName"
					placeholder="Имя"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>

				<Form.Control
					className="modal-form__item"
					type="text"
					name="lastName"
					placeholder="Фамилия"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>

				<Form.Control
					className="modal-form__item"
					type="text"
					name="middleName"
					placeholder="Отчество"
					value={middleName}
					onChange={(e) => setMiddleName(e.target.value)}
				/>

				<Form.Control
					className="modal-form__item"
					type="text"
					name="email"
					placeholder="E-mail"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<p> Роли: </p>

				<Form.Check
					name={"roleUser"}
					type="checkbox"
					label={`user`}
					checked={isRoleUserChecked}
					onChange={(e) => {
						setRoleUserChecked(!isRoleUserChecked)
						e.checked ? delete (roles[1]) : roles[1] = 'admin'

					}}
				/>

				<Form.Check
					name={"roleAdmin"}
					type="checkbox"
					label={"admin"}
					checked={isRoleAdminChecked}
					onChange={(e) => {
						setRoleAdminChecked(!isRoleAdminChecked)
						e.checked ? delete (roles[0]) : roles[0] = 'user'
					}}
				/>

				<Button
					variant="success"
					className="button"
					type="submit"
				>
					Изменить
				</Button>
			</Form>
		</div>
	)
}