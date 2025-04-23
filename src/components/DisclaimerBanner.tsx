import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';

type Props = {
	overlay?: boolean;
};

export default function DisclaimerBanner({ overlay = false }: Props) {
	const [show, setShow] = useState(false);
	const [closing, setClosing] = useState(false);

	useEffect(() => {
		const dismissedAt = localStorage.getItem('bannerDismissedAt');
		const dismissCount = parseInt(
			localStorage.getItem('bannerDismissCount') || '0'
		);
		const now = Date.now();

		if (!dismissedAt) {
			setShow(true);
			return;
		}

		const elapsed = now - parseInt(dismissedAt);
		const oneDay = 1 * 24 * 60 * 60 * 1000;
		const oneWeek = 7 * 24 * 60 * 60 * 1000;
		const oneMonth = 30 * 24 * 60 * 60 * 1000;

		if (
			(dismissCount === 1 && elapsed > oneDay) ||
			(dismissCount === 2 && elapsed > oneWeek) ||
			(dismissCount === 3 && elapsed > oneMonth)
		) {
			setShow(true);
		}
	}, []);

	useEffect(() => {
		const handleKeydown = (e: KeyboardEvent) => {
			if (e.shiftKey && e.key.toLowerCase() === 'r') {
				localStorage.removeItem('bannerDismissedAt');
				localStorage.removeItem('bannerDismissCount');
				window.location.reload();
			}
		};
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	}, []);

	const handleDismiss = () => {
		setClosing(true);
		setTimeout(() => {
			const currentCount = parseInt(
				localStorage.getItem('bannerDismissCount') || '0'
			);
			localStorage.setItem('bannerDismissedAt', Date.now().toString());
			localStorage.setItem('bannerDismissCount', (currentCount + 1).toString());
			setShow(false);
			setClosing(false);
		}, 300);
	};

	if (!show) return null;

	return (
		<div
			style={{
				background: '#ff3b3b',
				color: 'white',
				padding: '0.75rem 1rem',
				textAlign: 'center',
				fontSize: '0.9rem',
				fontWeight: 500,
				position: overlay ? 'fixed' : 'relative',
				top: overlay ? '3.75rem' : undefined, // adjust depending on navbar height
				left: 0,
				width: '100%',
				zIndex: 1,
				borderBottom: '1px solidrgb(197, 50, 50)',
				transform: closing ? 'translateY(-100%)' : 'translateY(0)',
				transition: 'transform 0.3s ease-out',
			}}
		>
			This is an <strong>unofficial fan-made recreation</strong> of the game
			<em> Jet Lag: Hide and Seek</em>. It is not affiliated with Jet Lag,
			Nebula, or Wendover Productions.
			<Link
				to='/disclaimer'
				style={{
					marginLeft: 8,
					textDecoration: 'underline dotted',
					textUnderlineOffset: '2px',
					color: 'white',
				}}
			>
				Read more
			</Link>
			<button
				onClick={handleDismiss}
				aria-label='Dismiss banner'
				style={{
					position: 'absolute',
					top: '50%',
					right: '1rem',
					transform: 'translateY(-50%)',
					background: 'none',
					border: 'none',
					color: 'white',
					fontSize: '1.25rem',
					cursor: 'pointer',
					lineHeight: 1,
				}}
			>
				×
			</button>
		</div>
	);
}
