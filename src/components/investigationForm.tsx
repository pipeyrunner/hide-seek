import React, { useState, useEffect } from 'react';

interface Props {
	title: string;
	chips: string[];
	prompt: string;
	fields: Record<string, string[]>; // section -> fields
	storageKey: string;
}

export default function InvestigationForm({
	title,
	chips,
	prompt,
	fields,
	storageKey,
}: Props) {
	const [notes, setNotes] = useState<Record<string, string>>({});

	useEffect(() => {
		const saved = localStorage.getItem(storageKey);
		if (saved) {
			setNotes(JSON.parse(saved));
		}
	}, [storageKey]);

	useEffect(() => {
		localStorage.setItem(storageKey, JSON.stringify(notes));
	}, [notes, storageKey]);

	const handleChange = (label: string, value: string) => {
		setNotes((prev) => ({ ...prev, [label]: value }));
	};

	const handleReset = () => {
		localStorage.removeItem(storageKey);
		setNotes({});
	};

	const handlePrint = () => {
		window.print();
	};

	return (
		<div className='investigation-container'>
			<h1 className='investigation-title'>{title}</h1>

			<div className='investigation-chips'>
				{chips.map((chip, i) => (
					<span key={i} className='chip'>
						{chip}
					</span>
				))}
			</div>

			<p className='investigation-question'>{prompt}</p>

			{Object.entries(fields).map(([section, items]) => (
				<div key={section} className='investigation-section'>
					<h3 className='investigation-section-title'>{section}</h3>
					{items.map((label) => (
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
	);
}
