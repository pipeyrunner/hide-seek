import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import './Home.css';
import './font/stylesheet.css';
import { Analytics } from '@vercel/analytics/react';

export default function Home() {
	return (
		<Layout description='A real-world game played on public transit'>
			<Analytics />
			<div className='homepage-hero'>
				<div className='hide-seek-logo'>
					<div className='logo'>
						<img src='/img/jetlag.png' alt='Hide and Seek Logo' />
					</div>
					<div
						className='logo-container'
						style={{ width: 'fit-content', margin: '0 auto' }}
					>
						<h1 className='title'>
							HIDE<span className='plus'>+</span>SEEK
						</h1>
						<div className='line'></div>
						<div className='subline-container' style={{}}>
							<span className='subline left'>транспортная игра</span>
							<span className='subline right'>найди своих друзей</span>
						</div>
					</div>

					<p className='tagline'>
						Детская игра
						<br />
						которая выросла вместе с вами
					</p>

					<div className='badges'>
						<span className='badge'>AGES 14+</span>
						<span className='badge'>2-4+ игрока</span>
					</div>

					<div
						className='button-container'
						style={{
							display: 'flex',
							// backgroundColor: 'red',
							justifyContent: 'space-evenly',
						}}
					>
						<Link className='button' to='/docs/quick_start_guide'>
							Правила
						</Link>
						<Link className='button' to='/investigation/matching'>
							Списки вопросов
						</Link>
						<Link className='button' to='/your_deck'>
							Ваша колода
						</Link>
					</div>
				</div>
			</div>
		</Layout>
	);
}
