import React from 'react';
import Layout from '@theme/Layout';
import InvestigationForm from '../../components/investigationForm';
import InvestigationNav from '../../components/investigationNav';

export default function Tentacles() {
	return (
		<Layout title='5. Осьминог'>
			<InvestigationNav />
			<InvestigationForm
				title='5. Осьминог'
				chips={['вытяни 4, возьми 2', '5 минут']}
				prompt='Из всех мест в пределах _____ от меня, к какому из них ты ближе всего? (Ты тоже должен быть в этом радиусе.)'
				storageKey='tentaclesNotes'
				fields={{
					'Средние и большие игры (1,5 километра)': [
						'Музеи',
						'Библиотеки',
						'Кинотеатры',
						'Больницы',
					],
					'Только большие игры (25 километров)': [
						'Линии метро',
						'Зоопарки',
						'Океанариумы',
						'Парки развлечений',
					],
				}}
			/>
		</Layout>
	);
}
