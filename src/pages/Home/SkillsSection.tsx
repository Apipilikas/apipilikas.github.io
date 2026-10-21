import { SkillProps, skills } from "./config";
import Section from "./Section";
import './SkillsSectionStyles.scss'

export default function SkillsSection() {

    const renderedSkills = skills.map(skill => <SkillContainer {...skill}/>)

    return (
        <Section id="skills-section" caption="Development Skills">
            <div className="content">
                <div id="skills-slideshow">
                {renderedSkills}
                </div>
            </div>
        </Section>
    )
}

function SkillContainer({imagePath, caption} : SkillProps) {
    return (
        <figure className="slide">
            <img src={imagePath}/>
            <figcaption>{caption}</figcaption>
        </figure>
    )
}