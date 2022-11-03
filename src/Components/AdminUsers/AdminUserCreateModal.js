import { useState } from "react";
import { Form, Button } from "react-bootstrap";

import "../modal/modal.css"


export default function AdminUserCreateModal(props) {

	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [middleName, setMiddleName] = useState();
	const [login, setLogin] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [passwordConfirmation, setPasswordConfirmation] = useState();
	const [isRoleUserChecked, setRoleUserChecked] = useState(false)
	const [isRoleAdminChecked, setRoleAdminChecked] = useState(false)

	let roles = [];

	const clearForm = () => {
		setFirstName('');
		setLastName('');
		setMiddleName('');
		setLogin('');
		setEmail('');
		setPassword('');
		setPasswordConfirmation('');
		setRoleUserChecked(false)
		setRoleAdminChecked(false);
		roles = [];

		props.closeModal();

	}

	const handleSubmit = (e) => {
		e.preventDefault();

		let formdata = new FormData(e.target);

		roles.forEach((item) => {
			formdata.append("roles[]", item)
		})

		fetch("http://testrf-api.tmweb.ru/api/v1/users", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			},
			body: formdata
		})
			.then(() => {
				clearForm()
			})
			.catch(error => console.log('error', error));
	}

	let formClass = `modal-bg ${props.visible ? 'visible' : 'invisible'}`

	return (
		<div className={formClass} onClick={props.closeModal}>
			<Form
				className="modal-form bg-light"
				onSubmit={handleSubmit}
				id="registration-form"
				onClick={e => e.stopPropagation()}
			>
				<p className="label">Добавить пользователя</p>

				<Form.Control
					className="modal-form__item"
					type="text"
					name="first_name"
					placeholder="Имя"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>

				<Form.Control
					className="modal-form__item"
					type="text"
					name="last_name"
					placeholder="Фамилия"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>

				<Form.Control
					className="modal-form__item"
					type="text"
					name="middle_name"
					placeholder="Отчество"
					value={middleName}
					onChange={(e) => setMiddleName(e.target.value)}
				/>

				<Form.Control
					className="modal-form__item"
					type="text"
					name="login"
					placeholder="Login"
					value={login}
					onChange={(e) => setLogin(e.target.value)}
				/>

				<Form.Control
					className="modal-form__item"
					type="text"
					name="email"
					placeholder="E-mail"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<Form.Control
					className="modal-form__item"
					type="password"
					name="password"
					placeholder="Пароль"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<Form.Control
					className="modal-form__item"
					name="password_confirmation"
					type="password"
					placeholder="Подтвердите пароль"
					value={passwordConfirmation}
					onChange={(e) => setPasswordConfirmation(e.target.value)}
				/>

				<p> Роли: </p>

				<Form.Check
					name={"roleAdmin"}
					type="checkbox"
					label={"user"}
					checked={isRoleAdminChecked}
					onChange={(e) => {
						setRoleAdminChecked(!isRoleAdminChecked)

						e.checked ? delete (roles[0]) : roles[0] = 'user'
					}}
				/>

				<Form.Check
					name={"roleUser"}
					type="checkbox"
					label={`admin`}
					checked={isRoleUserChecked}
					onChange={(e) => {
						setRoleUserChecked(!isRoleUserChecked)
						e.checked ? delete (roles[1]) : roles[1] = 'admin'
						
					}}
				/>

				<Button
					variant="success"
					className="button"
					type="submit"
				>
					Добавить
				</Button>
			</Form>
		</div>
	)
}