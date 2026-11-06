import { useTranslation } from "../../contexts";
import AnimatedText from "../AnimatedText";

interface AnimatedTranslatedTextProps {
    translationKey: string;
    className?: string;
}

export default function AnimatedTranslatedText({translationKey, className}: AnimatedTranslatedTextProps) {
    const {getTranslation} = useTranslation();

    return (
        <AnimatedText caption={getTranslation(translationKey)} className={className}/>
    )
}