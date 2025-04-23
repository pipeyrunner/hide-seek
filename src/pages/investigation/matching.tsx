import React from 'react';
import Layout from '@theme/Layout';
import InvestigationForm from '../../components/investigationForm';
import InvestigationNav from '../../components/investigationNav';

export default function Matching() {
	return (
		<Layout title='1. Matching'>
			<InvestigationNav />
			<InvestigationForm
				title='1. MATCHING'
				chips={['DRAW 3, PICK 1', '5 MINUTES']}
				prompt='Is your nearest _______ the same as my nearest _______?'
				storageKey='matchingNotes'
				fields={{
					Transit: [
						'Commercial Airport',
						'Transit Line',
						'Station’s Name Length',
						'Street or Path',
					],
					'Administrative Divisions': [
						'1st Admin. Division',
						'2nd Admin. Division',
						'3rd Admin. Division',
						'4th Admin. Division',
					],
					Natural: ['Mountain', 'Landmass', 'Park'],
					'Places of Interest': [
						'Amusement Park',
						'Zoo',
						'Aquarium',
						'Golf Course',
						'Museum',
						'Movie Theater',
					],
					'Public Utilities': ['Hospital', 'Library', 'Foreign Consulate'],
				}}
			/>
		</Layout>
	);
}
