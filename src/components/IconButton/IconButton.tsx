import { joinProps } from '../../utils/propUtils';
import BaseButton, { BaseButtonProps } from '../BaseButton/BaseButton';
import './IconButtonStyles.scss'

export interface IconButtonProps extends BaseButtonProps {
    iconId: string
}

export default function IconButton({ iconId, className, link, onClick }: IconButtonProps) {
    return (
        <BaseButton 
            className={joinProps("icon-button", className)}
            link={link}
            onClick={onClick}
        >
        <i className="material-icons">{iconId}</i>
        </BaseButton>
    )
}