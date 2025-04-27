import React from 'react';

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
	return (
		<div
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 1000,
				opacity: visible ? 1 : 0,
				pointerEvents: visible ? 'auto' : 'none',
				transition: '0.3s',
				backdropFilter: blur ? 'blur(8px)' : undefined,
			}}
		>
			{children}
		</div>
	);
};

export default Overlay;
