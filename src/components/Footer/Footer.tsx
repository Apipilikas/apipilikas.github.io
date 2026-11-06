import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../contexts';
import { pages, socialNetworks } from '../../pages/config';
import AnimatedText from '../AnimatedText';
import AnimatedTranslatedText from '../AnimatedTranslatedText';
import TextContainer from '../TextContainer';
import './FooterStyles.scss'
import SocialNetworkContainer from './SocialNetworkContainer';

export default function Footer() {

    const {getTranslation} = useTranslation();

    const renderedSocialNetworks = socialNetworks.map(socialNetwork => <SocialNetworkContainer {...socialNetwork}/>);
    const renderedPages = pages.map(page => <Link to={page.to}><AnimatedTranslatedText translationKey={page.captionKey}/></Link>);

    return (
        <footer>
            <div className='content'>
                <h1 className="name-text"><AnimatedTranslatedText translationKey="fullName"/></h1>
                <FooterContainer id="social-network-footer" caption={getTranslation("footerConnect")}>
                    {renderedSocialNetworks}
                </FooterContainer>
                <FooterContainer id="pages-footer" caption={getTranslation("footerPages")}>
                    {renderedPages}
                </FooterContainer>
            </div>
            <hr/>
            <p>© 2026 | <AnimatedTranslatedText translationKey="footerDescription"/></p>
        </footer>
    );
}

function Vr() {
    return (
        <div className="vr"></div>
    )
}

interface FooterContainerProps {
    id: string;
    caption: string;
    children: ReactNode;
}

function FooterContainer({id, caption, children} : FooterContainerProps) {
    return (
        <div className="footer-container">
            <Vr/>
            <div id={id} className="content">
                <TextContainer applySecondaryColor>
                    <h3><AnimatedText caption={caption}/></h3>
                </TextContainer>
                {children}
            </div>
        </div>
    )
}