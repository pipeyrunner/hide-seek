import React from 'react';
import { useLocation, useHistory } from '@docusaurus/router';
import '../pages/investigationBook.css';

const navItems = [
	{ label: 'Соответствие', path: '/investigation/matching' },
	{ label: 'измерение', path: '/investigation/measuring' },
	{ label: 'Горячо/холодно', path: '/investigation/thermometer' },
	{ label: 'Радар', path: '/investigation/radar' },
	{ label: 'Осьминог', path: '/investigation/tentacles' },
	{ label: 'Фото', path: '/investigation/photos' },
];

export default function InvestigationNav() {
	const location = useLocation();
	const history = useHistory();

	const handleReset = () => {
		const confirm = window.confirm(
			'Вы точно хотите сбросить все записи расследования? Это действие полностью удалит весь ваш прогресс, и отменить его будет невозможно.'
		);
		if (!confirm) return;

		localStorage.removeItem('photosNotes');
		localStorage.removeItem('matchingNotes');
		localStorage.removeItem('measuringNotes');
		localStorage.removeItem('thermometerNotes');
		localStorage.removeItem('radarNotes');
		localStorage.removeItem('tentaclesNotes');

		window.location.reload();
	};

	return (
		<div className='investigation-nav'>
			<div className='investigation-nav-tabs'>
				{navItems.map((item) => (
					<button
						key={item.path}
						className={`nav-tab ${
							location.pathname.includes(item.path) ? 'active' : ''
						}`}
						onClick={() => history.push(item.path)}
					>
						{item.label}
					</button>
				))}
			</div>
			<div className='investigation-nav-divider' />
			<button className='nav-reset' onClick={handleReset}>
				Reset All
			</button>
		</div>
	);
}
