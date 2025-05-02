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
				Are you sure you want to reset the game? This will discard all cards in
				your hand and reset the deck.
			</h2>
			<CardButton
				title={'YES, RESET'}
				backgroundColor={'#ff3b3b'}
				onClick={() => {
					if (currentOverlay !== OverlayType.RESET_CONFIRM) return;
					localStorage.removeItem('gameState');
					window.location.reload();
				}}
				style={{
					marginTop: '2rem',
					width: 250,
				}}
			/>
			<CardButton
				title={'NO, CANCEL'}
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
