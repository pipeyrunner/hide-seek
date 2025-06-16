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
						'Пути поездов дальнего следования',
						'Железнодорожная станция',
					],
					Граница: [
						'Международная граница',
						'Граница округа',
						'Граница города',
					],
					'Природные объекты': [
						'Уровень моря',
						'Водный объект',
						'Береговая линия',
						'Гора',
						'Парк',
					],
					'Места интереса': [
						'Парк развлечения',
						'Зоопарк',
						'Океанариум',
						'Поле для гольфа',
						'Музей',
						'Кинотеатр',
					],
					'Общественные объекты': [
						'Больница',
						'Библиотека',
						'Иностранное консульство (МФЦ в Москве)',
					],
				}}
			/>
		</Layout>
	);
}
