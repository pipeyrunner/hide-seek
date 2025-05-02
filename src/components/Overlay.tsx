import React, { useEffect } from 'react';

type OverlayProps = {
	visible: boolean;
	children: React.ReactNode;
	blur?: boolean;
};

const Overlay: React.FC<OverlayProps> = ({
	visible,
	children,
	blur = true,
}) => {
	useEffect(() => {
		if (visible) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [visible]);

	return (
		<div
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				overflowY: visible ? 'auto' : 'hidden',
				backdropFilter: blur ? 'blur(8px)' : undefined,
				display: visible ? 'flex' : 'none',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'flex-start',
				// padding: '2rem 1rem',
				zIndex: 1000,
			}}
		>
			<div
				style={{
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginTop: '2rem',
				}}
			>
				{children}
			</div>
		</div>
	);
};

export default Overlay;
