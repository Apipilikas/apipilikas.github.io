import { SocialNetworkProps } from '../../pages/config'
import './SocialNetworkContainerStyles.scss'

export default function SocialNetworkContainer({link, imageName, name} : SocialNetworkProps) {
    return (
        <div className="social-network">
            <img src={`/images/${imageName}.svg`} width="20px" height="20px"/>
            <a href={link}>{name}</a>
        </div>
    )
}