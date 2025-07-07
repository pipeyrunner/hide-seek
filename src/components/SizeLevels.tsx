import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

type SizeLevelsProps = {
    small: string;
    medium: string;
    large: string;
    leftTitle?: string;
    rightTitle?: string;
    align?: 'left' | 'right';
};

type SizeRowProps = {
    label: string;
    color: string;
    bgColor: string;
    content: string;
    align: 'left' | 'right';
    isLast?: boolean;
};

const labelColumnWidth = '120px';

const SizeRow: React.FC<SizeRowProps> = ({
    label,
    color,
    bgColor,
    content,
    align,
    isLast,
}) => (
    <div
        style={{
            display: 'flex',
            padding: '0.5rem 0',
            borderBottom: isLast ? 'none' : '1px dashed #ccc',
            gap: '1rem',
            alignItems: 'flex-start',
        }}>
        <div
            style={{
                width: labelColumnWidth,
                display: 'flex',
                justifyContent: 'left',
            }}>
            <span
                style={{
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    whiteSpace: 'nowrap',
                    backgroundColor: bgColor,
                    color: color,
                }}>
                {label}
            </span>
        </div>
        <div
            style={{
                flex: 1,
                textAlign: align,
            }}>
            <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                {content}
            </ReactMarkdown>
        </div>
    </div>
);

const SizeLevels: React.FC<SizeLevelsProps> = ({
    small,
    medium,
    large,
    leftTitle,
    rightTitle,
    align = 'right',
}) => {
    const sizes = [
        {
            label: 'МАЛЕНЬКИЙ',
            color: '#ffffff',
            bgColor: '#ffc800',
            content: small,
        },
        {
            label: 'СРЕДНИЙ',
            color: '#ffffff',
            bgColor: '#ff8c00',
            content: medium,
        },
        {
            label: 'БОЛЬШОЙ',
            color: '#ffffff',
            bgColor: '#fc1403',
            content: large,
        },
    ];

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: '600px',
            }}>
            {(leftTitle || rightTitle) && (
                <div
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        paddingBottom: '0.25rem',
                        borderBottom: '2px solid',
                        marginBottom: '0.5rem',
                        alignItems: 'flex-end',
                    }}>
                    <div
                        style={{
                            width: labelColumnWidth,
                            fontWeight: 'bold',
                            textAlign: 'left',
                        }}>
                        {leftTitle ?? ''}
                    </div>
                    <div
                        style={{
                            flex: 1,
                            fontWeight: 'bold',
                            textAlign: align,
                        }}>
                        {rightTitle ?? ''}
                    </div>
                </div>
            )}

            {sizes.map(({ label, color, bgColor, content }, index) => (
                <SizeRow
                    key={index}
                    label={label}
                    color={color}
                    bgColor={bgColor}
                    content={content}
                    align={align}
                    isLast={index === sizes.length - 1}
                />
            ))}
        </div>
    );
};

export default SizeLevels;
