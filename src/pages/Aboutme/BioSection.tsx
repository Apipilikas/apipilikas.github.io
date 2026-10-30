import Section from "../../components/Section";
import { useTranslation } from "../../contexts";
import './BioSectionStyles.scss';

export default function BioSection() {

    const {getTranslation} = useTranslation();

    return (
        <Section id="bio-section" className="box-shadow" caption={getTranslation("bioSection")}>
            <div className="content">
                <p>{getTranslation("bioSectionContent")}</p>
                <img src="images/me.png" alt="me" width="200px" height="200px"/>
            </div>
        </Section>
    )
}