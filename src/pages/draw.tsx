import React from 'react';
import Layout from '@theme/Layout';
import CardDeckStack from '../components/CardDeckStack';

export default function Draw() {
	return (
		<Layout title='Draw'>
			<main
				className='container'
				style={{ maxWidth: 800, margin: '2rem auto', padding: '1rem' }}
			>
				<CardDeckStack count={40} onDraw={() => {}} />
			</main>
		</Layout>
	);
}
