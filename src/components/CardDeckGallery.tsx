import React, { useState, useEffect } from 'react';
import '../css/custom.css';

const timeBonuses = [
	{ file: 'time_bonus_5', count: 25 },
	{ file: 'time_bonus_10', count: 15 },
	{ file: 'time_bonus_15', count: 10 },
	{ file: 'time_bonus_20', count: 3 },
	{ file: 'time_bonus_30', count: 2 },
];

const powerups = [
	{ file: 'powerup_discard_1_draw_2', count: 4 },
	{ file: 'powerup_discard_2_draw_3', count: 4 },
	{ file: 'powerup_draw_1_expand_1', count: 2 },
	{ file: 'powerup_duplicate_another_card', count: 2 },
	{ file: 'powerup_move', count: 1 },
	{ file: 'powerup_randomize_question', count: 4 },
	{ file: 'powerup_veto_question', count: 4 },
];

const curses = [
	{ file: 'curse_bridge_troll' },
	{ file: 'curse_cairn' },
	{ file: 'curse_distant_cuisine' },
	{ file: 'curse_drained_brain' },
	{ file: 'curse_egg_partner' },
	{ file: 'curse_endless_tumble' },
	{ file: 'curse_gamblers_feet' },
	{ file: 'curse_hidden_hangman' },
	{ file: 'curse_impressionable_consumer' },
	{ file: 'curse_jammed_door' },
	{ file: 'curse_labyrinth' },
	{ file: 'curse_lemon_phylactery' },
	{ file: 'curse_luxury_car' },
	{ file: 'curse_mediocre_travel_agent' },
	{ file: 'curse_overflowing_chalice' },
	{ file: 'curse_ransom_note' },
	{ file: 'curse_right_turn' },
	{ file: 'curse_spotty_memory' },
	{ file: 'curse_the_bird_guide' },
	{ file: 'curse_the_unguided_tourist' },
	{ file: 'curse_the_uturn' },
	{ file: 'curse_urban_explorer' },
	{ file: 'curse_water_weight' },
	{ file: 'curse_zoologist' },
];

const blankCard = [{ file: 'blank_card', count: 25 }];

const allCards = [...timeBonuses, ...powerups, ...curses, ...blankCard];

export default function CardDeckGallery() {
	const [selectedCard, setSelectedCard] = useState<string | null>(null);
	const [closing, setClosing] = useState(false);

	const currentIndex = allCards.findIndex((c) => c.file === selectedCard);

	const handleClose = () => {
		setClosing(true);
		setTimeout(() => {
			setSelectedCard(null);
			setClosing(false);
		}, 250);
	};

	const handleNext = () => {
		if (currentIndex < allCards.length - 1) {
			setSelectedCard(allCards[currentIndex + 1].file);
		}
	};

	const handlePrev = () => {
		if (currentIndex > 0) {
			setSelectedCard(allCards[currentIndex - 1].file);
		}
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (!selectedCard) return;
		if (e.key === 'Escape') handleClose();
		if (e.key === 'ArrowRight') handleNext();
		if (e.key === 'ArrowLeft') handlePrev();
	};

	// preload images
	useEffect(() => {
		allCards.forEach((card) => {
			const img = new Image();
			img.src = `/img/cards/${card.file}.png`;
		});
	}, []);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	});

	const renderSection = (
		title: string,
		cards: { file: string; count?: number }[]
	) => (
		<section style={{ marginBottom: '1.5rem', marginTop: '1.5rem' }}>
			<h2
				style={{
					textAlign: 'center',
					fontSize: '1.8rem',
					marginBottom: '1rem',
				}}
			>
				{title}
			</h2>
			<div className='card-gallery'>
				{cards.map((card, i) => (
					<div
						className={`card-item ${
							selectedCard === card.file ? 'card-active' : ''
						}`}
						key={i}
						onClick={() => setSelectedCard(card.file)}
						style={{
							position: 'relative',
							animationDelay: `${i * 60}ms`,
						}}
					>
						<img
							src={`/img/cards/${card.file}.png`}
							alt=''
							className='card-image'
						/>
						{card.count && (
							<div className='card-count-badge'>×{card.count}</div>
						)}
					</div>
				))}
			</div>
		</section>
	);

	return (
		<main>
			{renderSection('Временные бонусы', timeBonuses)}
			{renderSection('усиления', powerups)}
			{renderSection('Проклятия', curses)}
			{renderSection('Бланки', blankCard)}

			{selectedCard && (
				<div
					className={`card-modal-overlay ${closing ? 'fade-out' : ''}`}
					onClick={handleClose}
				>
					<div
						className={`card-modal-content ${closing ? 'fade-out' : ''}`}
						onClick={(e) => e.stopPropagation()}
					>
						<img src={`/img/cards/${selectedCard}.png`} alt='Expanded card' />
						<div className='card-modal-nav'></div>
					</div>
				</div>
			)}
		</main>
	);
}
