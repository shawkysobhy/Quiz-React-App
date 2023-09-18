export const Result = ({
	points,
	totalPoints,
	dispatch,
	highscore,
}: {
	points: number;
	highscore: number;
	totalPoints: number;
	dispatch: Function;
}) => {
	const resultPercantage = Math.ceil((points / totalPoints) * 100);
	return (
		<div className="resultPage">
			{' '}
			<p className='result'>
				You scored <strong>{points}</strong> out of{' '}
				<strong>
					{totalPoints} (<strong> {resultPercantage}% </strong>){' '}
				</strong>
			</p>
			<p className='highscore'>
				(High Score : <strong style={{ color: 'skyblue' }}>{highscore}</strong>{' '}
				)
			</p>
			<button
				className='btn ui-btn'
				onClick={() => {
					dispatch({ type: 'restart' });
				}}>
				Restart !!
			</button>
		</div>
	);
};
