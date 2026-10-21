import Section from "./Section";
import './AboutmeSectionStyles.scss'
import SimpleButton from "../../components/SimpleButton";
import TypewriterText from "../../components/TypewriterText";
import { SocialNetworkProps, socialNetworks } from "../config";

export default function AboutmeSection() {

    const renderedSocialNetworks = socialNetworks.map(socialNetwork => <SocialNetworkContainer {...socialNetwork}/>)

    return (
        <Section id="main-about-me-section">
            <div className="content">
                <div id="main-about-me-image-content">
                    <img src="/images/me_2.png" alt="me" />
                </div>
                <div className="right-content">
                    <div className="text-area">
                        <TypewriterText texts={["Hello World!", "Καλησπέρα!"]} />
                        <span>I'm <span className="name-text">Aggelos</span></span>
                        <p>A highly reliable and determined <span>software engineer</span> currently pursuing his Master's degree in Software Engineering at the University of Amsterdam.</p>
                    </div>
                    <div className="buttons-area">
                        <SimpleButton caption="MORE ABOUT ME" />
                        <SimpleButton caption="PROJECTS" />
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