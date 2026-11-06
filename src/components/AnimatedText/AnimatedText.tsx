import { useSpring, animated } from "@react-spring/web";
import { useState } from "react";

interface AnimatedTextProps {
    caption: string | number;
    className?: string;
}

export default function AnimatedText({caption, className}: AnimatedTextProps) {
    const [displayedText, setDisplayedText] = useState(caption);

    const spanStyles = useSpring({
        opacity: displayedText === caption ? 1 : 0,
        config: { tension: 250, friction: 25 },
        
        onRest: () => {
            if (displayedText !== caption) {
                setDisplayedText(caption);
            }
        }
    });

    return (
        <animated.span className={className} style={spanStyles}>
            {displayedText}
        </animated.span>
    );
}