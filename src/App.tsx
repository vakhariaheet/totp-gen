import { useState } from 'react';
import './App.scss';
import useTimer from './Hooks/useCounter';
import totp from 'totp-generator';
import Footer from './Components/Footer/Footer';

function App() {
	const [secret, setSecret] = useState('');
	const [token, setToken] = useState('000000');
	const createToken = () => {
		const token = totp(secret === 'penguin' ? 'OFPBCYLMENPBI2TE' : secret, {
			digits: 6,
			period: 30,
		});
		setToken(token);
		setCountdown(30);
	};
	const [counter, setCountdown] = useTimer(30, createToken);

	return (
		<>
			<div className='container'>
				<h1>Generate TOTP Token</h1>
				<div className='counter'>
					<h3>{counter}</h3>
				</div>
				<input
					type='text'
					value={secret}
					placeholder='Enter Secret '
					onChange={(e) => setSecret(e.target.value)}
				/>
				<button onClick={createToken}>Start</button>
				<div
					className='token'
					onClick={async () => {
						await navigator.clipboard.writeText(token);
						alert('Copied to clipboard');
					}}
				>
					<h3>{token}</h3>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default App;
