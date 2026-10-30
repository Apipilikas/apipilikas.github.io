import React, { CSSProperties, ReactNode, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { joinProps } from '../../utils/propUtils';
import './BaseButtonStyles.scss';

export interface BaseButtonProps {
    className?: string,
    link?: string,
    onClick?: React.MouseEventHandler<HTMLAnchorElement>
    style?: CSSProperties;
}

interface BaseButtonPropsEx {
    children: ReactNode
}

export default function BaseButton({ className, link, onClick, style, children }: BaseButtonProps & BaseButtonPropsEx) {
    const [isHovered, setIsHovered] = useState(false);

    const spanStyles = useSpring({
        width: isHovered ? '100%' : '0%',
        config: { tension: 550 }
    });

    return (
        <a 
            className={joinProps("base-button", className, "box-shadow", "hover")} 
            href={link} 
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={style}
        >
            <animated.span style={spanStyles}></animated.span>
            <div className="content">
                {children}
            </div>
        </a>
    );
}