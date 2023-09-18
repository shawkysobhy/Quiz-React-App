import { useEffect, useReducer } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import { StartPage } from './StartPage';
import { Question } from './Question';
import { NextButton } from './NextButton';
import { Progrees } from './Progrees';
import { Result } from './Result';

type QuizState = {
	questions: any[];
	//error/loading/ready/active/finished
	status: string;
	currentQuestion: number;
	answer: null | number;
	points: number;
	highscore: number;
};
type Action = {
	type: string;
	payload?: any;
};
const initialStateQuiz: QuizState = {
	questions: [],
	status: 'loading',
	currentQuestion: 0,
	answer: null,
	points: 0,
	highscore: 0,
};
const reducer = (state: QuizState, action: Action) => {
	switch (action.type) {
		case 'dataFetched':
			return {
				...state,
				questions: action.payload || [],
				status: 'ready',
			};
		case 'dataFetchedFailed':
			return {
				...state,
				status: 'error',
			};
		case 'start':
			return {
				...state,
				status: 'active',
			};
		case 'addAnswer':
			const cquestion = state.questions[state.currentQuestion];
			const answer = action.payload;
			const earnedPoints =
				answer === cquestion.correctOption ? cquestion.points : 0;
			const totalPoints = earnedPoints + state.points;
			return {
				...state,
				answer: answer,
				points: totalPoints,
			};
		case 'nextQuestion':
			return {
				...state,
				currentQuestion: state.currentQuestion + 1,
				answer: null,
			};
		case 'finished':
			return {
				...state,
				highscore:
					state.highscore > state.points ? state.highscore : state.points,
				status: 'finished',
			};
		case 'restart':
			return {
				...state,
				points: 0,
				answer: null,
				currentQuestion: 0,
				status: 'active',
			};
		default:
			return {
				...state,
				status: 'error',
			};
	}
};
function App() {
	const [
		{ questions, status, currentQuestion, answer, points, highscore },
		dispatch,
	] = useReducer(reducer, initialStateQuiz);

	const questionNum = questions.length;
	const totalPoints = questions.reduce(
		(acc: number, curr: any) => acc + curr['points'],
		0
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					'https://questions-react-quiz-default-rtdb.firebaseio.com/questions.json'
				);
				if (!response.ok) throw new Error('error');
				const data = await response.json();
				dispatch({ type: 'dataFetched', payload: data });
				console.log(data);
			} catch (error) {
				dispatch({ type: 'dataFetchedFailed' });

				console.log(error);
			}
		};
		fetchData();
	}, []);

	return (
		<div className='app'>
			<Header />
			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <ErrorMessage />}
				{status === 'ready' && (
					<StartPage questionNum={questionNum} dispatch={dispatch} />
				)}
				{status === 'finished' && (
					<Result
						dispatch={dispatch}
						points={points}
						totalPoints={totalPoints}
						highscore={highscore}
					/>
				)}
				{status === 'active' && (
					<>
						<Progrees
							totalPoints={totalPoints}
							currentQuestion={currentQuestion}
							questionNum={questionNum}
							points={points}
							answer={answer}
						/>
						<Question
							currentQuestion={questions[currentQuestion]}
							dispatch={dispatch}
							answer={answer}
						/>
						<NextButton
							dispatch={dispatch}
							answer={answer}
							currentQuestion={currentQuestion}
							questionNum={questionNum}
						/>
					</>
				)}
			</Main>
		</div>
	);
}

export default App;
