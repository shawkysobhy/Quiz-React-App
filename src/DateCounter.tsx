import { ChangeEvent, useReducer } from 'react';

const initailState: initailStatInterface = { count: 0, step: 1 };
interface initailStatInterface {
	count: number;
	step: number;
}
type Action = {
	type: 'INC' | 'DEC' | 'ADD' | 'RESET' | 'SetStep' | 'SetCount';
	payload?: any;
};
const reducer = (state: initailStatInterface, action: Action) => {
	switch (action.type) {
		case 'INC':
			return { ...state, count: state.count + state.step };
		case 'DEC':
			return { ...state, count: state.count - state.step };
		case 'ADD':
			return { count: state.count, step: state.step };
		case 'RESET':
			return initailState;
		case 'SetStep':
			return { ...state, step: action.payload };
		case 'SetCount':
			return { ...state, count: action.payload };

		default:
			return state;
	}
};
function DateCounter() {
	const [state, dispatch] = useReducer(reducer, initailState);
	const date = new Date('june 21 2027');
	date.setDate(date.getDate() + state.count);
	const dec = function () {
		let val = state.count - state.step;
		dispatch({ type: 'INC', payload: val });
	};
	const inc = function () {
		let val = state.count + state.step;
		dispatch({ type: 'INC', payload: val });
	};

	const SetCount = function (e: ChangeEvent<HTMLInputElement>) {
		dispatch({type:"SetCount",payload:Number(e.target.value)});
	};
	const SetStep = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SetStep', payload: Number(e.target?.value) });
	};

	const reset = function () {
		dispatch({type:'RESET'})
	};

	return (
		<div className='counter'>
			<div>
				<input
					type='range'
					min='0'
					max='10'
					value={state.step}
					onChange={SetStep}
				/>
				<span>{state.step}</span>
			</div>
			<div>
				<button onClick={dec}>-</button>
				<input value={state.count} onChange={SetCount} />
				<button onClick={inc}>+</button>
			</div>
			<p>{date.toDateString()}</p>
			<div>
				<button onClick={reset}>Reset</button>
			</div>
		</div>
	);
}
export default DateCounter;
