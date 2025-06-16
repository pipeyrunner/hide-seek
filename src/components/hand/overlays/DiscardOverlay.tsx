import { OverlayType } from '@site/src/core/overlay';
import React from 'react';
import Overlay from '../../Overlay';
import CardDisplay from '../../CardDisplay';
import CardButton from '../../CardButton';
import { DeckCard } from '@site/src/core/deck';

type DiscardOverlayProps = {
	currentOverlay: OverlayType;
	setCurrentOverlay: (overlay: OverlayType) => void;
	discardCount: number;
	setDiscardCount: (count: number) => void;
	discardOptions: DeckCard[];
	setDiscardOptions: (cards: DeckCard[]) => void;
	discardSelection: DeckCard[];
	setDiscardSelection: (cards: DeckCard[]) => void;
	hand: DeckCard[];
	setHand: (cards: DeckCard[]) => void;
};

function DiscardOverlay({
	currentOverlay,
	setCurrentOverlay,
	discardCount,
	setDiscardCount,
	discardOptions,
	setDiscardOptions,
	discardSelection,
	setDiscardSelection,
	hand,
	setHand,
}: DiscardOverlayProps) {
	return (
		<Overlay visible={currentOverlay === OverlayType.DISCARD}>
			{discardOptions.length !== discardCount && (
				<h2
					style={{
						color: 'white',
						fontFamily: 'VAG Rounded Next, sans-serif',
					}}
				>
					Выберите {discardCount} карту{discardCount > 1 ? 's' : ''} для сброса.
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
				{discardOptions.map((card, i) => (
					<div
						key={i}
						style={{
							width: 120 * 1.5,
							height: 168 * 1.5,
							perspective: 1000,
						}}
					>
						<CardDisplay
							card={card.file}
							onClick={() => {
								if (currentOverlay !== OverlayType.DISCARD) return;
								if (discardOptions.length === discardCount) return;
								if (discardSelection.includes(card)) {
									setDiscardSelection(
										discardSelection.filter((c) => c.id !== card.id)
									);
								} else if (discardSelection.length < discardCount) {
									setDiscardSelection([...discardSelection, card]);
								} else {
									// remove the first selected card if max is reached
									setDiscardSelection([...discardSelection.slice(1), card]);
								}
							}}
							style={{
								transform:
									discardOptions.length === discardCount
										? ''
										: `translateY(${
												discardSelection.includes(card) ? -10 : 0
										  }px)`,
								left: '0%',
								borderRadius: 8,
								boxShadow: discardSelection.includes(card)
									? '0 0 0 5px #ff3b3b'
									: 'none',
								transition: '0.6s ease',
								cursor:
									discardOptions.length === discardCount
										? 'default'
										: 'pointer',
							}}
						/>
					</div>
				))}
			</div>

			<CardButton
				title={
					discardSelection.length !== discardCount
						? `Выберите ${discardCount - discardSelection.length} больше карт${
								discardCount - discardSelection.length > 1 ? 'S' : ''
						  }`
						: `Сбросить ${discardCount} карту${discardCount > 1 ? 'S' : ''}`
				}
				disabled={discardSelection.length !== discardCount}
				backgroundColor={'#ff3b3b'}
				onClick={() => {
					if (currentOverlay !== OverlayType.DISCARD) return;
					if (discardCount < 1) return;
					let s = discardSelection.map((card) => card);
					let newHand = [];

					for (let card of hand) {
						let kept = true;
						for (let c of s) {
							if (card.id === c.id) kept = false;
						}
						if (kept) newHand.push(card);
					}

					setHand(newHand);

					setDiscardSelection([]);
					setDiscardCount(0);
					setDiscardOptions([]);
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

export default DiscardOverlay;
