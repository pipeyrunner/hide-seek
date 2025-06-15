import React from 'react';

type LabelPillProps = {
	label: string;
	fontSize?: string;
};

const colorMap: Record<string, string> = {
	МАЛЕНЬКИЙ: '#ffc800',
	СРЕДНИЙ: '#ff8c00',
	БОЛЬШОЙ: '#fc1403',
};

const LabelPill: React.FC<LabelPillProps> = ({
	label,
	fontSize = '0.8rem',
}) => {
	const bgColor = colorMap[label.toUpperCase()] ?? '#ccc';

	return (
		<span
			style={{
				padding: '0.2rem 0.6rem',
				borderRadius: '999px',
				fontWeight: 'bold',
				fontSize: fontSize,
				whiteSpace: 'nowrap',
				backgroundColor: bgColor,
				color: '#ffffff',
				position: 'relative',
				display: 'inline-block',
				bottom: '0.1rem',
			}}
		>
			{label}
		</span>
	);
};

export default LabelPill;
