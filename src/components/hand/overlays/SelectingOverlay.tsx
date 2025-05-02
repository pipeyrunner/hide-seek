import React, { useEffect } from 'react';
import CardButton from '../../CardButton';
import CardDisplay from '../../CardDisplay';
import Overlay from '../../Overlay';
import { OverlayType } from '@site/src/core/overlay';
import { DeckCard } from '@site/src/core/deck';

type SelectingOverlayProps = {
	currentOverlay: OverlayType;
	setCurrentOverlay: (overlay: OverlayType) => void;
	drawn: DeckCard[];
	setDrawn: (cards: DeckCard[]) => void;
	maxSelectedCards: number;
	setMaxSelectedCards: (cards: number) => void;
	hand: DeckCard[];
	setHand: (cards: DeckCard[]) => void;
	flipped: DeckCard[];
	setFlipped: (cards: DeckCard[]) => void;
	selectedCards: DeckCard[];
	setSelectedCards: (cards: DeckCard[]) => void;
	pendingDraw: { cards: number; maxSelection: number } | null;
	setPendingDraw: (
		draw: { cards: number; maxSelection: number } | null
	) => void;
	discardPendingDraw: { cards: number; maxSelection: number } | null;
	setDiscardPendingDraw: (
		draw: { cards: number; maxSelection: number } | null
	) => void;
};

function SelectingOverlay({
	currentOverlay,
	setCurrentOverlay,
	drawn,
	setDrawn,
	maxSelectedCards,
	setMaxSelectedCards,
	hand,
	setHand,
	flipped,
	setFlipped,
	selectedCards,
	setSelectedCards,
	pendingDraw,
	setPendingDraw,
	discardPendingDraw,
	setDiscardPendingDraw,
}: SelectingOverlayProps) {
	useEffect(() => {
		if (currentOverlay === OverlayType.SELECTING) {
			setSelectedCards([]);
			setFlipped([]);
		}
	}, [currentOverlay, setFlipped, setSelectedCards]);

	return (
		<Overlay visible={currentOverlay === OverlayType.SELECTING}>
			{drawn.length !== maxSelectedCards && (
				<h2
					style={{
						color: 'white',
						fontFamily: 'VAG Rounded Next, sans-serif',
					}}
				>
					Click Cards to Select Them
				</h2>
			)}
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '1rem',
					marginTop: '1rem',
					justifyContent: 'center',
				}}
			>
				{drawn.map((card, i) => (
					<div
						key={i}
						style={{
							width: 120 * 1.5,
							height: 168 * 1.5,
							perspective: 1000,
						}}
					>
						<div
							style={{
								width: '100%',
								height: '100%',
								position: 'relative',
								transformStyle: 'preserve-3d',
								transform:
									(flipped.includes(card)
										? 'rotateY(0deg)'
										: 'rotateY(180deg)') +
									(drawn.length !== maxSelectedCards
										? ` translateY(${selectedCards.includes(card) ? -10 : 0}px)`
										: ''),
								borderRadius: 8,
								boxShadow: selectedCards.includes(card)
									? '0 0 0 5px #ff3b3b'
									: 'none',
								transition: '0.6s ease',
							}}
						>
							<CardDisplay
								card={card.file}
								onClick={() => {
									if (currentOverlay !== OverlayType.SELECTING) return;
									if (drawn.length === maxSelectedCards) return;
									if (selectedCards.includes(card)) {
										setSelectedCards(
											selectedCards.filter((c) => c.id !== card.id)
										);
									} else if (selectedCards.length < maxSelectedCards) {
										setSelectedCards([...selectedCards, card]);
									} else {
										// remove the first selected card if max is reached
										setSelectedCards([...selectedCards.slice(1), card]);
									}
								}}
								style={{
									marginLeft: '-50%',
									cursor:
										drawn.length === maxSelectedCards ? 'default' : 'pointer',
								}}
							/>
							<CardDisplay
								card={'card_back'}
								style={{
									marginLeft: '-50%',
									objectFit: 'cover',
									transform: 'rotateY(180deg)',
								}}
							/>
						</div>
					</div>
				))}
			</div>

			<CardButton
				title={
					selectedCards.length !== maxSelectedCards
						? `SELECT ${maxSelectedCards - selectedCards.length} MORE CARD${
								maxSelectedCards - selectedCards.length > 1 ? 'S' : ''
						  }`
						: `KEEP ${maxSelectedCards} CARD${maxSelectedCards > 1 ? 'S' : ''}`
				}
				disabled={selectedCards.length !== maxSelectedCards}
				backgroundColor={'#ff3b3b'}
				onClick={() => {
					if (currentOverlay !== OverlayType.SELECTING) return;
					let s = selectedCards.map((card) => card);
					setHand([...hand, ...s]);
					setDrawn(drawn.filter((c) => !selectedCards.includes(c)));

					setDrawn([]);
					setCurrentOverlay(OverlayType.NONE);
					setFlipped([]);

					setFlipped([]);
					setSelectedCards([]);
					if (discardPendingDraw) {
						setDiscardPendingDraw(null);
						return;
					}
					setPendingDraw(null);
				}}
				style={{
					marginTop: '2rem',
					width: 250,
				}}
			/>
		</Overlay>
	);
}

export default SelectingOverlay;
