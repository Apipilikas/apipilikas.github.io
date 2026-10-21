import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { joinProps } from '../../utils/propUtils';
import './SimpleButtonStyles.scss';

export interface SimpleButtonProps {
    caption: string;
    className?: string;
    link?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export default function SimpleButton({ caption, className, link, onClick }: SimpleButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    const spanStyles = useSpring({
        width: isHovered ? '100%' : '0%',
        config: { tension: 550 }
    });

    return (
        <a 
            className={joinProps("simple-button", className)} 
            href={link} 
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <animated.span style={spanStyles}></animated.span>
            {caption}
        </a>
    );
}