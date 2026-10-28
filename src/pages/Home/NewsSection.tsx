import { NewsProps } from "./config"
import Section from "../../components/Section/Section"
import './NewsSectionStyles.scss'
import TextContainer from "../../components/TextContainer"
import { useTranslation } from "../../contexts/TranslationProvider"
import { useEffect, useState } from "react"

export default function NewsSection() {

    const {language, getTranslation, isReady} = useTranslation();
    const [news, setNews] = useState<NewsProps[]>([]);

    useEffect(() => {
        setNews(getTranslation<NewsProps[]>("newsContent"))
    }, [language, isReady])

    const renderedNews = news?.map(item => <NewsContainer {...item}/>)

    return (
        <Section id="news-section" caption={getTranslation("newsSection")}>
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