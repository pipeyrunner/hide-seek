import React, { forwardRef } from 'react';

type CardDeckStackProps = {
	count: number;
	onDraw: (drawCount: number, maxSelection: number) => void;
};

const CardDeckStack = forwardRef<HTMLDivElement, CardDeckStackProps>(
	({ count, onDraw }, ref) => {
		const [showOptions, setShowOptions] = React.useState(false);
		const [selectingQuestion, setSelectingQuestion] = React.useState(false);
		const visibleCards = Math.min(count, 10);

		return (
			<div style={{ textAlign: 'center' }}>
				<div
					ref={ref}
					style={{
						position: 'relative',
						width: 180,
						height: 252,
						cursor: count > 0 ? 'pointer' : 'default',
						margin: 'auto',
					}}
					onClick={() => setShowOptions((prev) => !prev)}
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
								width: 180,
								height: 252,
								objectFit: 'cover',
								borderRadius: 8,
								boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
								zIndex: i,
							}}
						/>
					))}
				</div>

				{showOptions && (
					<div
						style={{
							marginTop: '1.5rem',
							display: 'flex',
							flexDirection: 'column',
							gap: '0.5rem',
							alignItems: 'center',
						}}
					>
						<button
							onClick={() => {
								onDraw(3, 1);
								setShowOptions(false);
							}}
							style={{
								width: 160,
								padding: '0.5rem',
								color: 'white',
								border: '0px solid black',
								borderRadius: 4,
								background: '#202b39',
								cursor: 'pointer',
								letterSpacing: '0.1rem',
								fontFamily: 'VAG Rounded Next, sans-serif',
								fontWeight: '900',
								fontSize: '1rem',
							}}
						>
							<strong>MATCHING</strong>
						</button>
						<button
							onClick={() => {
								onDraw(3, 1);
								setShowOptions(false);
							}}
							style={{
								width: 160,
								padding: '0.5rem',
								color: 'white',
								border: '0px solid black',
								borderRadius: 4,
								background: '#4a9a5e',
								cursor: 'pointer',
								letterSpacing: '0.1rem',
								fontFamily: 'VAG Rounded Next, sans-serif',
								fontWeight: '900',
								fontSize: '1rem',
							}}
						>
							<strong>MEASURING</strong>
						</button>
						<button
							onClick={() => {
								onDraw(2, 1);
								setShowOptions(false);
							}}
							style={{
								width: 160,
								padding: '0.5rem',
								color: 'white',
								border: '0px solid black',
								borderRadius: 4,
								background: '#f56d3e',
								cursor: 'pointer',
								letterSpacing: '0.1rem',
								fontFamily: 'VAG Rounded Next, sans-serif',
								fontWeight: '900',
								fontSize: '1rem',
							}}
						>
							<strong>RADAR</strong>
						</button>
						<button
							onClick={() => {
								onDraw(2, 1);
								setShowOptions(false);
							}}
							style={{
								width: 160,
								padding: '0.5rem',
								color: 'white',
								border: '0px solid black',
								borderRadius: 4,
								background: '#feb846',
								cursor: 'pointer',
								letterSpacing: '0.1rem',
								fontFamily: 'VAG Rounded Next, sans-serif',
								fontWeight: '900',
								fontSize: '1rem',
							}}
						>
							<strong>THERMOMETER</strong>
						</button>
						<button
							onClick={() => {
								onDraw(4, 2);
								setShowOptions(false);
							}}
							style={{
								width: 160,
								padding: '0.5rem',
								color: 'white',
								border: '0px solid black',
								borderRadius: 4,
								background: '#8969a6',
								cursor: 'pointer',
								letterSpacing: '0.1rem',
								fontFamily: 'VAG Rounded Next, sans-serif',
								fontWeight: '900',
								fontSize: '1rem',
							}}
						>
							<strong>TENTACLES</strong>
						</button>
						<button
							onClick={() => {
								onDraw(1, 1);
								setShowOptions(false);
							}}
							style={{
								width: 160,
								padding: '0.5rem',
								color: 'white',
								border: '0px solid black',
								borderRadius: 4,
								background: '#80b2c6',
								cursor: 'pointer',
								letterSpacing: '0.1rem',
								fontFamily: 'VAG Rounded Next, sans-serif',
								fontWeight: '900',
								fontSize: '1rem',
							}}
						>
							<strong>PHOTO</strong>
						</button>
					</div>
				)}
			</div>
		);
	}
);

export default CardDeckStack;
