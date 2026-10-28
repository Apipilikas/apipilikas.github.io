import Section from "../../components/Section/Section";
import './AboutmeSectionStyles.scss'
import SimpleButton from "../../components/SimpleButton";
import TypewriterText from "../../components/TypewriterText";
import { SocialNetworkProps, socialNetworks } from "../config";
import { useTranslation } from "../../contexts/TranslationProvider";

export default function AboutmeSection() {

    const {getTranslation} = useTranslation();

    const renderedSocialNetworks = socialNetworks.map(socialNetwork => <SocialNetworkContainer {...socialNetwork}/>)
    const aboutmeText = getTranslation<string[]>("aboutmeText") || [];
    const textAreaContent = getTranslation<string[]>("textAreaContent") || [];

    return (
        <Section id="main-about-me-section">
            <div className="content">
                <img id="main-about-me-image" src="/images/me_2.png" alt="me" />
                <div className="right-content">
                    <div className="text-area">
                        <TypewriterText texts={getTranslation<string[]>("aboutmeTexts")} />
                        <span>{aboutmeText[0]} <span className="name-text">{aboutmeText[1]}</span></span>
                        <p>{textAreaContent[0]} <span className="name-text">{textAreaContent[1]}</span> {textAreaContent[2]}</p>
                    </div>
                    <div className="buttons-area">
                        <SimpleButton caption={getTranslation("moreAboutmeButton")} />
                        <SimpleButton caption={getTranslation("projectsButton")} />
                    </div>
                    <div className="social-networks-area">
                        {renderedSocialNetworks}
                    </div>
                </div>
            </div>
        </Section>
    )
}

// https://www.anish7.me/

function SocialNetworkContainer({link, imageName, caption} : SocialNetworkProps) {
    return (
        <div className="social-network">
            <a href={link}>
                <img src={`/images/${imageName}.svg`} width="40px" height="40px"/>
            </a>
        </div>
    )
}