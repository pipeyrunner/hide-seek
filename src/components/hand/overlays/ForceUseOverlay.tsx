import { OverlayType } from '@site/src/core/overlay';
import React from 'react';
import Overlay from '../../Overlay';
import CardDisplay from '../../CardDisplay';
import CardButton from '../../CardButton';
import { DeckCard } from '@site/src/core/deck';

type ForceUseOverlayProps = {
	currentOverlay: OverlayType;
	setCurrentOverlay: (overlay: OverlayType) => void;
	forceUseCards: number;
	setForceUseCards: (cards: number) => void;
	hand: DeckCard[];
	setHand: (cards: DeckCard[]) => void;
	useCard: DeckCard | null;
	setUseCard: (card: DeckCard | null) => void;
	showcaseShowCancel: boolean;
	setShowcaseShowCancel: (show: boolean) => void;
};

function ForceUseOverlay({
	currentOverlay,
	setCurrentOverlay,
	forceUseCards,
	setForceUseCards,
	hand,
	setHand,
	useCard,
	setUseCard,
	showcaseShowCancel,
	setShowcaseShowCancel,
}: ForceUseOverlayProps) {
	return (
		<Overlay visible={currentOverlay === OverlayType.FORCE_USE}>
			<h2
				style={{
					color: 'white',
					fontFamily: 'VAG Rounded Next, sans-serif',
				}}
			>
				Надо использовать или сбросить {forceUseCards} карт{forceUseCards === 1 ? 'у' : forceUseCards > 1 && forceUseCards < 5 ? 'ы' : ''} перед тем, как тянуть новые.
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
				{hand.map((card, i) => (
					<div
						key={i}
						style={{
							width: 120 * 1.5,
							height: (168 + 90) * 1.5, // more height for two vertical buttons
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
								height: 168 * 1.5,
								position: 'relative',
								display: 'flex',
								flexDirection: 'row',
							}}
						>
							{/* Front (actual card) */}
							<CardDisplay card={card.file} />
						</div>

						{/* Buttons stacked vertically */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '0.5rem',
								width: '80%', // slightly narrower than the card
								marginTop: '0.5rem',
							}}
						>
							<CardButton
								title={'Использовать'}
								backgroundColor={'#202b39'}
								onClick={() => {
									if (currentOverlay !== OverlayType.FORCE_USE) return;

									setUseCard(card);
									setShowcaseShowCancel(false);
									setCurrentOverlay(OverlayType.USE_CARD);
								}}
								disabled={
									card.file.includes('time_bonus_') && !card.canUse(hand)
								}
							/>
							<CardButton
								title={'Сбросить'}
								backgroundColor={'#ff3b3b'}
								onClick={() => {
									if (currentOverlay !== OverlayType.FORCE_USE) return;
									setHand(hand.filter((_, index) => index !== i));
									setForceUseCards(forceUseCards - 1);
								}}
							/>
						</div>
					</div>
				))}
			</div>
		</Overlay>
	);
}

export default ForceUseOverlay;
