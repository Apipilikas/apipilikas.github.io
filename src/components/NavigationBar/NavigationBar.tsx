import { Link } from "react-router-dom"
import { useTranslation } from "../../contexts"
import { pages, PageRouteProps } from "../../pages/config"
import './NavigationBarStyles.scss'

export default function NavigationBar({onClick} : {onClick? : (page : PageRouteProps) => void}) {

    const {getTranslation} = useTranslation();
    const renderedPages = pages.map(page => <li><Link onClick={() => onClick?.(page)} to={page.to}>{getTranslation(page.captionKey)}</Link></li>)

    return (
        <nav id="navigation-bar">
            <ul>
                {renderedPages}
            </ul>
        </nav>
    )
}