import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import CardDeckStack from '../components/CardDeckStack';
import CardDisplay from '../components/CardDisplay';
import CardButton from '../components/CardButton';
import {
	cardDefinitions,
	DeckCard,
	findCardByFile,
	getDeck,
	getUseText,
} from '../core/deck';
import Overlay from '../components/Overlay';
import { v4 as uuidv4 } from 'uuid';

export default function Draw() {
	const [deck, setDeck] = useState(getDeck());
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
	const [showcaseShowCancel, setShowcaseShowCancel] = useState(false);
	const [allowClose, setAllowClose] = useState(false);
	const [useText, setUseText] = useState('');
	const [useCard, setUseCard] = useState<DeckCard | null>(null);

	const [discardOptions, setDiscardOptions] = useState<DeckCard[]>([]);
	const [discardCount, setDiscardCount] = useState(0);
	const [discardSelection, setDiscardSelection] = useState<DeckCard[]>([]);

	const [duplicating, setDuplicating] = useState(false);
	const [duplicateSelection, setDuplicateSelection] = useState<DeckCard | null>(
		null
	);

	const [freeQuestions, setFreeQuestions] = useState(0);
	const [overflowingChaliceRounds, setOverflowingChaliceRounds] = useState(0);

	const [freeQuestionUsed, setFreeQuestionUsed] = useState(false);

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

			if (cards == maxSelection) {
				setSelectedCards(drawnNow);
			}
		}, 200);
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
		if (forceUseCards === 0 && discardCount === 0 && pendingDraw) {
			const { cards, maxSelection } = pendingDraw;
			setPendingDraw(null); // clear pending
			handleDraw(cards, maxSelection); // rerun it
		}
	}, [forceUseCards, pendingDraw, discardCount]);

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
						overFlowingChaliceRounds={overflowingChaliceRounds}
						setOverFlowingChaliceRounds={setOverflowingChaliceRounds}
						freeQuestions={freeQuestions}
						setFreeQuestions={setFreeQuestions}
						setFreeQuestionUsed={setFreeQuestionUsed}
					/>
					{/* <button
						onClick={() => {
							setHand([findCardByFile('curse_impressionable_consumer', deck)!]);
						}}
					>
						Test Hand
					</button> */}

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
								? `SELECT ${maxSelectedCards - selectedCards.length} MORE CARD${
										maxSelectedCards - selectedCards.length > 1 ? 'S' : ''
								  }`
								: `KEEP ${maxSelectedCards} CARD${
										maxSelectedCards > 1 ? 'S' : ''
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
							width: 250,
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
										disabled={
											card.file.includes('time_bonus_') && !card.canUse(hand)
										}
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
											setShowcaseCards([]);

											setUseText(card.file);
											setUseCard(card);
											setShowcaseShowCancel(false);
										}}
										disabled={card.file.includes('time_bonus_')}
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
											setShowcaseShowCancel(false);
										}}
									/>
									{showcaseShowCancel && (
										<CardButton
											title={'CANCEL'}
											backgroundColor={'#202b39'}
											onClick={() => {
												if (showcaseCards.length < 1) return;
												setShowcaseCards([]);
												setBlurred(false);
												setAllowClose(false);
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

				<Overlay visible={useCard !== null}>
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
									title={'CONFIRM USE'}
									backgroundColor={'#202b39'}
									onClick={() => {
										if (useCard === null) return;

										setHand((prev) => {
											const index = prev.indexOf(useCard);
											if (index !== -1) {
												const newCards = [...prev];
												newCards.splice(index, 1);
												return newCards;
											}
											return prev;
										});
										let morePages =
											useCard === null ? false : useCard.hasMorePages;

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
												setPendingDraw({ cards: 2, maxSelection: 2 });
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
												setPendingDraw({ cards: 3, maxSelection: 3 });
												break;
											case 'powerup_draw_1_expand_1':
												setHandSize((prev) => prev + 1);
												setPendingDraw({ cards: 1, maxSelection: 1 });
												break;
											case 'powerup_duplicate_another_card':
												setDuplicating(true);
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
												break;
											case 'curse_overflowing_chalice':
												setOverflowingChaliceRounds((prev) => prev + 3);
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
												break;
											case 'curse_lemon_phylactery':
												setDiscardCount(1);
												let tHand = hand.filter((c) =>
													c.file.includes('powerup_')
												);
												setDiscardOptions(tHand);
												setDiscardSelection([]);
												if (tHand.length === 1) {
													setDiscardSelection(tHand);
												}
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
												break;
											case 'curse_impressionable_consumer':
												setFreeQuestions((prev) => prev + 1);
												setBlurred(false);
												break;
											default:
												setBlurred(false);
												break;
										}
										setUseText('');
										setUseCard(null);
									}}
									disabled={useCard !== null && !useCard.canUse(hand)}
								/>
								<CardButton
									title={'CANCEL'}
									backgroundColor={'#ff3b3b'}
									onClick={() => {
										if (useCard === null) return;
										setUseText('');
										setUseCard(null);
										setBlurred(false);
									}}
									style={{
										marginTop: '2rem',
									}}
								/>
							</div>
						</div>
					</div>
				</Overlay>

				<Overlay visible={discardCount > 0}>
					<h2
						style={{
							color: 'white',
							fontFamily: 'VAG Rounded Next, sans-serif',
						}}
					>
						Select {discardCount} card{discardCount > 1 ? 's' : ''} to discard.
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
										if (!(discardCount > 0)) return;
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
										transform: `translateY(${
											discardSelection.includes(card) ? -20 : 0
										}px)`,
										left: '0%',
									}}
								/>
							</div>
						))}
					</div>

					<CardButton
						title={
							discardSelection.length !== discardCount
								? `SELECT ${discardCount - discardSelection.length} MORE CARD${
										discardCount - discardSelection.length > 1 ? 'S' : ''
								  }`
								: `DISCARD ${discardCount} CARD${discardCount > 1 ? 'S' : ''}`
						}
						disabled={discardSelection.length !== discardCount}
						backgroundColor={'#ff3b3b'}
						onClick={() => {
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

							if (pendingDraw === null) {
								setBlurred(false);
							}
						}}
						style={{
							marginTop: '2rem',
							width: 250,
						}}
					/>
				</Overlay>

				<Overlay visible={duplicating}>
					<h2
						style={{
							color: 'white',
							fontFamily: 'VAG Rounded Next, sans-serif',
						}}
					>
						Select a card to duplicate.
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
										if (!duplicating) return;
										setDuplicateSelection(card);
									}}
									style={{
										transform: `translateY(${
											duplicateSelection !== null &&
											duplicateSelection!.id == card.id
												? -20
												: 0
										}px)`,
										left: '0%',
									}}
								/>
							</div>
						))}
					</div>

					<CardButton
						title={
							duplicateSelection === null ? `SELECT A CARD` : `DUPLICATE CARD`
						}
						disabled={duplicateSelection === null}
						backgroundColor={'#ff3b3b'}
						onClick={() => {
							if (!duplicating) return;
							let newCard = duplicateSelection!;
							newCard = { ...newCard, id: uuidv4() };

							setHand([...hand, newCard]);

							setDuplicateSelection(null);
							setDuplicating(false);
							setBlurred(false);
						}}
						style={{
							marginTop: '2rem',
							width: 250,
						}}
					/>
				</Overlay>

				<Overlay visible={freeQuestionUsed}>
					<h2
						style={{
							color: 'white',
							fontFamily: 'VAG Rounded Next, sans-serif',
						}}
					>
						Due to the Curse of the Impressionable Consumer, you have recieived
						no reward for this question.
					</h2>
					<CardButton
						title={'OK'}
						backgroundColor={'#ff3b3b'}
						onClick={() => {
							setFreeQuestionUsed(false);
							setBlurred(false);
						}}
						style={{
							marginTop: '2rem',
							width: 250,
						}}
					/>
				</Overlay>
			</main>
		</Layout>
	);
}
