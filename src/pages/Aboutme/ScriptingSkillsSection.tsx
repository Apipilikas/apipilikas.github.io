import Section from "../../components/Section";
import { useTranslation } from "../../contexts";
import { SkillProps, skills } from "../config";
import './ScriptingSkillsSectionStyles.scss';

export default function ScriptingSkillsSection() {

    const {getTranslation} = useTranslation();

    const renderedSkills = skills.map((skill, index) => <ScriptingSkill key={index} {...skill} />);

    return (
        <Section id="scripting-skills-section" caption={getTranslation("scriptingSkillsSection")}>
            <div className="content">
                {renderedSkills}
            </div>
        </Section>
    )
}

function ScriptingSkill({imagePath, caption, level} : SkillProps) {
    const percentage = (level/5) * 100;

    return (
        <article className="scripting-skill hover box-shadow">
            <div className="top-container">
                <div className="skill-title-container">
                    <img src={imagePath} />
                    <h3>{caption}</h3>
                </div>
                <span className="skill-level">{level} / 5</span>
            </div>
            
            <div className="border-progress-bar">
                <div 
                    className="progress-bar" 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </article>
    )
}