import React from 'react';

type CardDeckStackProps = {
	count: number;
	onDraw?: () => void;
};

export default function CardDeckStack({ count, onDraw }: CardDeckStackProps) {
	const maxVisible = 10; // show only top 5 cards visually
	const visibleCards = Math.min(count, maxVisible);

	return (
		<div
			style={{
				position: 'relative',
				width: 120 * 1.5,
				height: 168 * 1.5,
				cursor: onDraw ? 'pointer' : 'default',
				margin: 'auto',
			}}
			onClick={onDraw}
		>
			{Array.from({ length: visibleCards }).map((_, i) => (
				<img
					key={i}
					src='/img/cards/card_back.png'
					alt='Card Back'
					style={{
						position: 'absolute',
						bottom: i * 2,
						left: i * 1,
						width: 120 * 1.5,
						height: 168 * 1.5,
						objectFit: 'cover',
						borderRadius: 8,
						boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
						zIndex: i,
					}}
				/>
			))}
			{/* {count > maxVisible && (
				<div
					style={{
						position: 'absolute',
						top: maxVisible * 3 + 10,
						left: 0,
						width: '100%',
						textAlign: 'center',
						color: '#555',
						fontSize: '0.9rem',
					}}
				>
					+{count - maxVisible} more
				</div>
			)} */}
		</div>
	);
}
