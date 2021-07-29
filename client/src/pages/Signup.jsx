import React, { useState } from 'react';
import { signup } from '../services/auth';
import './auth.css';
import * as CONSTS from '../utils/consts';
import * as PATHS from '../utils/paths';

function Signup(props) {
	const initialState = {
		username: '',
		email: '',
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
			password: formData.password,
			email: formData.email
		};

		signup(credentials).then((res) => {
			// successful signup
			console.log(res);
			if (!res.data) { 
				console.log('error');
			} else{
    	localStorage.setItem(CONSTS.ACCESS_TOKEN, res.data.accessToken);
			props.authenticate(res.data.user);
			props.history.push(PATHS.HOMEPAGE);
      }
		
		});
	};

	return (
		<div>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit} className='auth__form'>
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

				<label htmlFor='input-username'>Email</label>
				<input
					id='input-email'
					type='text'
					name='email'
					placeholder='Your Email'
					value={formData.email}
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

export default Signup;