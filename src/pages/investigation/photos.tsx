import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import InvestigationNav from '../../components/investigationNav';
import uploadPlaceholder from '/static/img/default-placeholder.png'; // replace with your actual placeholder image path

const allPrompts: Record<string, string[]> = {
	'All Games': [
		'A Tree',
		'The Sky',
		'You',
		'Widest Street',
		'Tallest Structure in Your Sightline',
		'Any Building Visible from Station',
	],
	'Add for Medium & Large': [
		'Tallest Building Visible from Station',
		'Trace Nearest Street/Path',
		'Two Buildings',
		'Restaurant Interior',
		'Train Platform',
		'Park',
		'Grocery Store Aisle',
		'Place of Worship',
	],
	'Add for Large': [
		'½ Mile of Streets Traced',
		'Tallest Mountain Visible from Station',
		'Biggest Body of Water in Your Zone',
		'Five Buildings',
	],
};

export default function Photos() {
	const [photos, setPhotos] = useState<Record<string, string>>({});
	const [zoomed, setZoomed] = useState<string | null>(null);

	useEffect(() => {
		const saved = localStorage.getItem('photosNotes');
		if (saved) setPhotos(JSON.parse(saved));
	}, []);

	useEffect(() => {
		localStorage.setItem('photosNotes', JSON.stringify(photos));
	}, [photos]);

	const handleUpload = (label: string, file: File) => {
		if (!file.type.toLowerCase().includes('image')) return;
		const img = new Image();
		const reader = new FileReader();

		reader.onload = (event) => {
			img.onload = () => {
				const maxDim = 1024;
				const scale = Math.min(maxDim / img.width, maxDim / img.height, 1);

				const canvas = document.createElement('canvas');
				canvas.width = img.width * scale;
				canvas.height = img.height * scale;

				const ctx = canvas.getContext('2d');
				if (!ctx) return;

				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

				// Export as JPEG at ~70% quality
				const compressed = canvas.toDataURL('image/jpeg', 0.7);
				setPhotos((prev) => ({ ...prev, [label]: compressed }));
			};

			if (event.target?.result) {
				img.src = event.target.result as string;
			}
		};

		reader.readAsDataURL(file);
	};

	const handleDrop = (e: React.DragEvent, label: string) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		if (file) handleUpload(label, file);
	};

	const removePhoto = (label: string) => {
		const updated = { ...photos };
		delete updated[label];
		setPhotos(updated);
	};

	return (
		<Layout title='6. Photos'>
			<InvestigationNav />
			<div className='investigation-container'>
				<h1 className='investigation-title'>6. PHOTOS</h1>
				<div className='investigation-chips'>
					<span className='chip'>DRAW 1</span>
					<span className='chip'>S/M: 10 MIN</span>
					<span className='chip'>L: 20 MIN</span>
				</div>
				<p className='investigation-question'>Send a photo of Subject</p>

				{Object.entries(allPrompts).map(([section, prompts]) => (
					<div key={section} className='investigation-section'>
						<h3 className='investigation-section-title'>{section}</h3>
						{prompts.map((label) => (
							<div
								key={label}
								className='investigation-field'
								style={{ alignItems: 'center', minHeight: '110px' }}
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => handleDrop(e, label)}
							>
								<label className='field-label' style={{ textAlign: 'left' }}>
									{label}
								</label>
								<div
									style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
								>
									{photos[label] ? (
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												gap: '0.5rem',
											}}
										>
											<button onClick={() => removePhoto(label)}>Remove</button>
											<img
												src={photos[label]}
												alt={label}
												style={{
													width: 100,
													height: 100,
													objectFit: 'cover',
													cursor: 'pointer',
													borderRadius: 6,
													border: '1px solid #ccc',
												}}
												onClick={() => setZoomed(label)}
											/>
										</div>
									) : (
										<label
											htmlFor={`upload-${label}`}
											style={{
												width: 100,
												height: 100,
												border: '1px dashed #aaa',
												borderRadius: 6,
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												cursor: 'pointer',
												background: `url(${uploadPlaceholder}) center/50% no-repeat`,
											}}
										>
											<input
												id={`upload-${label}`}
												type='file'
												accept='image/*'
												onChange={(e) =>
													e.target.files?.[0] &&
													handleUpload(label, e.target.files[0])
												}
												style={{ display: 'none' }}
											/>
										</label>
									)}
								</div>
							</div>
						))}
					</div>
				))}

				{zoomed && (
					<div className='card-modal-overlay' onClick={() => setZoomed(null)}>
						<div
							className='card-modal-content'
							onClick={(e) => e.stopPropagation()}
						>
							<img
								src={photos[zoomed]}
								alt='Zoomed preview'
								style={{ maxWidth: '100%', maxHeight: '80vh' }}
							/>
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
}
