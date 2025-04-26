import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import CardDeckStack from '../components/CardDeckStack';

type Card = { file: string; count?: number };

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

function generateDeck(): string[] {
	const fullDeck: string[] = [];
	for (const { file, count } of cardDefinitions) {
		fullDeck.push(...Array(count).fill(file));
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

export default function Draw() {
	const [deck, setDeck] = useState(shuffle(generateDeck()));
	const [hand, setHand] = useState<string[]>([]);
	const [drawn, setDrawn] = useState<string[]>([]);
	const [selecting, setSelecting] = useState(false);
	const [flipped, setFlipped] = useState<string[]>([]);
	const [selectedCards, setSelectedCards] = useState<string[]>([]);
	const [maxSelectedCards, setMaxSelectedCards] = useState(3);
	const [blurred, setBlurred] = useState(false);
	const [handSize, setHandSize] = useState(5);
	const [forceUseCards, setForceUseCards] = useState(0);
	const [pendingDraw, setPendingDraw] = useState<null | {
		cards: number;
		maxSelection: number;
	}>(null);

	const handleDraw = (cards: number, maxSelection: number) => {
		if (maxSelection + hand.length > handSize) {
			setForceUseCards(maxSelection + hand.length - handSize);
			setPendingDraw({ cards, maxSelection });
			return;
		}
		const actual = Math.min(cards, deck.length);
		setMaxSelectedCards(maxSelection);
		const drawnNow = deck.slice(0, actual);
		let tempDrawn = drawnNow.map(
			(card) =>
				(card += `_${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`)
		);
		setDrawn(tempDrawn);
		setDeck(deck.slice(actual));
		setSelecting(true);

		// Flip cards after short delay
		setTimeout(() => {
			setFlipped(drawnNow);

			if (cards == 1) {
				setSelectedCards([tempDrawn[0]]);
			}
		}, 200);
	};

	const handleKeep = (card: string) => {
		setHand([...hand, card.slice(0, -5)]);
		setDrawn(drawn.filter((c) => c !== card));
		setFlipped(flipped.filter((c) => c !== card.slice(0, -5)));
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
						zIndex: 1000,
						opacity: blurred ? 1 : 0,
						pointerEvents: blurred ? 'auto' : 'none',
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
								src={`/img/cards/${card}.png`}
								alt={card}
								style={{
									width: 100,
									height: 140,
									objectFit: 'cover',
									borderRadius: 6,
									border: '1px solid #ccc',
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

				{
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
							opacity: selecting ? 1 : 0,
							pointerEvents: selecting ? 'auto' : 'none',
							transition: '0.3s',
						}}
					>
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
												(flipped.includes(card.slice(0, -5))
													? 'rotateY(0deg)'
													: 'rotateY(180deg)') +
												` translateY(${
													selectedCards.includes(card) ? -20 : 0
												}px)`,
											transition: 'transform 0.6s ease',
										}}
									>
										{/* Front (actual card) */}
										<img
											src={`/img/cards/${card.slice(0, -5)}.png`}
											alt={card}
											onClick={() => {
												if (selectedCards.includes(card)) {
													setSelectedCards(
														selectedCards.filter((c) => c !== card)
													);
												} else if (selectedCards.length < maxSelectedCards) {
													setSelectedCards([...selectedCards, card]);
												} else {
													// remove the first selected card if max is reached
													setSelectedCards([...selectedCards.slice(1), card]);
												}
											}}
											style={{
												position: 'absolute',
												width: '100%',
												height: '100%',
												marginLeft: '-50%',
												backfaceVisibility: 'hidden',
												borderRadius: 8,
												objectFit: 'cover',
												border: '1px solid #ccc',
											}}
										/>

										{/* Back (card_back.png) */}
										<img
											src='/img/cards/card_back.png'
											alt='Card back'
											style={{
												position: 'absolute',
												width: '100%',
												height: '100%',
												transform: 'rotateY(180deg)',
												backfaceVisibility: 'hidden',
												borderRadius: 8,
												objectFit: 'cover',
												border: '1px solid #ccc',
												marginLeft: '-50%',
											}}
										/>
									</div>
								</div>
							))}
						</div>

						<button
							onClick={() => {
								let s = selectedCards.map((card) => card.slice(0, -5));
								setHand([...hand, ...s]);
								setDrawn(drawn.filter((c) => !selectedCards.includes(c)));
								handleDiscard();
								setFlipped([]);
								setSelectedCards([]);
							}}
							disabled={selectedCards.length !== maxSelectedCards}
							style={{
								marginTop: '2rem',
								background:
									selectedCards.length !== maxSelectedCards
										? 'rgba(255, 59, 59, 0.5)'
										: '#ff3b3b',
								color: 'white',
								border: 'none',
								borderRadius: 6,
								padding: '0.7rem 1.5rem',
								fontSize: '1rem',
								cursor: 'pointer',
								transition: 'background 0.3s',
							}}
						>
							{selectedCards.length !== maxSelectedCards ? (
								<span style={{ fontWeight: 'bold' }}>
									{`Select ${
										maxSelectedCards - selectedCards.length
									} more card${
										maxSelectedCards - selectedCards.length > 1 ? 's' : ''
									}`}
								</span>
							) : (
								<span style={{ fontWeight: 'bold' }}>
									Keep {maxSelectedCards} card{maxSelectedCards > 1 ? 's' : ''}
								</span>
							)}
						</button>
					</div>
				}

				{
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
							opacity: forceUseCards > 0 ? 1 : 0,
							pointerEvents: forceUseCards > 0 ? 'auto' : 'none',
							transition: '0.3s',
						}}
					>
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
										<img
											src={`/img/cards/${card}.png`}
											alt={card}
											style={{
												position: 'absolute',
												width: '100%',
												height: '100%',
												backfaceVisibility: 'hidden',
												borderRadius: 8,
												objectFit: 'cover',
												border: '1px solid #ccc',
											}}
										/>
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
										<button
											onClick={() => {
												setHand(hand.filter((_, index) => index !== i));
												setForceUseCards(forceUseCards - 1);
											}}
											style={{
												background: '#ff3b3b',
												color: 'white',
												border: 'none',
												borderRadius: 6,
												padding: '0.4rem 0.8rem',
												fontSize: '0.9rem',
												cursor: 'pointer',
												width: '100%',
											}}
										>
											Discard
										</button>
										{card.includes('curse_') && (
											<button
												onClick={() => {
													setHand(hand.filter((_, index) => index !== i));
													setForceUseCards(forceUseCards - 1);
												}}
												style={{
													background: '#4caf50',
													color: 'white',
													border: 'none',
													borderRadius: 6,
													padding: '0.4rem 0.8rem',
													fontSize: '0.9rem',
													cursor: 'pointer',
													width: '100%',
												}}
											>
												Use
											</button>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				}
			</main>
		</Layout>
	);
}
