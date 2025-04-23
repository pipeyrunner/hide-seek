import React from 'react';
import Layout from '@theme/Layout';
import InvestigationForm from '../components/investigationForm';
import InvestigationNav from '../components/investigationNav';

export default function Thermometer() {
	return (
		<Layout title='3. Thermometer'>
			<InvestigationNav />
			<InvestigationForm
				title='3. THERMOMETER'
				chips={['DRAW 2, PICK 1', '5 MINUTES']}
				prompt="I've just traveled (at least) Distance. Am I hotter or colder?"
				storageKey='thermometerNotes'
				fields={{
					'All Games': ['½ Mile', '3 Miles'],
					'Add for Medium & Large': ['10 Miles'],
					'Add for Large': ['50 Miles'],
				}}
			/>
		</Layout>
	);
}
