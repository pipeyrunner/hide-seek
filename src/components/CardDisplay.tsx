import React from 'react';

type CardDisplayProps = {
	card: string;
	onClick?: () => void;
	scale?: number; // new optional prop
	style?: React.CSSProperties; // new optional prop for custom styles
};

function CardDisplay({ card, onClick, scale = 1, style }: CardDisplayProps) {
	return (
		<img
			src={`/img/cards/${card}.png`}
			alt={card}
			onClick={onClick}
			style={{
				position: 'absolute',
				width: `${scale * 100}%`,
				height: `${scale * 100}%`,
				backfaceVisibility: 'hidden',
				borderRadius: 8,
				objectFit: 'cover',
				border: '1px solid #ccc',
				cursor: onClick ? 'pointer' : 'default',
				...style,
			}}
		/>
	);
}

export default CardDisplay;
