import { useTranslation } from "../contexts";

export default function useTranslatedData<T = string>(key: string, fallback: T) {
    const {getTranslation, isReady} = useTranslation();

    if (!isReady) return fallback;

    return getTranslation<T>(key) ?? fallback;
}