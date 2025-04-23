import React from 'react';
import Layout from '@theme/Layout';
import InvestigationForm from '../components/investigationForm';
import InvestigationNav from '../components/investigationNav';

export default function Radar() {
	return (
		<Layout title='4. Radar'>
			<InvestigationNav />
			<InvestigationForm
				title='4. RADAR'
				chips={['DRAW 2, PICK 1', '5 MINUTES']}
				prompt='Are you within Distance of me?'
				storageKey='radarNotes'
				fields={{
					'All Games': [
						'¼ Mile',
						'½ Mile',
						'1 Mile',
						'3 Miles',
						'5 Miles',
						'10 Miles',
						'25 Miles',
						'50 Miles',
						'100 Miles',
						'CHOOSE',
					],
				}}
			/>
		</Layout>
	);
}
