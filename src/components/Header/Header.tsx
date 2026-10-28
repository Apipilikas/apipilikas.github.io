import { useTranslation } from "../../contexts/TranslationProvider";
import useWindowSize from "../../hooks/useWindowSize";
import NavigationBar from "../NavigationBar";
import './HeaderStyles.scss';
import LanguageSelector from "./LanguageSelector";
import MenuContainer from "./MenuContainer";
import ThemeSelector from "./ThemeSelector";

export default function Header() {

    const {getTranslation} = useTranslation();
    const {isMobile} = useWindowSize();

    return (
        <header>
            <div id="header-container">
                <MenuContainer>
                    <div id="main-logo">
                        <img src="/images/ap_logo_2.png" alt="AP Logo"/>
                        <div id="main-logo-desc">
                            <span>{getTranslation("fullName")}</span>
                            <span>{getTranslation("subtitle")}</span>
                        </div>
                    </div>
                </MenuContainer>
                {!isMobile ? <NavigationBar/> : null}
                {/* <ThemeSelector/> */}
                <LanguageSelector/>
            </div>
        </header>
    )
}