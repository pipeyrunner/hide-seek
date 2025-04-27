import React from 'react';

type CardButtonProps = {
	title: string;
	backgroundColor?: string;
	color?: string;
	onClick?: () => void;
	disabled?: boolean;
	style?: React.CSSProperties; // new optional prop for custom styles
};

function CardButton({
	title,
	backgroundColor = 'red',
	color = 'white',
	onClick,
	disabled = false,
	style = {},
}: CardButtonProps) {
	return (
		<button
			onClick={onClick}
			style={{
				width: '100%',
				padding: '0.5rem',
				color: color,
				border: '0px solid black',
				borderRadius: 4,
				background: backgroundColor,
				cursor: disabled ? 'not-allowed' : 'pointer',
				letterSpacing: '0.1rem',
				fontFamily: 'VAG Rounded Next, sans-serif',
				fontWeight: '900',
				fontSize: '1rem',
				opacity: disabled ? 0.5 : 1,
				transition: '0.3s',
				...style,
			}}
			disabled={disabled}
		>
			<strong>{title}</strong>
		</button>
	);
}

export default CardButton;
