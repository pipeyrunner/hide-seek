import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';

const navItems = [
	{ label: 'Matching', href: '/matching' },
	{ label: 'Measuring', href: '/measuring' },
	{ label: 'Thermometer', href: '/thermometer' },
	{ label: 'Radar', href: '/radar' },
	{ label: 'Tentacles', href: '/tentacles' },
	{ label: 'Photos', href: '/photos' },
];

export default function InvestigationNav() {
	const { pathname } = useLocation();

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				gap: '0.5rem',
				marginBottom: '1rem',
				flexWrap: 'wrap',
				marginTop: '1rem',
			}}
		>
			{navItems.map(({ label, href }) => {
				const isActive = pathname.includes(href);
				return (
					<Link
						key={href}
						to={href}
						style={{
							padding: '0.4rem 1rem',
							border: '2px solid black',
							backgroundColor: isActive ? 'black' : 'white',
							color: isActive ? 'white' : 'black',
							borderRadius: '999px',
							textDecoration: 'none',
							fontWeight: 600,
							fontSize: '0.85rem',
							textTransform: 'uppercase',
						}}
					>
						{label}
					</Link>
				);
			})}
		</div>
	);
}
