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
	return [...array].sort(() => Math.random() - 0.5);
}

export default function Draw() {
	const [deck, setDeck] = useState(shuffle(generateDeck()));
	const [hand, setHand] = useState<string[]>([]);
	const [drawn, setDrawn] = useState<string[]>([]);
	const [selecting, setSelecting] = useState(false);
	const [flipped, setFlipped] = useState<string[]>([]);
	const [selectedCards, setSelectedCards] = useState<string[]>([]);
	const [maxSelectedCards, setMaxSelectedCards] = useState(3);

	const handleDraw = (cards: number, maxSelection: number) => {
		const actual = Math.min(cards, deck.length);
		setMaxSelectedCards(maxSelection);
		const drawnNow = deck.slice(0, actual);
		setDrawn(
			drawnNow.map(
				(card) =>
					(card += `_${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`)
			)
		);
		setDeck(deck.slice(actual));
		setSelecting(true);

		// Flip cards after short delay
		setTimeout(() => {
			setFlipped(drawnNow);
		}, 300);
	};

	const handleKeep = (card: string) => {
		setHand([...hand, card.slice(0, -5)]);
		setDrawn(drawn.filter((c) => c !== card));
		setFlipped(flipped.filter((c) => c !== card.slice(0, -5)));
	};

	const handleDiscard = () => {
		setDrawn([]);
		setSelecting(false);
		setFlipped([]);
	};

	useEffect(() => {
		cardDefinitions.forEach(({ file }) => {
			const img = new Image();
			img.src = `/img/cards/${file}.png`;
		});
		const backImg = new Image();
		backImg.src = '/img/cards/card_back.png';
	}, []);

	return (
		<Layout title='Draw Cards'>
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
						backdropFilter: selecting ? 'blur(8px)' : 'none',
						transition: '0.3s',
						position: 'fixed',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						background: 'rgba(0, 0, 0, 0.5)',
						zIndex: 1000,
						opacity: selecting ? 1 : 0,
						pointerEvents: selecting ? 'auto' : 'none',
					}}
				></div>
				{/* blurred background */}
				<div
					style={{
						backdropFilter: selecting ? 'blur(8px)' : 'none',
						transition: '0.3s',
					}}
				>
					<CardDeckStack count={deck.length} onDraw={handleDraw} />

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
					</div>
				</div>

				{selecting && (
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
						}}
					>
						<h2 style={{ color: 'white' }}>Click Cards to Keep</h2>
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
							style={{
								marginTop: '2rem',
								background: '#ff3b3b',
								color: 'white',
								border: 'none',
								borderRadius: 6,
								padding: '0.7rem 1.5rem',
								fontSize: '1rem',
								cursor: 'pointer',
							}}
						>
							Confirm Selection
						</button>
					</div>
				)}
			</main>
		</Layout>
	);
}
