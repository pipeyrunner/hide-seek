import React, { forwardRef } from 'react';

type CardDeckStackProps = {
	count: number;
	onDraw: (drawCount: number, maxSelection: number) => void;
	setBlurred: (blurred: boolean) => void;
};

const CardDeckStack = forwardRef<HTMLDivElement, CardDeckStackProps>(
	({ count, onDraw, setBlurred }, ref) => {
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
					onClick={() => {
						setShowOptions((prev) => !prev);
						setSelectingQuestion(true);
						setBlurred(true);
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
							opacity: selectingQuestion ? 1 : 0,
							pointerEvents: selectingQuestion ? 'auto' : 'none',
							transition: '0.3s',
							rowGap: '1rem',
						}}
					>
						<h2
							style={{
								color: 'white',
								fontFamily: 'VAG Rounded Next, sans-serif',
							}}
						>
							Which type of question did you answer?
						</h2>
						<button
							onClick={() => {
								setSelectingQuestion(false);
								// delay 100ms
								setTimeout(() => {
									onDraw(3, 1);
								}, 500);
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
								setSelectingQuestion(false);
								// delay 100ms
								setTimeout(() => {
									onDraw(3, 1);
								}, 500);
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
								setSelectingQuestion(false);
								// delay 100ms
								setTimeout(() => {
									onDraw(2, 1);
								}, 500);
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
								setSelectingQuestion(false);
								// delay 100ms
								setTimeout(() => {
									onDraw(2, 1);
								}, 500);
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
								setSelectingQuestion(false);
								// delay 100ms
								setTimeout(() => {
									onDraw(4, 2);
								}, 500);
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
								setSelectingQuestion(false);
								// delay 100ms
								setTimeout(() => {
									onDraw(1, 1);
								}, 500);
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
				}
			</div>
		);
	}
);

export default CardDeckStack;
