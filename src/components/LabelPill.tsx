import React from 'react';

type LabelPillProps = {
    label: string;
};

const colorMap: Record<string, string> = {
    SMALL: '#ffc800',
    MEDIUM: '#ff8c00',
    LARGE: '#fc1403',
};

const LabelPill: React.FC<LabelPillProps> = ({ label }) => {
    const bgColor = colorMap[label.toUpperCase()] ?? '#ccc';

    return (
        <span
            style={{
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                whiteSpace: 'nowrap',
                backgroundColor: bgColor,
                color: '#ffffff',
            }}>
            {label}
        </span>
    );
};

export default LabelPill;
