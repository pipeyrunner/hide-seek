import { OverlayType } from '@site/src/core/overlay';
import React from 'react';
import Overlay from '../../Overlay';
import CardButton from '../../CardButton';
import CardDisplay from '../../CardDisplay';
import { DeckCard } from '@site/src/core/deck';

type ShowcaseOverlayProps = {
	currentOverlay: OverlayType;
	setCurrentOverlay: (overlay: OverlayType) => void;
	showcaseCards: DeckCard[];
	setShowcaseCards: (cards: [DeckCard] | []) => void;
	hand: DeckCard[];
	setHand: (cards: DeckCard[]) => void;
	useCard: DeckCard | null;
	setUseCard: (card: DeckCard | null) => void;
	showcaseShowCancel: boolean;
	setShowcaseShowCancel: (show: boolean) => void;
	selectedCards: DeckCard[];
	setSelectedCards: (cards: DeckCard[]) => void;
};

function ShowcaseOverlay({
	currentOverlay,
	setCurrentOverlay,
	showcaseCards,
	setShowcaseCards,
	hand,
	setHand,
	useCard,
	setUseCard,
	showcaseShowCancel,
	setShowcaseShowCancel,
	selectedCards,
	setSelectedCards,
}: ShowcaseOverlayProps) {
	return (
		<Overlay visible={currentOverlay === OverlayType.SHOWCASE}>
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '1rem',
					marginTop: '1rem',
					justifyContent: 'center',
				}}
			>
				{showcaseCards.map((card, i) => (
					<div
						key={i}
						style={{
							width: 120 * 2,
							height: (168 + 90) * 2, // more height for two vertical buttons
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
								title={'USE'}
								backgroundColor={'#202b39'}
								onClick={() => {
									if (currentOverlay !== OverlayType.SHOWCASE) return;
									setShowcaseCards([]);

									setUseCard(card);
									setShowcaseShowCancel(false);
									setCurrentOverlay(OverlayType.USE_CARD);
								}}
								disabled={card.file.includes('time_bonus_')}
							/>
							<CardButton
								title={'DISCARD'}
								backgroundColor={'#ff3b3b'}
								onClick={() => {
									if (currentOverlay !== OverlayType.SHOWCASE) return;
									let newHand = hand.filter((c) => c.id !== card.id);
									setHand(newHand);

									if (selectedCards.length > 1) {
										setSelectedCards(selectedCards.filter((c) => c !== card));
									} else {
										setCurrentOverlay(OverlayType.NONE);
									}
									setShowcaseShowCancel(false);
								}}
							/>
							{showcaseShowCancel && (
								<CardButton
									title={'CANCEL'}
									backgroundColor={'#202b39'}
									onClick={() => {
										if (currentOverlay !== OverlayType.SHOWCASE) return;
										setShowcaseCards([]);
                                        setSelectedCards([]);
										setCurrentOverlay(OverlayType.NONE);
										setShowcaseShowCancel(false);
									}}
									style={{
										marginTop: '2rem',
									}}
								/>
							)}
						</div>
					</div>
				))}
			</div>
		</Overlay>
	);
}

export default ShowcaseOverlay;
