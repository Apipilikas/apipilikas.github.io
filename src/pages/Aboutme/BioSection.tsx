import Section from "../../components/Section";
import './BioSectionStyles.scss';

export default function BioSection() {
    return (
        <Section id="bio-section" caption="Who Am I?">
            <div className="content">
                <p>
                    Hello there! I'm Aggelos (Evaggelos) Pipilikas. I'm 25 years old and
                    I will soon be studying Software Engineering at University of Amsterdam.
                    I describe myself as a highly determined-perfectionist IT person who you can rely on.
                    Areas of interest are Software engineering, Machine Learning and Artificial Intelligence.        
                </p>
                <img src="images/me.png" alt="me" width="200px" height="200px"/>
            </div>
        </Section>
    )
}