import { QuestionOptions } from './QuestionOptions';

interface QuestionsType {
	correctOption: number;
	options: string[];
	points: number;
	question: string;
}

export const Question = ({
	currentQuestion,
	dispatch,
	answer,
}: {
	currentQuestion: QuestionsType;
	dispatch: Function;
	answer: number | null;
}) => {
	const { correctOption, options, question } = currentQuestion;
	return (
		<div>
			<h4>{question}</h4>
			<QuestionOptions
				options={options}
				correctOption={correctOption}
				dispatch={dispatch}
				answer={answer}
			/>

		</div>
	);
};
