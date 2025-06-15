import React from 'react';
import Layout from '@theme/Layout';

export default function Disclaimer() {
	return (
		<Layout title='Disclaimer'>
			<main
				className='container'
				style={{ maxWidth: 800, margin: '2rem auto', padding: '1rem' }}
			>
				<h1>Disclaimer</h1>
				
				<p>
					It is not endorsed by or
					associated with the creators of the original product.
				</p>

				<p>
					This website is <strong>not for sale</strong>,{' '}
					<strong>not monetized</strong>, and does not offer the game or any
					physical products for purchase. It is not intended to replace the
					original game. All rights to the game design, branding, content, and
					intellectual property belong entirely to Wendover Productions LLC and
					their partners.
				</p>

				<p>
					If you represent Wendover Productions or Jet Lag: The Game and would
					like this site modified or removed, please contact me at{' '}
					<a href='mailto:collinj2055@gmail.com'>collinj2055@gmail.com</a>. I am
					happy to cooperate fully.
				</p>

				<p style={{ marginTop: '2rem', fontStyle: 'italic', color: '#666' }}>
					This project was created out of admiration for the game and its
					creators, and is meant to support and encourage real-world play and
					interest in the official version.
				</p>
			</main>
		</Layout>
	);
}
