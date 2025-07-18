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
						'Транспортное кольцо',
						'Улица или дорога',
					],
					'Административные деления': [
						' Автономный Округ',
						'Кольцевая зона',
						'Район',
					],
					'Природные объекты': ['Водный объект', 'Парк'],
					'Места интереса': [
						'Парк развлечений',
						'Зоопарк',
						'Музей',
						'Кинотеатр',
					],
					'Общественные объекты': ['Больница', 'Библиотека', 'МФЦ'],
				}}
			/>
		</Layout>
	);
}
