---
sidebar_position: 2
---
# Choosing a Transit System

Your local transit system is the backbone of *Hide and Seek*. While this game can be played with cars or on foot, as we will detail later, we **strongly reccomend using public transit for this game**. *Hide and Seek* can be played on trains, trams, metros, light rails, buses, ferries, or any other form of public transit, but you'll need to define which systems are in play before starting your game. Given that each hiding zone will be centered around a transit station, it's crucial that your game includes a sufficient number of stations to keep it engaging and open-ended–this should determine how many different systems you'll want to include. (If, for example, you have a metro system that only has a few dozen stops, you should consider layering a bus system on top of it to increase complexity.)

Here is our best estimate for ideal map size and transit complexity in different scale games:


import SizeLevels from '@site/src/components/SizeLevels';

<SizeLevels
leftTitle="Game Size"
rightTitle="Transit Complexity/Map Size"
align="left"
small={'30 – 100 stations; 10 – 100 sq. miles'}
medium={'100 – 500 stations; 100 – 1,000 sq. miles'}
large={'500+ stations; 1,000+ sq. miles'}
/>

*(As a point of comparison, our game in Switzerland comprised about 1,800 stations, and our game in Japan was slightly over 8,500. Both would be considered "Large.")*

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

const labelColumnWidth = '80px';

const SizeRow: React.FC`<SizeRowProps>` = ({
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
        }}
    >
        <div
            style={{
                width: labelColumnWidth,
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <span
                style={{
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    whiteSpace: 'nowrap',
                    backgroundColor: bgColor,
                    color: color,
                }}
            >
                {label}
          
        `</div>`
        <div
            style={{
                flex: 1,
                textAlign: align,
            }}
        >
            `<ReactMarkdown remarkPlugins={[remarkBreaks]}>`
                {content}
            `</ReactMarkdown>`
        `</div>`
    `</div>`
);

const SizeLevels: React.FC`<SizeLevelsProps>` = ({
    small,
    medium,
    large,
    leftTitle,
    rightTitle,
    align = 'right',
}) => {
    const sizes = [
        {
            label: 'SMALL',
            color: '#ffffff',
            bgColor: '#ffc800',
            content: small,
        },
        {
            label: 'MEDIUM',
            color: '#ffffff',
            bgColor: '#ff8c00',
            content: medium,
        },
        {
            label: 'LARGE',
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
            }}
        >
            {(leftTitle || rightTitle) && (
                <div
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        paddingBottom: '0.25rem',
                        borderBottom: '2px solid #000',
                        marginBottom: '0.5rem',
                        alignItems: 'flex-end',
                    }}
                >
                    <div
                        style={{
                            width: labelColumnWidth,
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}
                    >
                        {leftTitle ?? ''}`</div>`
                    <div
                        style={{
                            flex: 1,
                            fontWeight: 'bold',
                            textAlign: align,
                        }}
                    >
                        {rightTitle ?? ''}
                    `</div>`
                `</div>`
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
            ))}`</div>`
    );
};

export default SizeLevels;

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

const labelColumnWidth = '80px';

const SizeRow: React.FC`<SizeRowProps>` = ({
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
        }}
    >
        <div
            style={{
                width: labelColumnWidth,
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <span
                style={{
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    whiteSpace: 'nowrap',
                    backgroundColor: bgColor,
                    color: color,
                }}
            >
                {label}
          
        `</div>`
        <div
            style={{
                flex: 1,
                textAlign: align,
            }}
        >
            `<ReactMarkdown remarkPlugins={[remarkBreaks]}>`
                {content}
            `</ReactMarkdown>`
        `</div>`
    `</div>`
);

const SizeLevels: React.FC`<SizeLevelsProps>` = ({
    small,
    medium,
    large,
    leftTitle,
    rightTitle,
    align = 'right',
}) => {
    const sizes = [
        {
            label: 'SMALL',
            color: '#ffffff',
            bgColor: '#ffc800',
            content: small,
        },
        {
            label: 'MEDIUM',
            color: '#ffffff',
            bgColor: '#ff8c00',
            content: medium,
        },
        {
            label: 'LARGE',
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
            }}
        >
            {(leftTitle || rightTitle) && (
                <div
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        paddingBottom: '0.25rem',
                        borderBottom: '2px solid #000',
                        marginBottom: '0.5rem',
                        alignItems: 'flex-end',
                    }}
                >
                    <div
                        style={{
                            width: labelColumnWidth,
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}
                    >
                        {leftTitle ?? ''}`</div>`
                    <div
                        style={{
                            flex: 1,
                            fontWeight: 'bold',
                            textAlign: align,
                        }}
                    >
                        {rightTitle ?? ''}
                    `</div>`
                `</div>`
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
            ))}`</div>`
    );
};

export default SizeLevels;
