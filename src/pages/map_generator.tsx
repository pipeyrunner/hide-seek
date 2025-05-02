import React from 'react';
import Layout from '@theme/Layout';
import ExternalRedirectModal from '../components/ExternalRedirectModal';

export default function JetLagRedirectPage() {
	return (
		<Layout description='External link notice: Jet Lag Hide and Seek'>
			<div style={{ backgroundColor: '#202c3c' }}>
				<ExternalRedirectModal
					url='https://taibeled.github.io/JetLagHideAndSeek/'
					displayUrl='taibeled.github.io/JetLagHideAndSeek'
				/>
			</div>
		</Layout>
	);
}
