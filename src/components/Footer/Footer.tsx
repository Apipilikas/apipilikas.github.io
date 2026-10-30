import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../contexts';
import { pages, socialNetworks } from '../../pages/config';
import TextContainer from '../TextContainer';
import './FooterStyles.scss'
import SocialNetworkContainer from './SocialNetworkContainer';

export default function Footer() {

    const {getTranslation} = useTranslation();

    const renderedSocialNetworks = socialNetworks.map(socialNetwork => <SocialNetworkContainer {...socialNetwork}/>);
    const renderedPages = pages.map(page => <Link to={page.to}>{getTranslation(page.captionKey)}</Link>);

    return (
        <footer>
            <div className='content'>
                <h1 className="name-text">{getTranslation("fullName")}</h1>
                <FooterContainer id="social-network-footer" caption={getTranslation("footerConnect")}>
                    {renderedSocialNetworks}
                </FooterContainer>
                <FooterContainer id="pages-footer" caption={getTranslation("footerPages")}>
                    {renderedPages}
                </FooterContainer>
            </div>
            <hr/>
            <p>© 2026 | {getTranslation("footerDescription")}</p>
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
                    <h3>{caption}</h3>
                </TextContainer>
                {children}
            </div>
        </div>
    )
}