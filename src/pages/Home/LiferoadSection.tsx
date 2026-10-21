import { liferoad, LiferoadProps } from "./config";
import Section from "./Section";
import './LiferoadSectionStyles.scss'

export default function LiferoadSection() {

    const renderedLiferoad = liferoad.map(item => <Liferoad {...item}/>)

    return (
        <Section id="liferoad-section" caption="Liferoad">
            <div className="content">
                {renderedLiferoad}
            </div>
        </Section>
    )
}

function Liferoad({title, subtitle, description, timeline} : LiferoadProps) {
    return (
        <div className="liferoad">
            <div className="main-info">
                <h3>{title}</h3>
                <h4>{subtitle}</h4>
            </div>
            <p className="description">{description}</p>
            <div className="timeline">
                <p>TO <span>{timeline.to}</span></p>
                <p>FROM <span>{timeline.from}</span></p>
            </div>
        </div>
    )
}