import React, { forwardRef } from 'react';
import { OverlayType } from '../core/overlay';

type CardDeckStackProps = {
	count: number;
	setCurrentOverlay: (overlay: OverlayType) => void;
};

const CardDeckStack = forwardRef<HTMLDivElement, CardDeckStackProps>(
	({ count, setCurrentOverlay }, ref) => {
		const visibleCards = Math.min(count, 10);

		return (
			<div style={{ textAlign: 'center' }}>
				<div
					ref={ref}
					style={{
						position: 'relative',
						width: 180 * 0.6,
						height: 252 * 0.6,
						cursor: count > 0 ? 'pointer' : 'default',
						margin: 'auto',
					}}
					onClick={() => {
						setCurrentOverlay(OverlayType.QUESTION_SELECT);
					}}
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
								width: 250 * 0.6,
								height: 252 * 0.6,
								objectFit: 'cover',
								borderRadius: 8,
								boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
								zIndex: i,
							}}
						/>
					))}
				</div>
			</div>
		);
	}
);

export default CardDeckStack;
