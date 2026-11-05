import { useSpring, animated } from "@react-spring/web";
import { ReactNode, useState } from "react";
import { useWindowSize } from "../../hooks";
import NavigationBar from "../NavigationBar";
import { PageRouteProps } from "../../pages/config"
import './MenuContainerStyles.scss'
import LanguageSelector from "./LanguageSelector";

export default function MenuContainer({children} : {children : ReactNode}) {
    
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {isMobile} = useWindowSize();

    const handleOnNavigationBarClick = (_ : PageRouteProps) => {
        setIsOpen(false);
    }

    const handleOnMenuButtonClick = () => {
        setIsOpen(value => !value);
    }
    
    return (
        <>
            <div id="menu-container">
                {children}
                {isMobile ? 
                <>
                    <MenuButton onClick={handleOnMenuButtonClick}/>
                    <LanguageSelector/> 
                </>
                : null}
            </div>
            {isMobile ? <OverlayNavigationBar isOpen={isOpen} onClick={handleOnNavigationBarClick}/> : null}
        </>
    )
}

function MenuButton({onClick} : {onClick : () => void}) {
    return (
        <div id="menu-button" onClick={onClick}>
                <img src="/images/menu.png"/>
        </div>
    )
}

interface OverlayNavigationBarProps {
    isOpen: boolean,
    onClick? : (page : PageRouteProps) => void
}

function OverlayNavigationBar({isOpen, onClick} : OverlayNavigationBarProps) {

    const menuStyles = useSpring({
        transform: isOpen ? "translateY(0%)" : "translateY(-100%)",
        config: { tension: 150, friction: 60 },
    });

    return (
        <animated.div style={menuStyles} className="overlay-navigation-bar">
            <NavigationBar onClick={onClick}/>
        </animated.div>
    )
}