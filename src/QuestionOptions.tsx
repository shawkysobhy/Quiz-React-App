export const QuestionOptions = ({
	options,
	correctOption,
	dispatch,
	answer,
}: {
	options: string[];
	correctOption: number;
	dispatch: Function;
	answer: number | null;
}) => {
	const hasAnswered = answer !== null;
	return (
		<div className='options'>
			{options.map((option, index) => (
				<button
					disabled={hasAnswered}
					className={`btn btn-option ${
						hasAnswered ? (index === correctOption ? 'correct' : 'wrong') : null
					}`}
					onClick={() => {
						dispatch({ type: 'addAnswer', payload: index });
					}}
					key={index}>
					{option}
				</button>
			))}
		</div>
	);
};
