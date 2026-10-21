import './TextContainerStyles.scss'
import { joinProps } from '../../utils/propUtils';

export interface TextContainerProps {
    children: React.ReactNode;
    id?: string;
    className?: string;
    primaryColor?: string;
    secondaryColor?: string;
    applySecondaryColor?: boolean;
}

export default function TextContainer({children, id, className, primaryColor, secondaryColor, applySecondaryColor} : TextContainerProps) {
    const styles = {
        '--container-pc': primaryColor,
        '--container-sc': secondaryColor,
    } as React.CSSProperties;
    
    return (
        <div id={id} className={joinProps("text-container", className, applySecondaryColor ? "filled" : "")} style={styles}>
            <div className="border"/>
            {children}
        </div>    
    )
}