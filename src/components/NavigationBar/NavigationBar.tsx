import { Link } from "react-router-dom"
import { pages, PageRouteProps } from "../../pages/config"
import AnimatedTranslatedText from "../AnimatedTranslatedText";
import './NavigationBarStyles.scss'

export default function NavigationBar({onClick} : {onClick? : (page : PageRouteProps) => void}) {

    const renderedPages = pages.map(page => <li><Link onClick={() => onClick?.(page)} to={page.to}><AnimatedTranslatedText translationKey={page.captionKey}/></Link></li>)

    return (
        <nav id="navigation-bar">
            <ul>
                {renderedPages}
            </ul>
        </nav>
    )
}