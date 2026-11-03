import { Language } from "../contexts";
import { PageRouteProps } from "../pages/config";

export class FileUtils {
    static async readFile(filePath: string) {
        try {
            const response = await fetch(filePath);
    
            if (response.ok) return await response.json();
    
            return null;
        }
        catch (e) {
            return null;
        }
    }

    static async readTranslations(page: PageRouteProps, language: Language) {
        return await this.readTranslationsFromPage(page.id, language);
    }

    static async readCommonTranslations(language: Language) {
        return await this.readTranslationsFromPage("common", language);
    }

    private static async readTranslationsFromPage(pageId: PageRouteProps | string, language: Language) {
        const filePath = `${Directory.Translations}${pageId}/${language.id}.json`;
        return await this.readFile(filePath);
    }
}

export const Directory = {
    Translations: "translations/"
} as const;