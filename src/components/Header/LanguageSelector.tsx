import { useEffect, useState } from "react";
import { Language, useTranslation } from "../../contexts";
import TextButton from "../TextButton";

const greekLanguage = Language.getGreekLanguage();
const englishLanguage = Language.getEnglishLanguage();

export default function LanguageSelector() {
    const {changeLanguage} = useTranslation();

    const [isGreek, setIsGreek] = useState<boolean>(false);
    const caption = !isGreek ? greekLanguage.caption : englishLanguage.caption;
    const selectedLanguage = isGreek ? greekLanguage : englishLanguage;

    useEffect(() => {
        changeLanguage(selectedLanguage);
    }, [selectedLanguage])

    return (
        <TextButton style={{margin:"auto"}} caption={caption} onClick={() => setIsGreek(value => !value)}/>
    )
}