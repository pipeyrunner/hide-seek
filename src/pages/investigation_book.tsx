import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import './investigationBook.css';

const sectionedFields = {
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
};

export default function InvestigationBook() {
	const [notes, setNotes] = useState<Record<string, string>>({});

	useEffect(() => {
		const saved = localStorage.getItem('matchingNotes');
		if (saved) {
			setNotes(JSON.parse(saved));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('matchingNotes', JSON.stringify(notes));
	}, [notes]);

	const handleChange = (label: string, value: string) => {
		setNotes((prev) => ({ ...prev, [label]: value }));
	};

	const handleReset = () => {
		localStorage.removeItem('matchingNotes');
		setNotes({});
	};

	const handlePrint = () => {
		window.print();
	};

	return (
		<Layout
			title='The Investigation Book'
			description='Investigation tracking form'
		>
			<div className='investigation-container'>
				<h1 className='investigation-title'>1. MATCHING</h1>
				<div className='investigation-chips'>
					<span className='chip'>COST: DRAW 3, PICK 1</span>
					<span className='chip'>TIME: 5 MINUTES</span>
				</div>
				<p className='investigation-question'>
					Is your nearest _______ the same as my nearest _______?
				</p>

				{Object.entries(sectionedFields).map(([section, fields]) => (
					<div key={section} className='investigation-section'>
						<h3 className='investigation-section-title'>{section}</h3>
						{fields.map((label) => (
							<div key={label} className='investigation-field'>
								<label className='field-label' htmlFor={label}>
									{label}
								</label>
								<input
									id={label}
									type='text'
									value={notes[label] || ''}
									onChange={(e) => handleChange(label, e.target.value)}
									className='field-input'
								/>
							</div>
						))}
					</div>
				))}

				<div className='investigation-buttons no-print'>
					<button onClick={handleReset}>Reset All</button>
					<button onClick={handlePrint}>Print Page</button>
				</div>
			</div>
		</Layout>
	);
}
