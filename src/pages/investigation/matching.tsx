import React from 'react';
import Layout from '@theme/Layout';
import InvestigationForm from '../../components/investigationForm';
import InvestigationNav from '../../components/investigationNav';

export default function Matching() {
	return (
		<Layout title='1. Matching'>
			<InvestigationNav />
			<InvestigationForm
				title='1. Соответствие'
				chips={['Тяни 3, возьми 1', '5 минут']}
				prompt='Является ли твой ближайший _____ тем же, что и мой ближайший _____?'
				storageKey='matchingNotes'
				fields={{
					Транспорт: [
						'Коммерческий аэропорт',
						'Линия транспорта',
						'Длина названия станции',
						'Улица или дорога',
					],
					'Административные деления': [
						'Округ',
						'Город',
						'Административный округ',
						'Район',
					],
					'Природные объекты': ['Гора', 'Landmass', 'Парк'],
					'Места интереса': [
						'Парк развлечений',
						'Зоопарк',
						'Океанариум',
						'Поле для гольфа',
						'Музей',
						'Кинотеатр',
					],
					'Общественные объекты': ['Больница', 'Библиотека', 'Иностранное консульство (МФЦ в Москве)'],
				}}
			/>
		</Layout>
	);
}
