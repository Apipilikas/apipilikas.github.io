import { useEffect, useState } from "react";
import { Language, useTranslation } from "../../contexts/TranslationProvider";
import SimpleButton from "../SimpleButton";

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
        <SimpleButton caption={caption} onClick={() => setIsGreek(value => !value)}/>
    )
}