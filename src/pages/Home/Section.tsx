import React from "react";
import './SectionStyles.scss'

export interface SectionProps {
    id : string, 
    caption? : string, 
    children : React.ReactNode
}

export default function Section({id, caption, children} : SectionProps) {
    return (
        <section id={id}>
            {caption ? <h2>{caption}</h2> : null}
            {children}
        </section>
    )
}