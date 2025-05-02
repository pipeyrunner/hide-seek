import React from 'react';
import { useHistory } from '@docusaurus/router';

type ExternalRedirectModalProps = {
	title?: string;
	description?: string;
	url: string;
	displayUrl?: string;
};

export default function ExternalRedirectModal({
	title = 'Leaving This Site',
	description = "Just so you know—you're about to leave our site. The external website may have different content or policies.",
	url,
	displayUrl,
}: ExternalRedirectModalProps) {
	const history = useHistory();

	const handleContinue = () => {
		window.location.href = url;
	};

	const handleGoBack = () => {
		history.goBack();
	};

	return (
		<main
			style={{
				minHeight: '80vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#f9f9f9',
				padding: '2rem',
			}}
		>
			<div
				style={{
					backgroundColor: '#fff',
					padding: '2rem',
					borderRadius: '1rem',
					boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
					textAlign: 'center',
					maxWidth: '500px',
					width: '100%',
				}}
			>
				<h1 style={{ marginBottom: '1rem' }}>{title}</h1>
				<p>
					You're about to visit an <strong>external website</strong>:
				</p>
				<p
					style={{ fontStyle: 'italic', marginBottom: '1rem', color: 'green' }}
				>
					<a href={url} target='_blank' rel='noopener noreferrer'>
						{displayUrl || url}
					</a>
				</p>
				<p>{description}</p>

				<div
					style={{
						marginTop: '2rem',
						display: 'flex',
						justifyContent: 'center',
						gap: '1rem',
					}}
				>
					<button
						onClick={handleGoBack}
						style={{
							padding: '0.75rem 1.5rem',
							fontSize: '1rem',
							borderRadius: '0.5rem',
							border: '1px solid #ccc',
							backgroundColor: '#fff',
							color: '#333',
							cursor: 'pointer',
							transition: 'background-color 0.2s',
						}}
						onMouseOver={(e) =>
							(e.currentTarget.style.backgroundColor = '#f0f0f0')
						}
						onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
					>
						Go Back
					</button>
					<button
						onClick={handleContinue}
						style={{
							padding: '0.75rem 1.5rem',
							fontSize: '1rem',
							borderRadius: '0.5rem',
							border: '1px solid #ff3b3b',
							backgroundColor: '#ff3b3b',
							color: '#fff',
							cursor: 'pointer',
							transition: 'background-color 0.2s',
							fontWeight: 'bold',
						}}
						onMouseOver={(e) =>
							(e.currentTarget.style.backgroundColor = 'rgb(216, 62, 62)')
						}
						onMouseOut={(e) =>
							(e.currentTarget.style.backgroundColor = '#ff3b3b')
						}
					>
						Continue
					</button>
				</div>
			</div>
		</main>
	);
}
