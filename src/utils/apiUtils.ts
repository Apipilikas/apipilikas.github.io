import { mapJsonToClass } from "../decorators/jsonProperty";

export class ApiUtils {
    
    static async makeGetRequest<T>(url: string, ClassType?: new () => any): Promise<T> {
        let myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");

        let init = {
            method: "GET",
            headers: myHeaders
        };

        const response = await fetch(url, init);

        if (response.status == 200) {
            const json = await response.json();

            if (ClassType) {
                if (Array.isArray(json)) {
                    return json.map(item => mapJsonToClass(ClassType, item)) as T;
                } else {
                    return mapJsonToClass(ClassType, json) as unknown as T;
                }
            }

            return json as T;
        }

        throw new Error(
            `I'm very sorry to inform you that you got a response with status ${response.status}. Don't panik.
            You got this as I use the GitHub API to fetch all the information needed for my personal profile and repositories.
            To be able to refresh and see the page properly, you will have to wait for an hour or so.`
        );
    }
}