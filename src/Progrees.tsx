export const Progrees = ({
	currentQuestion,
	totalPoints,
	questionNum,
	points,
  answer,
}: {
	totalPoints: number;
	currentQuestion: number;
	questionNum: number;
	points: number;
	answer:number|null;
}) => {
	return (
		<header className='progress'>
			<progress
				max={questionNum}
				value={Number(answer !== null) + currentQuestion}></progress>
				<p>
					Question <strong>{currentQuestion + 1}</strong> / {questionNum}
				</p>
				<p>
					<strong>{points}</strong> / {totalPoints} Points
				</p>
		</header>
	);
};
