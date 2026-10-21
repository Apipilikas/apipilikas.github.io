import { news, NewsProps } from "./config"
import Section from "./Section"
import './NewsSectionStyles.scss'
import TextContainer from "../../components/TextContainer"

export default function NewsSection() {

    const renderedNews = news.map(item => <NewsContainer {...item}/>)

    return (
        <Section id="news-section" caption="News">
            <div className="content">
                {renderedNews}
            </div>
        </Section>
    )
}

function NewsContainer({title, date, description} : NewsProps) {
    return <article className="news">
                <TextContainer className="title-container" applySecondaryColor>
                    <h3>{title}</h3>
                </TextContainer>
                <TextContainer className="date-container">
                    <p className="date">{date}</p>
                </TextContainer>
                <TextContainer className="description-container">
                    <p className="description">{description}</p>
                </TextContainer>
            </article>
}