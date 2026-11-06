import { ReactNode } from "react";
import { TaskStatus } from "../../contexts";
import { joinProps } from "../../utils/propUtils";
import "./LoadingContainerStyles.scss";

interface LoadingContainerProps {
    status: TaskStatus;
    children: ReactNode;
    error?: string;
    className?: string;
}

export default function LoadingContainer({ status, children, error, className }: LoadingContainerProps) {
    if (status == TaskStatus.Resolved) return <>{children}</>;

    if (status == TaskStatus.Failed) return (
        <div className={joinProps("error", className)}>
            <span className="box-shadow hover">{error}</span>
        </div>
    )

    return (
        <div className={joinProps("loading", className)}></div>
    );
}