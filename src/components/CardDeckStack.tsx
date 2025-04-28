import React, { forwardRef } from 'react';
import Overlay from './Overlay';
import CardButton from './CardButton';

type CardDeckStackProps = {
	count: number;
	onDraw: (drawCount: number, maxSelection: number) => void;
	setBlurred: (blurred: boolean) => void;
	overFlowingChaliceRounds: number;
	freeQuestions: number;
	setOverFlowingChaliceRounds: (rounds: number) => void;
	setFreeQuestions: (questions: number) => void;
	setFreeQuestionUsed: (used: boolean) => void;
};

const questionTypes = [
	{
		title: 'MATCHING',
		color: '#202b39',
		drawn: 3,
		maxSelection: 1,
	},
	{
		title: 'MEASURING',
		color: '#4a9a5e',
		drawn: 3,
		maxSelection: 1,
	},
	{
		title: 'RADAR',
		color: '#f56d3e',
		drawn: 2,
		maxSelection: 1,
	},
	{
		title: 'THERMOMETER',
		color: '#feb846',
		drawn: 2,
		maxSelection: 1,
	},
	{
		title: 'TENTACLES',
		color: '#8969a6',
		drawn: 4,
		maxSelection: 2,
	},
	{
		title: 'PHOTO',
		color: '#80b2c6',
		drawn: 1,
		maxSelection: 1,
	},
];

const CardDeckStack = forwardRef<HTMLDivElement, CardDeckStackProps>(
	(
		{
			count,
			onDraw,
			setBlurred,
			overFlowingChaliceRounds,
			setOverFlowingChaliceRounds,
			freeQuestions,
			setFreeQuestions,
			setFreeQuestionUsed,
		},
		ref
	) => {
		const [showOptions, setShowOptions] = React.useState(false);
		const [selectingQuestion, setSelectingQuestion] = React.useState(false);
		const visibleCards = Math.min(count, 10);

		return (
			<div style={{ textAlign: 'center' }}>
				<div
					ref={ref}
					style={{
						position: 'relative',
						width: 180 * 0.6,
						height: 252 * 0.6,
						cursor: count > 0 ? 'pointer' : 'default',
						margin: 'auto',
					}}
					onClick={() => {
						setShowOptions((prev) => !prev);
						setSelectingQuestion(true);
						setBlurred(true);
					}}
				>
					{Array.from({ length: visibleCards }).map((_, i) => (
						<img
							key={i}
							src='/img/cards/card_back.png'
							alt='Card Back'
							style={{
								position: 'absolute',
								bottom: i * 2,
								left: i * 1,
								width: 250 * 0.6,
								height: 252 * 0.6,
								objectFit: 'cover',
								borderRadius: 8,
								boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
								zIndex: i,
							}}
						/>
					))}
				</div>

				<Overlay visible={selectingQuestion}>
					<h2
						style={{
							color: 'white',
							fontFamily: 'VAG Rounded Next, sans-serif',
						}}
					>
						Which type of question did you answer?
					</h2>

					<div
						style={{
							marginTop: '1rem',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1fr 1fr',
								gap: '1rem',
							}}
						>
							{questionTypes.map((question, index) => (
								<CardButton
									key={index}
									title={question.title}
									backgroundColor={question.color}
									onClick={() => {
										setSelectingQuestion(false);
										if (freeQuestions > 0) {
											setFreeQuestions(freeQuestions - 1);
											setFreeQuestionUsed(true);
											return;
										}

										setTimeout(() => {
											if (overFlowingChaliceRounds > 0) {
												setOverFlowingChaliceRounds(
													overFlowingChaliceRounds - 1
												);
											}
											onDraw(
												question.drawn + (overFlowingChaliceRounds > 0 ? 1 : 0),
												question.maxSelection
											);
										}, 500);
									}}
									style={{
										width: 180, // slightly smaller width to fit grid
									}}
								/>
							))}
						</div>

						<CardButton
							title='CANCEL DRAW'
							backgroundColor='#ff3b3b'
							onClick={() => {
								setSelectingQuestion(false);
								setBlurred(false);
							}}
							style={{
								marginTop: '2rem',
								width: 220,
							}}
						/>
					</div>
				</Overlay>
			</div>
		);
	}
);

export default CardDeckStack;
