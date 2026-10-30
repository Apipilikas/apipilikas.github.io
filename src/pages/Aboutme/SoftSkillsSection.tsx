import Section from "../../components/Section";
import { useTranslation } from "../../contexts";
import { useTranslatedData } from "../../hooks";
import './SoftSkillsSectionStyles.scss';

export default function SoftSkillsSection() {

    const {getTranslation} = useTranslation();

    const softSkills = useTranslatedData<string[]>("softSkillsSectionContent", []);
    const renderedSoftSkills = softSkills.map(skill => <span className="soft-skill hover box-shadow">{skill}</span>);

    return (
        <Section id="soft-skills-section" caption={getTranslation("softSkillsSection")}>
            <div className="content">
                {renderedSoftSkills}
            </div>
        </Section>
    )
}