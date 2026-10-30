import Section from "../../components/Section";
import { useTranslation } from "../../contexts";
import { experiences } from "../config";
import './ExperienceSectionStyles.scss';

export default function ExperienceSection() {

    const {getTranslation} = useTranslation();

    const renderedExperiences = experiences.map(experience => <span className="experience hover box-shadow">{experience}</span>)

    return (
        <Section id="experience-section" caption={getTranslation("experienceSection")}>
            <div className="content">
                {renderedExperiences}
            </div>
        </Section>
    )
}