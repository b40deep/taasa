import Navbar from './Navbar';
import Menu from './Menu';
import { useState } from 'react';
// import { Link } from 'react-router-dom';
import '../css/Post.css';
import axios from 'axios';

const Login = () => {
	let [ userDets, setUserDets ] = useState({ nickname: '', pin: '' });

	const handleInput = (e) => {
		e.preventDefault();

		e.target.name === 'nickname' &&
			setUserDets((userDets) => ({
				...userDets,
				[e.target.name]: e.target.value.trim()
			}));
		e.target.name === 'pin' &&
			setUserDets((userDets) => ({
				...userDets,
				[e.target.name]: e.target.value.trim()
			}));
		console.log(userDets);
	};

	const handleLogin = () => {
		//check for clean text
		let _nickname = userDets['nickname'];
		let _pin = userDets['pin'];
		_nickname.length < 3 || _pin.length !== 4 ? console.log('dirty inputs') : console.log('clean inputs');
		axios
			.post('http://localhost:3001/users/login', { nickname: _nickname, pin: _pin })
			.then(
				(res) =>
					res.data.response === 'loginSuccess'
						? window.location.replace('/')
						: res.data.response === 'loginDenied'
							? console.log('Wrong password')
							: console.log('User not found')
			);
	};

	return (
		<div>
			<Navbar />
			<div className="container ">
				<div className="row-cols-1">
					<div className="m-auto col-12 col-sm-10 col-md-8 col-lg-6 col-xl-6 col-xxl-6">
						<form>
							<div className="form-outline mb-4 mt-3">
								<input
									type="text"
									id="formNickname"
									className="form-control "
									placeholder="nickname"
									name="nickname"
									value={userDets['nickname']}
									onChange={handleInput}
								/>
							</div>

							<div className="form-outline mb-4">
								<input
									type="text"
									id="formPin"
									className="form-control "
									placeholder="4-digit pin"
									name="pin"
									value={userDets['pin']}
									onChange={handleInput}
								/>
								{/* {                    <label className="form-label" htmlFor="form3Example4">
                                Password
                            </label>} */}
							</div>
							{/* <Link to="/" className="nolinkcolor"> */}
							<div className="col-auto mt-3 d-grid">
								<button type="button" className="btn btn-secondary" name="submit" onClick={handleLogin}>
									Log in
								</button>
							</div>
							{/* </Link> */}
							<div className="form-outline mb-3 mt-3">
								<a className="nolinkcolor" href="/resetpin">
									Forgot your PIN? reset it!
								</a>
							</div>
							<div className="form-outline mb-3 mt-3">
								<a className="nolinkcolor" href="/signup">
									New here? sign up!
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
			<Menu page="none" />{' '}
		</div>
	);
};

export default Login;
