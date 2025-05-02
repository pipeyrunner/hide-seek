import { OverlayType } from '@site/src/core/overlay';
import React from 'react';
import Overlay from '../../Overlay';
import CardDisplay from '../../CardDisplay';
import CardButton from '../../CardButton';
import { DeckCard, getUseText } from '@site/src/core/deck';
import { canBeShared } from '@site/src/core/sharing';

type UseCardOverlayProps = {
	currentOverlay: OverlayType;
	setCurrentOverlay: (overlay: OverlayType) => void;
	useCard: DeckCard | null;
	setUseCard: (card: DeckCard | null) => void;
	hand: DeckCard[];
	setHand: (cards: DeckCard[]) => void;
	discardCount: number;
	setDiscardCount: (count: number) => void;
	discardOptions: DeckCard[];
	setDiscardOptions: (cards: DeckCard[]) => void;
	discardSelection: DeckCard[];
	setDiscardSelection: (cards: DeckCard[]) => void;
	pendingDraw: { cards: number; maxSelection: number } | null;
	setPendingDraw: (
		draw: { cards: number; maxSelection: number } | null
	) => void;

	discardPendingDraw: { cards: number; maxSelection: number } | null;
	setDiscardPendingDraw: (
		draw: { cards: number; maxSelection: number } | null
	) => void;
	handSize: number;
	setHandSize: (size: number) => void;
	duplicateSelection: DeckCard | null;
	setDuplicateSelection: (card: DeckCard | null) => void;
	overflowingChaliceRounds: number;
	setOverflowingChaliceRounds: (rounds: number) => void;
	forceUseCards: number;
	setForceUseCards: (cards: number) => void;
	freeQuestions: number;
	setFreeQuestions: (questions: number) => void;
	sharedCard: DeckCard[];
	setSharedCard: (card: DeckCard[]) => void;
	pastUsedCards: DeckCard[];
	setPastUsedCards: (cards: DeckCard[]) => void;
};

function UseCardOverlay({
	currentOverlay,
	setCurrentOverlay,
	useCard,
	setUseCard,
	hand,
	setHand,
	discardCount,
	setDiscardCount,
	discardOptions,
	setDiscardOptions,
	discardSelection,
	setDiscardSelection,
	pendingDraw,
	setPendingDraw,
	discardPendingDraw,
	setDiscardPendingDraw,
	handSize,
	setHandSize,
	duplicateSelection,
	setDuplicateSelection,
	overflowingChaliceRounds,
	setOverflowingChaliceRounds,
	forceUseCards,
	setForceUseCards,
	freeQuestions,
	setFreeQuestions,
	sharedCard,
	setSharedCard,
	pastUsedCards,
	setPastUsedCards,
}: UseCardOverlayProps) {
	return (
		<Overlay visible={currentOverlay === OverlayType.USE_CARD}>
			<h2
				style={{
					color: 'white',
					fontFamily: 'VAG Rounded Next, sans-serif',
				}}
			>
				{useCard === null ? '' : getUseText(useCard)}
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
						<CardDisplay card={useCard == null ? 'card_back' : useCard.file} />
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
							title={'CONFIRM USE'}
							backgroundColor={'#202b39'}
							onClick={() => {
								if (currentOverlay !== OverlayType.USE_CARD) return;
								if (useCard === null) return;

								let newHand = hand.filter((card) => card.id !== useCard.id);
								setHand(newHand);

								switch (useCard.file) {
									case 'powerup_discard_1_draw_2':
										setDiscardCount(1);
										setDiscardOptions(
											hand
												.map((card) => card)
												.filter((c) => c.id !== useCard.id)
										);
										setDiscardSelection([]);
										if (hand.length === 2) {
											setDiscardSelection(
												hand
													.map((card) => card)
													.filter((c) => c.id !== useCard.id)
											);
										}
										setDiscardPendingDraw({ cards: 2, maxSelection: 2 });
										setCurrentOverlay(OverlayType.DISCARD);
										break;
									case 'powerup_discard_2_draw_3':
										setDiscardCount(2);
										setDiscardOptions(
											hand
												.map((card) => card)
												.filter((c) => c.id !== useCard.id)
										);
										setDiscardSelection([]);
										if (hand.length === 3) {
											setDiscardSelection(
												hand
													.map((card) => card)
													.filter((c) => c.id !== useCard.id)
											);
										}
										setCurrentOverlay(OverlayType.DISCARD);
										setDiscardPendingDraw({ cards: 3, maxSelection: 3 });
										break;
									case 'powerup_draw_1_expand_1':
										setHandSize(handSize + 1);
										setDiscardPendingDraw({ cards: 1, maxSelection: 1 });
										break;
									case 'powerup_duplicate_another_card':
										setCurrentOverlay(OverlayType.DUPLICATING);
										setDuplicateSelection(null);
										break;
									case 'curse_egg_partner':
									case 'curse_hidden_hangman':
									case 'curse_jammed_door':
									case 'curse_urban_explorer':
										setDiscardCount(2);
										setDiscardOptions(
											hand
												.map((card) => card)
												.filter((c) => c.id !== useCard.id)
										);
										setDiscardSelection([]);
										if (hand.length === 3) {
											setDiscardSelection(
												hand
													.map((card) => card)
													.filter((c) => c.id !== useCard.id)
											);
										}
										setCurrentOverlay(OverlayType.DISCARD);
										break;
									case 'curse_right_turn':
										setDiscardCount(1);
										setDiscardOptions(
											hand
												.map((card) => card)
												.filter((c) => c.id !== useCard.id)
										);
										setDiscardSelection([]);
										if (hand.length === 2) {
											setDiscardSelection(
												hand
													.map((card) => card)
													.filter((c) => c.id !== useCard.id)
											);
										}
										setCurrentOverlay(OverlayType.DISCARD);
										break;
									case 'curse_overflowing_chalice':
										setOverflowingChaliceRounds(overflowingChaliceRounds + 3);
										setDiscardCount(1);
										setDiscardOptions(
											hand
												.map((card) => card)
												.filter((c) => c.id !== useCard.id)
										);
										setDiscardSelection([]);
										if (hand.length === 2) {
											setDiscardSelection(
												hand
													.map((card) => card)
													.filter((c) => c.id !== useCard.id)
											);
										}
										setCurrentOverlay(OverlayType.DISCARD);
										break;
									case 'curse_lemon_phylactery':
										setDiscardCount(1);
										let tHand = hand.filter((c) => c.file.includes('powerup_'));
										setDiscardOptions(tHand);
										setDiscardSelection([]);
										if (tHand.length === 1) {
											setDiscardSelection(tHand);
										}
										setCurrentOverlay(OverlayType.DISCARD);
										break;
									case 'curse_spotty_memory':
										setDiscardCount(1);
										let jhand = hand.filter((c) =>
											c.file.includes('time_bonus_')
										);
										setDiscardOptions(jhand);
										setDiscardSelection([]);
										if (jhand.length === 1) {
											setDiscardSelection(jhand);
										}
										setCurrentOverlay(OverlayType.DISCARD);
										break;
									case 'powerup_move':
									case 'curse_drained_brain':
										setDiscardCount(hand.length - 1);
										setDiscardOptions(
											hand
												.map((card) => card)
												.filter((c) => c.id !== useCard.id)
										);
										setDiscardSelection([]);
										setDiscardSelection(
											hand
												.map((card) => card)
												.filter((c) => c.id !== useCard.id)
										);
										setCurrentOverlay(OverlayType.DISCARD);
										break;
									case 'curse_impressionable_consumer':
										setFreeQuestions(freeQuestions + 1);
										setCurrentOverlay(OverlayType.NONE);
										break;
									default:
										setCurrentOverlay(OverlayType.NONE);
										break;
								}
								setUseCard(null);
								if (forceUseCards > 0) {
									setForceUseCards(forceUseCards - 1);
								}

								if (canBeShared(useCard.file)) {
									setSharedCard([...sharedCard, useCard]);
								}
								setPastUsedCards([useCard, ...pastUsedCards]);
							}}
							disabled={useCard !== null && !useCard.canUse(hand)}
						/>
						<CardButton
							title={'CANCEL'}
							backgroundColor={'#ff3b3b'}
							onClick={() => {
								if (currentOverlay !== OverlayType.USE_CARD) return;
								setUseCard(null);
								setCurrentOverlay(OverlayType.NONE);
							}}
							style={{
								marginTop: '2rem',
							}}
						/>
					</div>
				</div>
			</div>
		</Overlay>
	);
}

export default UseCardOverlay;
