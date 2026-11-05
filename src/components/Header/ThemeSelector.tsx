import { useState } from "react";
import IconButton from "../IconButton";

export default function ThemeSelector() {

    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const iconId = !isDarkMode ? "dark_mode" : "light_mode";

    return (
        <IconButton iconId={iconId} onClick={() => setIsDarkMode(value => !value)}/>
    )
}