import { OverlayType } from '@site/src/core/overlay';
import React from 'react';
import Overlay from '../../Overlay';
import CardDisplay from '../../CardDisplay';
import CardButton from '../../CardButton';
import { DeckCard } from '@site/src/core/deck';
import { v4 as uuidv4 } from 'uuid';

type DuplicatingOverlayProps = {
	currentOverlay: OverlayType;
	setCurrentOverlay: (overlay: OverlayType) => void;
	duplicateSelection: DeckCard | null;
	setDuplicateSelection: (card: DeckCard | null) => void;
	hand: DeckCard[];
	setHand: (cards: DeckCard[]) => void;
};

function DuplicatingOverlay({
	currentOverlay,
	setCurrentOverlay,
	duplicateSelection,
	setDuplicateSelection,
	hand,
	setHand,
}: DuplicatingOverlayProps) {
	return (
		<Overlay visible={currentOverlay === OverlayType.DUPLICATING}>
			<h2
				style={{
					color: 'white',
					fontFamily: 'VAG Rounded Next, sans-serif',
				}}
			>
				Выбери карту для копирования
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
							height: 168 * 1.5,
							perspective: 1000,
						}}
					>
						<CardDisplay
							card={card.file}
							onClick={() => {
								if (currentOverlay !== OverlayType.DUPLICATING) return;
								setDuplicateSelection(card);
							}}
							style={{
								transform: `translateY(${
									duplicateSelection !== null &&
									duplicateSelection!.id == card.id
										? -10
										: 0
								}px)`,
								left: '0%',
								borderRadius: 8,
								boxShadow:
									duplicateSelection !== null &&
									duplicateSelection!.id == card.id
										? '0 0 0 5px #ff3b3b'
										: 'none',
								transition: '0.6s ease',
							}}
						/>
					</div>
				))}
			</div>

			<CardButton
				title={duplicateSelection === null ? `Выбери карту` : `Скопировать карту`}
				disabled={duplicateSelection === null}
				backgroundColor={'#ff3b3b'}
				onClick={() => {
					if (currentOverlay !== OverlayType.DUPLICATING) return;
					let newCard = duplicateSelection!;
					newCard = { ...newCard, id: uuidv4() };

					setHand([...hand, newCard]);

					setDuplicateSelection(null);
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

export default DuplicatingOverlay;
