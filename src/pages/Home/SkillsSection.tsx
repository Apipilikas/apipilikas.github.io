import { useSpring, animated } from "@react-spring/web";
import { useState } from "react";
import { SkillProps, skills } from "./config";
import Section from "./Section";
import './SkillsSectionStyles.scss'

export default function SkillsSection() {

    const [isSkillHovered, setIsSkillHovered] = useState(false);

    const scrollingStyles = useSpring({
        from: { transform: "translateX(0%)" },
        to: { transform: "translateX(-50%)" },
        loop: true,
        pause: isSkillHovered,
        config: { duration: 25000 },
    });

    const renderedSkills = [...skills, ...skills].map((skill, index) => <SkillContainer key={index} {...skill} index={index % skills.length}/>)

    return (
        <Section id="skills-section" caption="Development Skills">
            <div className="content">
                <animated.div 
                    id="skills-slideshow" 
                    style={scrollingStyles}
                    onMouseEnter={() => setIsSkillHovered(true)}
                    onMouseLeave={() => setIsSkillHovered(false)}
                >
                    {renderedSkills}
                </animated.div>
            </div>
        </Section>
    )
}

interface SkillsPropsEx {
    index: number
}

function SkillContainer({imagePath, caption, index} : SkillProps & SkillsPropsEx) {
    
    const resolveColor = () => {
        const nth = index + 1;
        
        if (nth % 3 === 1) {
            return "green-theme";
        } else if (nth % 2 === 0) {
            return "yellow-theme";
        } else {
            return "blue-theme";
        }
    }

    return (
        <figure className={`slide ${resolveColor()}`}>
            <img src={imagePath}/>
            <figcaption>{caption}</figcaption>
        </figure>
    )
}