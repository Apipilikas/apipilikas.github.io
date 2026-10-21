import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { pages, socialNetworks } from '../../pages/config';
import TextContainer from '../TextContainer';
import './FooterStyles.scss'
import SocialNetworkContainer from './SocialNetworkContainer';

export default function Footer() {

    const renderedSocialNetworks = socialNetworks.map(socialNetwork => <SocialNetworkContainer {...socialNetwork}/>);
    const renderedPages = pages.map(page => <Link to={page.to}>{page.caption}</Link>);

    return (
        <footer>
            <div className='content'>
                <h1 className="name-text">Aggelos Pipilikas</h1>
                <FooterContainer id="social-network-footer" caption="Connect">
                    {renderedSocialNetworks}
                </FooterContainer>
                <FooterContainer id="pages-footer" caption="Pages">
                    {renderedPages}
                </FooterContainer>
            </div>
            <hr/>
            <p>© 2026 | Built and designed by Aggelos Pipilikas</p>
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