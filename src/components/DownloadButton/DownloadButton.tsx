import { joinProps } from "../../utils/propUtils";
import BaseButton from "../BaseButton";
import { BaseButtonProps } from "../BaseButton/BaseButton";
import './DownloadButtonStyles.scss';

export interface DownloadButtonProps extends BaseButtonProps {
    caption: string;
}

export default function DownloadButton({caption, className, link, onClick}: DownloadButtonProps) {
    return (
        <BaseButton className={joinProps("download-button")} link={link} download>
            <span className="caption">{caption}</span>
            <i className="material-icons">arrow_downward</i>
        </BaseButton>
    )
}