import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const useTimer = (
	initialCountdown = 0,
	onFinished?: () => void,
): [number, Dispatch<SetStateAction<number>>] => {
	const [countdown, setCountdown] = useState(initialCountdown);
	useEffect(() => {
		// Timer that decrements itself each second and updates the mins/seconds downwards
		const timerInterval = setInterval(() => {
			// Countdown timer up, clear timer and do nothing
			if (countdown == 0) {
				if (onFinished) onFinished();
				clearInterval(timerInterval);
			} else {
				setCountdown(countdown - 1);
			}
		}, 1000);

		return () => {
			clearInterval(timerInterval);
		};
	}, [countdown, setCountdown]);
	return [countdown, setCountdown];
};

export default useTimer;
