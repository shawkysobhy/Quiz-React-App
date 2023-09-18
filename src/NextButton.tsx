export const NextButton = ({
	dispatch,
	currentQuestion,
	questionNum,
	answer,
}: {
	dispatch: Function;
	currentQuestion: number;
	questionNum: number;
	answer: number;
}) => {
	const hasAnswered = answer !== null;
	if (currentQuestion + 1 !== questionNum && hasAnswered) {
		return (
			<button
				className='btn'
				onClick={() => {
					dispatch({ type: 'nextQuestion' });
				}}>
				Next
			</button>
		);
	} else if (currentQuestion + 1 === questionNum && hasAnswered) {
		return (
			<button
				className='btn'
				onClick={() => {
					dispatch({ type: 'finished' });
				}}>
				Check Result
			</button>
		);
	}
	return <></>;
};
