import { OverlayType } from '@site/src/core/overlay';
import React from 'react';
import Overlay from '../../Overlay';
import CardButton from '../../CardButton';
import { DeckCard } from '@site/src/core/deck';
import CardDisplay from '../../CardDisplay';

type PastUsedCardsOverlayProps = {
	currentOverlay: OverlayType;
	setCurrentOverlay: (overlay: OverlayType) => void;
	pastUsedCards: DeckCard[];
	setPastUsedCards: (cards: DeckCard[]) => void;
};

function PastUsedCardsOverlay({
	currentOverlay,
	setCurrentOverlay,
	pastUsedCards,
	setPastUsedCards,
}: PastUsedCardsOverlayProps) {
	return (
		<Overlay visible={currentOverlay === OverlayType.PAST_USED_CARDS}>
			<h2
				style={{
					color: 'white',
					fontFamily: 'VAG Rounded Next, sans-serif',
				}}
			>
				Past Cards
			</h2>
			<CardButton
				title={'CLOSE'}
				backgroundColor={'#ff3b3b'}
				onClick={() => {
					if (currentOverlay !== OverlayType.PAST_USED_CARDS) return;
					setCurrentOverlay(OverlayType.NONE);
				}}
				style={{
					marginTop: '2rem',
					width: 250,
				}}
			/>

			<section style={{ marginBottom: '1.5rem', marginTop: '1.5rem' }}>
				<div className='card-gallery'>
					{pastUsedCards.map((card, i) => (
						<div
							className={`card-item`}
							key={i}
							style={{
								position: 'relative',
								animationDelay: `${i * 60}ms`,
							}}
						>
							<img
								src={`/img/cards/${card.file}.png`}
								alt=''
								className='card-image'
							/>
						</div>
					))}
				</div>
			</section>
		</Overlay>
	);
}

export default PastUsedCardsOverlay;
