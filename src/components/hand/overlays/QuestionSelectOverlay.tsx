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

import React from 'react';
import Overlay from '../../Overlay';
import { OverlayType } from '@site/src/core/overlay';
import CardButton from '../../CardButton';

type QuestionSelectOverlayProps = {
	currentOverlay: OverlayType;
	setCurrentOverlay: (overlay: OverlayType) => void;
	freeQuestions: number;
	setFreeQuestions: (questions: number) => void;
	onDraw: (drawCount: number, maxSelection: number) => void;
	overFlowingChaliceRounds: number;
	setOverFlowingChaliceRounds: (rounds: number) => void;
};

function QuestionSelectOverlay({
	currentOverlay,
	setCurrentOverlay,
	freeQuestions,
	setFreeQuestions,
	onDraw,
	overFlowingChaliceRounds,
	setOverFlowingChaliceRounds,
}: QuestionSelectOverlayProps) {
	return (
		<Overlay visible={currentOverlay === OverlayType.QUESTION_SELECT}>
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
								if (freeQuestions > 0) {
									setFreeQuestions(freeQuestions - 1);
									setCurrentOverlay(OverlayType.FREE_QUESTION_USED);
									return;
								}

								setTimeout(() => {
									if (overFlowingChaliceRounds > 0) {
										setOverFlowingChaliceRounds(overFlowingChaliceRounds - 1);
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
						setCurrentOverlay(OverlayType.NONE);
					}}
					style={{
						marginTop: '2rem',
						width: 220,
					}}
				/>
			</div>
		</Overlay>
	);
}

export default QuestionSelectOverlay;
