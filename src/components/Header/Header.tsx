import useWindowSize from "../../hooks/useWindowSize";
import NavigationBar from "../NavigationBar";
import './HeaderStyles.scss';
import MenuContainer from "./MenuContainer";

export default function Header() {

    const {isMobile} = useWindowSize();

    return (
        <header>
            <div id="header-container">
                <MenuContainer>
                    <div id="main-logo">
                        <img src="/images/ap_logo_2.png" alt="AP Logo"/>
                        <div id="main-logo-desc">
                            <span>Aggelos Pipilikas</span>
                            <span>Personal Website</span>
                        </div>
                    </div>
                </MenuContainer>
                {!isMobile ? <NavigationBar/> : null}
            </div>
        </header>
    )
}