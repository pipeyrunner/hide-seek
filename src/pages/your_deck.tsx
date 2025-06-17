import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import CardDeckStack from '../components/CardDeckStack';
import {
	cardDefinitions,
	DeckCard,
	DeckCardData,
	deserializeDeck,
	getDeck,
	serializeDeck,
} from '../core/deck';
import { OverlayType } from '../core/overlay';
import QuestionSelectOverlay from '../components/hand/overlays/QuestionSelectOverlay';
import SelectingOverlay from '../components/hand/overlays/SelectingOverlay';
import ForceUseOverlay from '../components/hand/overlays/ForceUseOverlay';
import FreeQuestionUsedOverlay from '../components/hand/overlays/FreeQuestionUsedOverlay';
import DuplicatingOverlay from '../components/hand/overlays/DuplicatingOverlay';
import DiscardOverlay from '../components/hand/overlays/DiscardOverlay';
import ShowcaseOverlay from '../components/hand/overlays/ShowcaseOverlay';
import UseCardOverlay from '../components/hand/overlays/UseCardOverlay';
import ResetConfirmOverlay from '../components/hand/overlays/ResetConfirmOverlay';
import ShareCardOverlay from '../components/hand/overlays/ShareCardOverlay';
import PastUsedCardsOverlay from '../components/hand/overlays/PastUsedCardsOverlay';

const saveGameState = (state: {
	deck: DeckCardData[];
	hand: DeckCardData[];
	handSize: number;
	freeQuestions: number;
	overflowingChaliceRounds: number;
	pastUsedCards: DeckCardData[];
}) => {
	if (typeof window === 'undefined') return;
	console.log('Saving game state', state);
	localStorage.setItem('gameState', JSON.stringify(state));
};

const loadGameState = (): Partial<{
	deck: DeckCardData[];
	hand: DeckCardData[];
	handSize: number;
	freeQuestions: number;
	overflowingChaliceRounds: number;
	pastUsedCards: DeckCardData[];
}> => {
	if (typeof window === 'undefined')
		return {
			deck: [],
			hand: [],
			handSize: 6,
			freeQuestions: 0,
			overflowingChaliceRounds: 0,
			pastUsedCards: [],
		};
	const stored = localStorage.getItem('gameState');
	if (!stored) return {};
	try {
		return JSON.parse(stored);
	} catch {
		return {};
	}
};

export default function YourDeckPage() {
	const gameState = loadGameState();

	const [deck, setDeck] = useState(
		deserializeDeck(gameState.deck) ?? getDeck()
	);
	const [hand, setHand] = useState<DeckCard[]>(
		deserializeDeck(gameState.hand) ?? []
	);
	const [drawn, setDrawn] = useState<DeckCard[]>([]);
	const [flipped, setFlipped] = useState<DeckCard[]>([]);
	const [selectedCards, setSelectedCards] = useState<DeckCard[]>([]);
	const [maxSelectedCards, setMaxSelectedCards] = useState(3);
	const [blurred, setBlurred] = useState(false);
	const [handSize, setHandSize] = useState(gameState.handSize ?? 6);
	const [forceUseCards, setForceUseCards] = useState(0);
	const [pendingDraw, setPendingDraw] = useState<null | {
		cards: number;
		maxSelection: number;
	}>(null);
	const [discardPendingDraw, setDiscardPendingDraw] = useState<null | {
		cards: number;
		maxSelection: number;
	}>(null);
	const [showcaseCards, setShowcaseCards] = useState<[DeckCard] | []>([]);
	const [showcaseShowCancel, setShowcaseShowCancel] = useState(false);
	const [useCard, setUseCard] = useState<DeckCard | null>(null);

	const [discardOptions, setDiscardOptions] = useState<DeckCard[]>([]);
	const [discardCount, setDiscardCount] = useState(0);
	const [discardSelection, setDiscardSelection] = useState<DeckCard[]>([]);

	const [duplicateSelection, setDuplicateSelection] = useState<DeckCard | null>(
		null
	);

	const [freeQuestions, setFreeQuestions] = useState(
		gameState.freeQuestions ?? 0
	);
	const [overflowingChaliceRounds, setOverflowingChaliceRounds] = useState(
		gameState.overflowingChaliceRounds ?? 0
	);

	const [currentOverlay, setCurrentOverlay] = useState<OverlayType>(
		OverlayType.NONE
	);

	const [sharedCards, setSharedCards] = useState<DeckCard[]>([]);
	const [pastUsedCards, setPastUsedCards] = useState<DeckCard[]>(
		deserializeDeck(gameState.pastUsedCards) ?? []
	);

	const handleDraw = (cards: number, maxSelection: number) => {
		setPendingDraw({ cards, maxSelection });
	};

	const doDraw = (cards: number, maxSelection: number) => {
		const actual = Math.min(cards, deck.length);
		setMaxSelectedCards(maxSelection);
		const drawnNow = deck.slice(0, actual);
		setDrawn(drawnNow);
		setDeck(deck.slice(actual));
		setCurrentOverlay(OverlayType.SELECTING);

		// Flip cards after short delay
		setTimeout(() => {
			setFlipped(drawnNow);

			if (cards == maxSelection) {
				setSelectedCards(drawnNow);
			}
		}, 200);
	};

	useEffect(() => {
		const images = new Set<string>();

		// Go through every card
		for (const { file } of cardDefinitions) {
			images.add(`/img/cards/${file}.png`);
		}

		// Add the card back too
		images.add('/img/cards/card_back.png');

		// Preload each image
		images.forEach((src) => {
			const img = new Image();
			img.src = src;
		});
	}, []);

	useEffect(() => {
		if (currentOverlay === OverlayType.DUPLICATING) return;
		if (currentOverlay === OverlayType.FREE_QUESTION_USED) return;
		if (discardPendingDraw && discardCount === 0) {
			const { cards, maxSelection } = discardPendingDraw;
			doDraw(cards, maxSelection);
			return;
		}

		if (pendingDraw && forceUseCards > 0 && discardCount === 0) {
			setCurrentOverlay(OverlayType.FORCE_USE);
			return;
		}

		if (discardCount > 0) {
			setCurrentOverlay(OverlayType.DISCARD);
			return;
		}
		if (pendingDraw && forceUseCards === 0) {
			const { cards, maxSelection } = pendingDraw;
			if (maxSelection + hand.length > handSize) {
				setForceUseCards(maxSelection + hand.length - handSize);
				setCurrentOverlay(OverlayType.FORCE_USE);
				return;
			}
			doDraw(cards, maxSelection);
			return;
		}

		if (sharedCards.length < 1) return;
		setCurrentOverlay(OverlayType.SHARE_CARD);
	}, [
		forceUseCards,
		pendingDraw,
		discardPendingDraw,
		discardCount,
		hand,
		handSize,
		sharedCards,
		// currentOverlay,
	]);

	useEffect(() => {
		setBlurred(currentOverlay !== OverlayType.NONE);
	}, [currentOverlay]);

	useEffect(() => {
		saveGameState({
			deck: serializeDeck(deck),
			hand: serializeDeck(hand),
			handSize,
			freeQuestions,
			overflowingChaliceRounds,
			pastUsedCards: serializeDeck(pastUsedCards),
		});
	}, [
		deck,
		hand,
		handSize,
		freeQuestions,
		overflowingChaliceRounds,
		pastUsedCards,
	]);

	return (
		<Layout title='Ваша рука' description='Возьмите карты из колоды'>
			<main
				className='container'
				style={{
					maxWidth: 900,
					textAlign: 'center',
					position: 'relative',
				}}
			>
				<div
					style={{
						backdropFilter: blurred ? 'blur(8px)' : 'none',
						transition: '0.3s ease-out',
						position: 'fixed',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						background: 'rgba(0, 0, 0, 0.5)',
						zIndex: 100,
						opacity: blurred ? 1 : 0,
						pointerEvents: 'none',
					}}
				></div>

				<div
					className='investigation-nav'
					style={{
						marginBottom: '3rem',
					}}
				>
					<div className='investigation-nav-tabs'>
						<button
							className={`nav-tab`}
							onClick={() => setCurrentOverlay(OverlayType.PAST_USED_CARDS)}
							style={{ float: 'left' }}
						>
							Прошлые карты
						</button>
					</div>
					<div className='investigation-nav-divider' />
					<button
						className='nav-reset'
						onClick={() => setCurrentOverlay(OverlayType.RESET_CONFIRM)}
					>
						Сбросить игру
					</button>
				</div>

				<CardDeckStack
					count={deck.length}
					setCurrentOverlay={setCurrentOverlay}
				/>

				<h2 style={{ marginTop: '2rem' }}>Your Hand</h2>
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'center',
						gap: '0.75rem',
					}}
				>
					{hand.map((card, i) => (
						<img
							key={i}
							src={`/img/cards/${card.file}.png`}
							alt={card.id}
							style={{
								width: 100 * 1.25,
								height: 140 * 1.25,
								objectFit: 'cover',
								borderRadius: 6,
								border: '1px solid #ccc',
								cursor: 'pointer',
							}}
							onClick={() => {
								setShowcaseCards([card]);
								setCurrentOverlay(OverlayType.SHOWCASE);
								setShowcaseShowCancel(true);
							}}
						/>
					))}
					{/* if hand.length < max hand, place blank cards */}
					{Array.from({ length: handSize - hand.length }).map((_, i) => (
						<img
							key={i}
							src='/img/cards/card_back.png'
							alt='Card back'
							style={{
								width: 100 * 1.25,
								height: 140 * 1.25,
								objectFit: 'cover',
								borderRadius: 6,
								border: '1px solid #ccc',
								opacity: 0.5,
							}}
						/>
					))}
				</div>

				<QuestionSelectOverlay
					currentOverlay={currentOverlay}
					setCurrentOverlay={setCurrentOverlay}
					freeQuestions={freeQuestions}
					setFreeQuestions={setFreeQuestions}
					onDraw={handleDraw}
					overFlowingChaliceRounds={overflowingChaliceRounds}
					setOverFlowingChaliceRounds={setOverflowingChaliceRounds}
				/>

				<SelectingOverlay
					currentOverlay={currentOverlay}
					setCurrentOverlay={setCurrentOverlay}
					drawn={drawn}
					setDrawn={setDrawn}
					maxSelectedCards={maxSelectedCards}
					setMaxSelectedCards={setMaxSelectedCards}
					hand={hand}
					setHand={setHand}
					flipped={flipped}
					setFlipped={setFlipped}
					selectedCards={selectedCards}
					setSelectedCards={setSelectedCards}
					pendingDraw={pendingDraw}
					setPendingDraw={setPendingDraw}
					discardPendingDraw={discardPendingDraw}
					setDiscardPendingDraw={setDiscardPendingDraw}
				/>

				<ForceUseOverlay
					currentOverlay={currentOverlay}
					setCurrentOverlay={setCurrentOverlay}
					forceUseCards={forceUseCards}
					setForceUseCards={setForceUseCards}
					hand={hand}
					setHand={setHand}
					useCard={useCard}
					setUseCard={setUseCard}
					showcaseShowCancel={showcaseShowCancel}
					setShowcaseShowCancel={setShowcaseShowCancel}
				/>

				<ShowcaseOverlay
					currentOverlay={currentOverlay}
					setCurrentOverlay={setCurrentOverlay}
					showcaseCards={showcaseCards}
					setShowcaseCards={setShowcaseCards}
					hand={hand}
					setHand={setHand}
					useCard={useCard}
					setUseCard={setUseCard}
					showcaseShowCancel={showcaseShowCancel}
					setShowcaseShowCancel={setShowcaseShowCancel}
					selectedCards={selectedCards}
					setSelectedCards={setSelectedCards}
				/>

				<UseCardOverlay
					currentOverlay={currentOverlay}
					setCurrentOverlay={setCurrentOverlay}
					useCard={useCard}
					setUseCard={setUseCard}
					hand={hand}
					setHand={setHand}
					discardCount={discardCount}
					setDiscardCount={setDiscardCount}
					discardOptions={discardOptions}
					setDiscardOptions={setDiscardOptions}
					discardSelection={discardSelection}
					setDiscardSelection={setDiscardSelection}
					pendingDraw={pendingDraw}
					setPendingDraw={setPendingDraw}
					discardPendingDraw={discardPendingDraw}
					setDiscardPendingDraw={setDiscardPendingDraw}
					handSize={handSize}
					setHandSize={setHandSize}
					duplicateSelection={duplicateSelection}
					setDuplicateSelection={setDuplicateSelection}
					overflowingChaliceRounds={overflowingChaliceRounds}
					setOverflowingChaliceRounds={setOverflowingChaliceRounds}
					forceUseCards={forceUseCards}
					setForceUseCards={setForceUseCards}
					freeQuestions={freeQuestions}
					setFreeQuestions={setFreeQuestions}
					sharedCard={sharedCards}
					setSharedCard={setSharedCards}
					pastUsedCards={pastUsedCards}
					setPastUsedCards={setPastUsedCards}
				/>

				<DiscardOverlay
					currentOverlay={currentOverlay}
					setCurrentOverlay={setCurrentOverlay}
					hand={hand}
					setHand={setHand}
					discardCount={discardCount}
					setDiscardCount={setDiscardCount}
					discardOptions={discardOptions}
					setDiscardOptions={setDiscardOptions}
					discardSelection={discardSelection}
					setDiscardSelection={setDiscardSelection}
				/>

				<DuplicatingOverlay
					currentOverlay={currentOverlay}
					setCurrentOverlay={setCurrentOverlay}
					hand={hand}
					setHand={setHand}
					duplicateSelection={duplicateSelection}
					setDuplicateSelection={setDuplicateSelection}
				/>

				<FreeQuestionUsedOverlay
					currentOverlay={currentOverlay}
					setCurrentOverlay={setCurrentOverlay}
				/>

				<ResetConfirmOverlay
					currentOverlay={currentOverlay}
					setCurrentOverlay={setCurrentOverlay}
				/>

				<ShareCardOverlay
					currentOverlay={currentOverlay}
					setCurrentOverlay={setCurrentOverlay}
					sharedCard={sharedCards}
					setSharedCard={setSharedCards}
				/>

				<PastUsedCardsOverlay
					currentOverlay={currentOverlay}
					setCurrentOverlay={setCurrentOverlay}
					pastUsedCards={pastUsedCards}
					setPastUsedCards={setPastUsedCards}
				/>
			</main>
		</Layout>
	);
}
