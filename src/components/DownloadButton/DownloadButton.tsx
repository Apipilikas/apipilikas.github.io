import { joinProps } from "../../utils/propUtils";
import AnimatedText from "../AnimatedText";
import BaseButton from "../BaseButton";
import { BaseButtonProps } from "../BaseButton/BaseButton";
import './DownloadButtonStyles.scss';

export interface DownloadButtonProps extends BaseButtonProps {
    caption: string;
}

export default function DownloadButton({caption, className, link, onClick}: DownloadButtonProps) {
    return (
        <BaseButton className={joinProps("download-button")} link={link} download>
            <AnimatedText className="caption" caption={caption}/>
            <i className="material-icons">arrow_downward</i>
        </BaseButton>
    )
}