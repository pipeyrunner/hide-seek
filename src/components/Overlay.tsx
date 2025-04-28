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
				overflowY: visible ? 'auto' : 'hidden', // ✅ allow vertical scroll inside overlay
				// backgroundColor: blur ? 'rgba(0, 0, 0, 0.5)' : 'transparent', // ✅ make sure there's a dim background
				backdropFilter: blur ? 'blur(8px)' : undefined,
				display: visible ? 'flex' : 'none', // ✅ hide completely when not visible
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'flex-start', // ✅ start from top, allow scrolling down
				padding: '2rem 1rem', // ✅ some space at top/bottom
				zIndex: 1000,
			}}
		>
			<div
				style={{
					width: '100%',
					maxWidth: 600,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '1rem',
				}}
			>
				{children}
			</div>
		</div>
	);
};

export default Overlay;
