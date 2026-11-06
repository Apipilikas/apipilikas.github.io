import React from "react";
import AnimatedText from "../AnimatedText";
import './SectionStyles.scss'

export interface SectionProps {
    id: string;
    className?: string;
    caption?: string;
    children: React.ReactNode;
}

export default function Section({id, className, caption, children} : SectionProps) {
    return (
        <section id={id} className={className}>
            {caption ? <h2><AnimatedText caption={caption}/></h2> : null}
            {children}
        </section>
    )
}