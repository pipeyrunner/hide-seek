import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import CardDeckStack from '../components/CardDeckStack';
import CardDisplay from '../components/CardDisplay';
import { v4 as uuidv4 } from 'uuid';
import CardButton from '../components/CardButton';

type Card = { file: string; count?: number };
type DeckCard = {
	file: string;
	id: string;
};

const cardDefinitions = [
	{ file: 'time_bonus_5', count: 25 },
	{ file: 'time_bonus_10', count: 15 },
	{ file: 'time_bonus_15', count: 10 },
	{ file: 'time_bonus_20', count: 3 },
	{ file: 'time_bonus_30', count: 2 },
	{ file: 'powerup_discard_1_draw_2', count: 4 },
	{ file: 'powerup_discard_2_draw_3', count: 4 },
	{ file: 'powerup_draw_1_expand_1', count: 2 },
	{ file: 'powerup_duplicate_another_card', count: 2 },
	{ file: 'powerup_move', count: 1 },
	{ file: 'powerup_randomize_question', count: 4 },
	{ file: 'powerup_veto_question', count: 4 },
	...[
		'curse_bridge_troll',
		'curse_cairn',
		'curse_distant_cuisine',
		'curse_drained_brain',
		'curse_egg_partner',
		'curse_endless_tumble',
		'curse_gamblers_feet',
		'curse_hidden_hangman',
		'curse_impressionable_consumer',
		'curse_jammed_door',
		'curse_labyrinth',
		'curse_lemon_phylactery',
		'curse_luxury_car',
		'curse_mediocre_travel_agent',
		'curse_overflowing_chalice',
		'curse_ransom_note',
		'curse_right_turn',
		'curse_spotty_memory',
		'curse_the_bird_guide',
		'curse_the_unguided_tourist',
		'curse_the_uturn',
		'curse_urban_explorer',
		'curse_water_weight',
		'curse_zoologist',
	].map((file) => ({ file, count: 1 })),
];

function generateDeck(): DeckCard[] {
	const fullDeck: DeckCard[] = [];
	for (const { file, count } of cardDefinitions) {
		for (let i = 0; i < (count || 1); i++) {
			fullDeck.push({
				file,
				id: uuidv4(),
			});
		}
	}
	return shuffle(fullDeck);
}

function shuffle<T>(array: T[]): T[] {
	const result = [...array];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}

const Overlay = ({ visible, children, blur = true }) => (
	<div
		style={{
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			zIndex: 1000,
			opacity: visible ? 1 : 0,
			pointerEvents: visible ? 'auto' : 'none',
			transition: '0.3s',
		}}
	>
		{children}
	</div>
);

export default function Draw() {
	const [deck, setDeck] = useState(shuffle(generateDeck()));
	const [hand, setHand] = useState<DeckCard[]>([]);
	const [drawn, setDrawn] = useState<DeckCard[]>([]);
	const [selecting, setSelecting] = useState(false);
	const [flipped, setFlipped] = useState<DeckCard[]>([]);
	const [selectedCards, setSelectedCards] = useState<DeckCard[]>([]);
	const [maxSelectedCards, setMaxSelectedCards] = useState(3);
	const [blurred, setBlurred] = useState(false);
	const [handSize, setHandSize] = useState(5);
	const [forceUseCards, setForceUseCards] = useState(0);
	const [pendingDraw, setPendingDraw] = useState<null | {
		cards: number;
		maxSelection: number;
	}>(null);
	const [showcaseCards, setShowcaseCards] = useState<[DeckCard] | []>([]);
	const [allowClose, setAllowClose] = useState(false);
	const [useText, setUseText] = useState('');
	const [useCard, setUseCard] = useState<DeckCard | null>(null);

	const handleDraw = (cards: number, maxSelection: number) => {
		if (maxSelection + hand.length > handSize) {
			setForceUseCards(maxSelection + hand.length - handSize);
			setPendingDraw({ cards, maxSelection });
			return;
		}
		const actual = Math.min(cards, deck.length);
		setMaxSelectedCards(maxSelection);
		const drawnNow = deck.slice(0, actual);
		setDrawn(drawnNow);
		setDeck(deck.slice(actual));
		setSelecting(true);

		// Flip cards after short delay
		setTimeout(() => {
			setFlipped(drawnNow);

			if (cards == 1) {
				setSelectedCards([drawnNow[0]]);
			}
		}, 200);
	};

	const handleKeep = (card: DeckCard) => {
		setHand([...hand, card]);
		setDrawn(drawn.filter((c) => c.id !== card.id));
		setFlipped(flipped.filter((c) => c.id !== card.id));
	};

	const handleDiscard = () => {
		setDrawn([]);
		setSelecting(false);
		setBlurred(false);
		setFlipped([]);
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
		if (forceUseCards === 0 && pendingDraw) {
			const { cards, maxSelection } = pendingDraw;
			setPendingDraw(null); // clear pending
			handleDraw(cards, maxSelection); // rerun it
		}
	}, [forceUseCards, pendingDraw]);

	return (
		<Layout title='Your Hand' description='Draw cards from the deck'>
			<main
				className='container'
				style={{
					maxWidth: 900,
					margin: '2rem auto',
					padding: '1rem',
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
						// cursor: 'pointer',
					}}
					onClick={() => {
						if (!blurred) return;
						if (allowClose) {
							setShowcaseCards([]);
							setBlurred(false);
							setAllowClose(false);
						} else {
							setAllowClose(true);
						}
					}}
				></div>
				{/* blurred background */}
				<div
					style={{
						backdropFilter: selecting ? 'blur(8px)' : 'none',
						transition: '0.3s',
					}}
				>
					<CardDeckStack
						count={deck.length}
						onDraw={handleDraw}
						setBlurred={setBlurred}
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
									width: 100,
									height: 140,
									objectFit: 'cover',
									borderRadius: 6,
									border: '1px solid #ccc',
									cursor: 'pointer',
								}}
								onClick={() => {
									setShowcaseCards([card]);
									setBlurred(true);
									setAllowClose(true);
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
									width: 100,
									height: 140,
									objectFit: 'cover',
									borderRadius: 6,
									border: '1px solid #ccc',
									opacity: 0.5,
								}}
							/>
						))}
					</div>
				</div>

				<Overlay visible={selecting}>
					<h2
						style={{
							color: 'white',
							fontFamily: 'VAG Rounded Next, sans-serif',
						}}
					>
						Click Cards to Keep
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
											` translateY(${
												selectedCards.includes(card) ? -20 : 0
											}px)`,
										transition: 'transform 0.6s ease',
									}}
								>
									<CardDisplay
										card={card.file}
										onClick={() => {
											if (!selecting) return;
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
										style={{ marginLeft: '-50%' }}
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
								? `Select ${maxSelectedCards - selectedCards.length} more card${
										maxSelectedCards - selectedCards.length > 1 ? 's' : ''
								  }`
								: `Keep ${maxSelectedCards} card${
										maxSelectedCards > 1 ? 's' : ''
								  }`
						}
						disabled={selectedCards.length !== maxSelectedCards}
						backgroundColor={'#ff3b3b'}
						onClick={() => {
							if (!selecting) return;
							let s = selectedCards.map((card) => card);
							setHand([...hand, ...s]);
							setDrawn(drawn.filter((c) => !selectedCards.includes(c)));
							handleDiscard();
							setFlipped([]);
							setSelectedCards([]);
						}}
						style={{
							marginTop: '2rem',
							width: 200,
						}}
					/>
				</Overlay>

				<Overlay visible={forceUseCards > 0}>
					<h2
						style={{
							color: 'white',
							fontFamily: 'VAG Rounded Next, sans-serif',
						}}
					>
						You must use or discard {forceUseCards} card
						{forceUseCards > 1 ? 's' : ''} before drawing more.
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
										title={'USE'}
										backgroundColor={'#202b39'}
										onClick={() => {
											if (forceUseCards <= 0) return;
											setHand(hand.filter((_, index) => index !== i));
											setForceUseCards(forceUseCards - 1);
										}}
										disabled={!card.file.includes('curse_')}
									/>
									<CardButton
										title={'DISCARD'}
										backgroundColor={'#ff3b3b'}
										onClick={() => {
											if (forceUseCards <= 0) return;
											setHand(hand.filter((_, index) => index !== i));
											setForceUseCards(forceUseCards - 1);
										}}
									/>
								</div>
							</div>
						))}
					</div>
				</Overlay>

				<Overlay visible={showcaseCards.length > 0}>
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
											if (showcaseCards.length <= 0) return;
											setHand((prev) => {
												const index = prev.indexOf(card);
												if (index !== -1) {
													const newCards = [...prev];
													newCards.splice(index, 1);
													return newCards;
												}
												return prev;
											});

											if (selectedCards.length > 1) {
												setSelectedCards(
													selectedCards.filter((c) => c !== card)
												);
											} else {
												setShowcaseCards([]);
												setBlurred(false);
												setAllowClose(false);
											}

											setUseText(card.file);
											setUseCard(card);
										}}
										onClick={() => {
											if (showcaseCards.length <= 0) return;
											setHand(hand.filter((_, index) => index !== i));
											if (selectedCards.length > 1) {
												setSelectedCards(
													selectedCards.filter((c) => c !== card)
												);
											} else {
												setShowcaseCards([]);
												// setBlurred(false);
												setAllowClose(false);
											}

											setUseText(card.file);
											setUseCard(card);
										}}
										disabled={!card.file.includes('curse_')}
									/>
									<CardButton
										title={'DISCARD'}
										backgroundColor={'#ff3b3b'}
										onClick={() => {
											if (showcaseCards.length <= 0) return;
											setHand((prev) => {
												const index = prev.indexOf(card);
												if (index !== -1) {
													const newCards = [...prev];
													newCards.splice(index, 1);
													return newCards;
												}
												return prev;
											});

											if (selectedCards.length > 1) {
												setSelectedCards(
													selectedCards.filter((c) => c !== card)
												);
											} else {
												setShowcaseCards([]);
												setBlurred(false);
												setAllowClose(false);
											}
										}}
									/>
								</div>
							</div>
						))}
					</div>
				</Overlay>

				<Overlay visible={useCard !== null}>
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
									card={useCard == null ? 'card_back' : useCard.file}
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
									title={'CONTINUE'}
									backgroundColor={'#ff3b3b'}
									onClick={() => {
										if (useCard === null) return;
										setUseText('');
										setUseCard(null);
										setBlurred(false);
									}}
								/>
							</div>
						</div>
					</div>
				</Overlay>
			</main>
		</Layout>
	);
}
