import Section from "../../components/Section";
import { useTranslation } from "../../contexts";
import { useTranslatedData } from "../../hooks";
import { InfoLineProps } from "../config";
import './InfoSectionStyles.scss';

export default function StatusSection() {

    const {getTranslation} = useTranslation();

    const infoLines = useTranslatedData<InfoLineProps[]>("statusSectionContent", []);
    const renderedInfoLines = infoLines?.map(infoLine => <InfoLine {...infoLine}/>)

    return (
        <Section id="info-section" caption={getTranslation("statusSection")}>
            {renderedInfoLines}
        </Section>
    )
}

function InfoLine({description, content}: InfoLineProps) {
    return (
        <div className="info-line">
            <span className="info-description">{description}</span>
            <span className="info-content">{content}</span>
        </div>
    )
}