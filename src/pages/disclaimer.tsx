import React from 'react';
import Layout from '@theme/Layout';

export default function Disclaimer() {
	return (
		<Layout title='Справка'>
			<main
				className='container'
				style={{ maxWidth: 800, margin: '2rem auto', padding: '1rem' }}
			>
				<h1>Disclaimer</h1>
				
				<p>
				Мы лишь адаптировали уже существующую игру на русский язык и перевели ее с империальной системы измерений в метрическую. Перевод был с юморком, чтобы инструкция и игра не были душными
				
				</p>
			</main>
		</Layout>
	);
}
