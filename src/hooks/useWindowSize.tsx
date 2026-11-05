import deviceWidths from '../index.module.scss'
import { useEffect, useState } from "react";

export default function useWindowSize() {
    const [isTablet, setIsTablet] = useState<boolean>(false);
    const [isDesktop, setIsDesktop] = useState<boolean>(false);
    const isMobile = !isTablet && !isDesktop;

    useEffect(() => {
        handleWindowResize();
        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize);
        
    }, [])

    const handleWindowResize = () => {
        setIsTablet(
            window.matchMedia(`only screen and (min-width: ${deviceWidths.tabletMinWidth})`).matches
        );
        setIsDesktop(
            window.matchMedia(`only screen and (min-width: ${deviceWidths.desktopMinWidth})`).matches
        );
    }

    return {
        isMobile,
        isTablet,
        isDesktop
    }
}