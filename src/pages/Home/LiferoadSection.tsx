import { LiferoadProps } from "../config";
import Section from "../../components/Section";
import './LiferoadSectionStyles.scss'
import { useTranslation } from "../../contexts";
import { useTranslatedData } from "../../hooks";

export default function LiferoadSection() {

    const {getTranslation} = useTranslation();
    
    const liferoad = useTranslatedData<LiferoadProps[]>("liferoadSectionContent", []);
    const renderedLiferoad = liferoad?.map(item => <Liferoad {...item}/>)

    return (
        <Section id="liferoad-section" caption={getTranslation("liferoadSection")}>
            <div className="content">
                {renderedLiferoad}
            </div>
        </Section>
    )
}

function Liferoad({title, subtitle, description, timeline} : LiferoadProps) {

    const {getTranslation} = useTranslation();

    return (
        <div className="liferoad box-shadow">
            <div className="main-info">
                <h3>{title}</h3>
                <h4>{subtitle}</h4>
            </div>
            <p className="description">{description}</p>
            <div className="timeline">
                <p>{getTranslation("liferoadTo")} <span>{timeline.to}</span></p>
                <p>{getTranslation("liferoadFrom")} <span>{timeline.from}</span></p>
            </div>
        </div>
    )
}