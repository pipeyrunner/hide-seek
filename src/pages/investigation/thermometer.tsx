import React from 'react';
import Layout from '@theme/Layout';
import InvestigationForm from '../../components/investigationForm';
import InvestigationNav from '../../components/investigationNav';

export default function Thermometer() {
	return (
		<Layout title='3. Горячо/холодно'>
			<InvestigationNav />
			<InvestigationForm
				title='3. Горячо/холодно'
				chips={['Вытяни 2, возьми 1', '5 минут']}
				prompt="Я только что преодолел (как минимум) _____. Стало жарче или холоднее?"
				storageKey='thermometerNotes'
				fields={{
					'Все игры': ['1 километр', '5 километров'],
					'Для средних и больших игр': ['15 километров'],
					'Только для больших игр': ['50 километров'],
				}}
			/>
		</Layout>
	);
}
