import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { joinProps } from '../../utils/propUtils';
import BaseButton, { BaseButtonProps } from '../BaseButton/BaseButton';

export interface SimpleButtonProps extends BaseButtonProps {
    caption: string,
}

export default function SimpleButton({ caption, className, link, onClick }: SimpleButtonProps) {
    return (
        <BaseButton 
            className={joinProps("simple-button", className)}
            link={link}
            onClick={onClick}
        >
            {caption}
        </BaseButton>
    )
}