import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { joinProps } from '../../utils/propUtils';
import BaseButton, { BaseButtonProps } from '../BaseButton/BaseButton';

export interface TextButtonProps extends BaseButtonProps {
    caption: string,
}

export default function TextButton({ style, caption, className, link, onClick }: TextButtonProps) {
    return (
        <BaseButton 
            className={joinProps("simple-button", className)}
            link={link}
            onClick={onClick}
            style={style}
        >
            {caption}
        </BaseButton>
    )
}