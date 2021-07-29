import React, { useState } from 'react';
import { login } from '../services/auth';
import './Signup';
import * as CONSTS from '../utils/consts';

function LogIn(props) {
	const { authenticate } = props;

	const initialState = {
		username: '',
		password: ''
	};

	const [formData, setFormData] = useState(initialState);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const credentials = {
			username: formData.username,
			password: formData.password
		};

		login(credentials).then((res) => {
			if (!res.data) {
				console.log('error');
			}else{
      localStorage.setItem(CONSTS.ACCESS_TOKEN, res.data.accessToken);
			authenticate(res.data.user);
			props.history.push('/');
      }	
		});
	};

	return (
		<div>
			<h1>Log In</h1>
			<form onSubmit={handleSubmit} className='signup__form'>
				<label htmlFor='input-username'>Username</label>
				<input
					id='input-username'
					type='text'
					name='username'
					placeholder='Username'
					value={formData.username}
					onChange={handleChange}
					required
				/>

				<label htmlFor='input-password'>Password</label>
				<input
					id='input-password'
					type='password'
					name='password'
					placeholder='Password'
					value={formData.password}
					onChange={handleChange}
					required
					minLength='8'
				/>

				<button className='form-btn' type='submit'>
					Submit
				</button>
			</form>
		</div>
	);
}

export default LogIn;