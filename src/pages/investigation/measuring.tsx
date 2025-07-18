import React from 'react';
import Layout from '@theme/Layout';
import InvestigationForm from '../../components/investigationForm';
import InvestigationNav from '../../components/investigationNav';

export default function Measuring() {
	return (
		<Layout title='2. Измерение'>
			<InvestigationNav />
			<InvestigationForm
				title='2. Измерение'
				chips={['вытяни 3, возьми 1', '5 минут']}
				prompt='По сравнению со мной, ты ближе или дальше от _____?'
				storageKey='measuringNotes'
				fields={{
					Транспорт: [
						'Коммерческий аэропорт',
						'удаленность от Экспресс линии автобуса',
						'Удаленность от транспортного кольца',
						'Железнодорожная станция',
					],
					
					'Природные объекты': [
						'Водный объект',
						'Парк',
					],
					'Места интереса': [
						'Парк развлечения',
						'Зоопарк',
						'Музей',
						'Кинотеатр',
					],
					'Общественные объекты': [
						'Больница',
						'Библиотека',
						'МФЦ',
					],
				}}
			/>
		</Layout>
	);
}
