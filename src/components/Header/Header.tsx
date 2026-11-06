import { useTranslation } from "../../contexts";
import { useWindowSize } from "../../hooks";
import AnimatedTranslatedText from "../AnimatedTranslatedText";
import NavigationBar from "../NavigationBar";
import './HeaderStyles.scss';
import LanguageSelector from "./LanguageSelector";
import MenuContainer from "./MenuContainer";
import ThemeSelector from "./ThemeSelector";

export default function Header() {

    const {getTranslation} = useTranslation();
    const {isMobile, isTablet, isDesktop} = useWindowSize();

    return (
        <header>
            <div id="header-container">
                <MenuContainer>
                    <div id="main-logo">
                        <img src="/images/ap_logo_2.png" alt="AP Logo"/>
                        <div id="main-logo-desc">
                            <AnimatedTranslatedText translationKey="fullName"/>
                            <AnimatedTranslatedText translationKey="subtitle"/>
                        </div>
                    </div>
                    {isTablet && !isDesktop ? <LanguageSelector/> : null}
                </MenuContainer>
                {!isMobile ? <NavigationBar/> : null}
                {/* <ThemeSelector/> */}
                {isDesktop ? <LanguageSelector/> : null}
            </div>
        </header>
    )
}