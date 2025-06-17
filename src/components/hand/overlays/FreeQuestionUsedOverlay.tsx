import { OverlayType } from '@site/src/core/overlay';
import React from 'react';
import Overlay from '../../Overlay';
import CardButton from '../../CardButton';

type FreeQuestionUsedOverlayProps = {
	currentOverlay: OverlayType;
	setCurrentOverlay: (overlay: OverlayType) => void;
};

function FreeQuestionUsedOverlay({
	currentOverlay,
	setCurrentOverlay,
}: FreeQuestionUsedOverlayProps) {
	return (
		<Overlay visible={currentOverlay === OverlayType.FREE_QUESTION_USED}>
			<h2
				style={{
					color: 'white',
					fontFamily: 'VAG Rounded Next, sans-serif',
				}}
			>
				Из-за Проклятья Легковерного Покупателя ты не получил награды за этот вопрос.
			</h2>
			<CardButton
				title={'Понял'}
				backgroundColor={'#ff3b3b'}
				onClick={() => {
					if (currentOverlay !== OverlayType.FREE_QUESTION_USED) return;
					setCurrentOverlay(OverlayType.NONE);
				}}
				style={{
					marginTop: '2rem',
					width: 250,
				}}
			/>
		</Overlay>
	);
}

export default FreeQuestionUsedOverlay;
