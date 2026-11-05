import TextButton from "../../components/TextButton";
import { useTranslation } from "../../contexts";
import { SocialNetworkProps } from "../config";
import './ContactContainerStyles.scss';


export default function ContactContainer({name, link, imageName}: SocialNetworkProps) {
    
    const {getTranslation} = useTranslation();
    
    return (
        <section className={`contact-me-container ${imageName} box-shadow hover`}>
                    <div className="content">
                        <h2>{name}</h2>
                        <TextButton caption={`${getTranslation("contactButton")} ${name}`} link={link} />
                    </div>
                    <img src={`images/${imageName}.svg`}/>
                </section>
    )
}