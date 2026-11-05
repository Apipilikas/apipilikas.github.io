import { useSpring, animated } from "@react-spring/web";
import { useLoading } from "../../contexts";
import './LoaderStyles.scss'

export default function Loader() {
    
    const {isReady} = useLoading();

    const loaderStyles = useSpring({
    transform: isReady ? "translateY(-100%)" : "translateY(0%)",
    config: { tension: 150, friction: 60 },
    });

    return (
        <animated.div id="loader" style={loaderStyles}>
            <div className="content">
                <p>Welcome to my personal website!<span>Please wait...</span></p>
                <div className="lds-ripple">
                    <div></div><div></div></div>
                    <p>This may take a little longer...</p>
                    </div>
        </animated.div>
    )
}