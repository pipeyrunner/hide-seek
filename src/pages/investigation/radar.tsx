import React from 'react';
import Layout from '@theme/Layout';
import InvestigationForm from '../../components/investigationForm';
import InvestigationNav from '../../components/investigationNav';

export default function Radar() {
	return (
		<Layout title='4. Радар'>
			<InvestigationNav />
			<InvestigationForm
				title='4. Радар'
				chips={['Вытяни 2, возьми 1', '5 минут']}
				prompt='Ты находишься в пределах _____ от меня?'
				storageKey='radarNotes'
				fields={{
					'Все игры': [
						'500 метров',
						'1 километр',
						'2 километра',
						'5 километров',
						'10 километров',
						'15 километров',
						'30 километров',
						'50 километров',
						'150 километров',
						'Любой радиус радара',
					],
				}}
			/>
		</Layout>
	);
}
