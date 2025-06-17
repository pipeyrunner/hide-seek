import { OverlayType } from '@site/src/core/overlay';
import React from 'react';
import Overlay from '../../Overlay';
import CardButton from '../../CardButton';
import { DeckCard } from '@site/src/core/deck';
import { shareCardImage } from '@site/src/core/sharing';
import CardDisplay from '../../CardDisplay';

type ShareCardOverlayProps = {
	currentOverlay: OverlayType;
	setCurrentOverlay: (overlay: OverlayType) => void;
	sharedCard: DeckCard[];
	setSharedCard: (card: DeckCard[]) => void;
};

function ShareCardOverlay({
	currentOverlay,
	setCurrentOverlay,
	sharedCard,
	setSharedCard,
}: ShareCardOverlayProps) {
	return (
		<Overlay visible={currentOverlay === OverlayType.SHARE_CARD}>
			<h2
				style={{
					color: 'white',
					fontFamily: 'VAG Rounded Next, sans-serif',
				}}
			>
				Отправить эту карту ищейкам.
				<br />
				Убедись что ты предоставил ищейкам всю информацию необходимую для розыгрыша этой карты.
			</h2>

			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '1rem',
					marginTop: '1rem',
					justifyContent: 'center',
				}}
			>
				<div
					style={{
						width: 120 * 2,
						height: (168 + 90) * 2,
						perspective: 1000,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'flex-start',
						gap: '0.75rem',
					}}
				>
					<div
						style={{
							width: '100%',
							height: 168 * 2,
							position: 'relative',
							display: 'flex',
							flexDirection: 'row',
						}}
					>
						<CardDisplay
							card={sharedCard.length > 0 ? sharedCard[0].file : 'card_back'}
							style={{ marginTop: '1rem' }}
						/>
					</div>

					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '0.5rem',
							width: '80%',
							marginTop: '0.5rem',
						}}
					>
						<CardButton
							title={'Поделиться картой'}
							backgroundColor={'#ff3b3b'}
							onClick={() => {
								if (currentOverlay !== OverlayType.SHARE_CARD) return;
								if (!sharedCard) return;
								shareCardImage(
									sharedCard.length > 0 ? sharedCard[0].file : 'card_back'
								);
							}}
							style={{
								marginTop: '2rem',
								width: 250,
								marginLeft: '-14%',
							}}
						/>
						<CardButton
							title={'Закрыть'}
							backgroundColor={'#202b39'}
							onClick={() => {
								if (currentOverlay !== OverlayType.SHARE_CARD) return;
								setCurrentOverlay(OverlayType.NONE);
								let newSharedCards: DeckCard[] = sharedCard;
								newSharedCards = newSharedCards.filter(
									(card) => card !== sharedCard[0]
								);
								setSharedCard(newSharedCards);
							}}
							style={{
								marginTop: '2rem',
								width: 250,
								marginLeft: '-14%',
							}}
						/>
					</div>
				</div>
			</div>
		</Overlay>
	);
}

export default ShareCardOverlay;
