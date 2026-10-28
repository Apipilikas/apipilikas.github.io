import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom";
import { pages } from "../pages/config";
import { FileUtils } from "../utils/fileUtils";

export class Language {
    id: string;
    name: string;
    caption: string;
    country: string;

    constructor (id: string, caption: string, name: string, country: string) {
        this.id = id;
        this.caption = caption;
        this.name = name;
        this.country = country;
    }

    static getGreekLanguage() {
        return new Language("gr", "ΕΛ", "Ελληνικά", "Greece");
    }

    static getEnglishLanguage() {
        return new Language("en", "EN", "English", "USA");
    }
}

const languages = [
    Language.getEnglishLanguage(), 
    Language.getGreekLanguage()
]

export const LanguageMapper = new Map(
    languages.map(language => [language.id, language])
)

interface TranslationProps {
    language: Language;
    changeLanguage: (newLanguage: string | Language) => void;
    getTranslation: <T = string>(id: string) => T;
    isReady: boolean;
}

const TranslationContext = createContext<TranslationProps | undefined>(undefined);

export const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error("useTranslation mus be used within a TranslationProvider!");
    }
    return context;
}

export const TranslationProvider = ({children} : {children: ReactNode}) => {
    const location = useLocation();
    const [language, setLanguage] = useState<Language>(Language.getEnglishLanguage());
    const [translations, setTranslations] = useState<Record<string, string>>({});
    const [isReady, setIsReady] = useState<boolean>(false);

    useEffect(() => {
        loadTranslations();
    }, [location, language])

    const loadedPages = useRef<Set<string>>(new Set());
    const activeLanguageId = useRef<string>(language.id);

    const loadTranslations = async () => {
        let newTranslations: Record<string, string> = {};

        const isLanguageChange = activeLanguageId.current !== language.id;
            
        if (isLanguageChange) {
            setIsReady(false);
            loadedPages.current.clear();
            activeLanguageId.current = language.id;
        }

        if (loadedPages.current.size == 0) {
            const commonTranslations = await FileUtils.readCommonTranslations(language);
            newTranslations = {...commonTranslations};
        }

        const page = pages.find(page => page.to == location.pathname);

        if (page != null && !loadedPages.current.has(page.id)) {
            const pageTranslations = await FileUtils.readTranslations(page, language);
            newTranslations = {...newTranslations, ...pageTranslations};
        }

        if (newTranslations != null) {
            setTranslations(value => {return {...value, ...newTranslations}});
            setIsReady(true);
        }
    }

    const changeLanguage = (newLanguage: string | Language) => {
        if (typeof newLanguage === "string") {
            const resolvedLanguage = LanguageMapper.get(newLanguage);

            if (resolvedLanguage != undefined) {
                setLanguage(resolvedLanguage);
            }
        }
        else {
            setLanguage(newLanguage);
        }
    }

    const getTranslation = <T = string>(id: string): T => (translations[id] || null) as T;

    return (
        <TranslationContext.Provider value={{language, changeLanguage, getTranslation, isReady}}>
            {children}
        </TranslationContext.Provider>
    )
}