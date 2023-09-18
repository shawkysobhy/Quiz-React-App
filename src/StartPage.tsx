export const StartPage = ({
	questionNum,
	dispatch,
}: {
	questionNum: number;
	dispatch: Function;
}) => {
	return (
		<div className='start'>
			<h2>Welcome to React Quiz !</h2>
			<h3>{questionNum} questions to test your React mastery !</h3>
			<button
				className='btn ui-btn'
				onClick={() => {
					dispatch({ type: 'start' });
				}}>
				Let's Start
			</button>
		</div>
	);
};
