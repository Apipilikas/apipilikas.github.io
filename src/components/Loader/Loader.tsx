import { useSpring, animated } from "@react-spring/web";
import { useLoading, useTranslation } from "../../contexts";
import './LoaderStyles.scss'

export default function Loader() {
    
    const {getTranslation} = useTranslation();
    const {isReady} = useLoading();

    const loaderContent = getTranslation<string[]>("loaderContent") || [];

    const loaderStyles = useSpring({
    transform: isReady ? "translateY(-100%)" : "translateY(0%)",
    config: { tension: 150, friction: 60 },
    });

    return (
        <animated.div id="loader" style={loaderStyles}>
            <div className="content">
                <p>{loaderContent[0]}<span>{loaderContent[1]}</span></p>
                <div className="lds-ripple">
                    <div></div><div></div></div>
                    <p>{getTranslation("loaderText")}</p>
                    </div>
        </animated.div>
    )
}