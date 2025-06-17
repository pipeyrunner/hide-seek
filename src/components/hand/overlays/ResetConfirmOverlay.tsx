import { OverlayType } from '@site/src/core/overlay';
import React from 'react';
import Overlay from '../../Overlay';
import CardButton from '../../CardButton';

type ResetConfirmOverlayProps = {
	currentOverlay: OverlayType;
	setCurrentOverlay: (overlay: OverlayType) => void;
};

function ResetConfirmOverlay({
	currentOverlay,
	setCurrentOverlay,
}: ResetConfirmOverlayProps) {
	return (
		<Overlay visible={currentOverlay === OverlayType.RESET_CONFIRM}>
			<h2
				style={{
					color: 'white',
					fontFamily: 'VAG Rounded Next, sans-serif',
				}}
			>
				Ты уверен что хочешь сбросить прогресс? Это удалит все карты из твоей руки и обнулит колоду. Этот процесс необратим.
			</h2>
			<CardButton
				title={'Да, сбросить'}
				backgroundColor={'#ff3b3b'}
				onClick={() => {
					if (currentOverlay !== OverlayType.RESET_CONFIRM) return;

					if (typeof window === 'undefined') return;
					localStorage.removeItem('gameState');
					window.location.reload();
				}}
				style={{
					marginTop: '2rem',
					width: 250,
				}}
			/>
			<CardButton
				title={'Нет, отменить'}
				backgroundColor={'#202b39'}
				onClick={() => {
					if (currentOverlay !== OverlayType.RESET_CONFIRM) return;
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

export default ResetConfirmOverlay;
