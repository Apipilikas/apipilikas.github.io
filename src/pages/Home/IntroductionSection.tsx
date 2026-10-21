import Section from "./Section";
import { animated } from '@react-spring/web'
import './IntroductionSectionStyles.scss'
import { useSpring } from "@react-spring/core";
import { useEffect, useState } from "react";
import SimpleButton from "../../components/SimpleButton";

export default function IntroductionSection() {
    return (
        <Section id="welcome-introduction-section">
            <video playsInline id="mobile-video" src="/images/video-mobile-trim.mp4" muted loop autoPlay></video>
            <video id="tablet-desktop-video" src="/images/video.mp4" muted loop autoPlay></video>
            <div className="content">
                <CodeWindow/>
            </div>
        </Section>
    )
}

function CodeWindow() {
    const [run, setRun] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setRun(true);
        }, 4000);

        setTimeout(() => {
            setIsFinished(true);
        }, 8500);
    }, [])

    const lines = (
        <div>
            <ProgressCodeLine 
                loadingText="Core modules loading"
                loadedText="Core modules loaded: Java, C++, Python"
                timeout={3000}
            />
            <ProgressCodeLine
                loadingText="Main skills loading"
                loadedText="Skills: "
                timeout={3750}
            />
            <ProgressCodeLine
                loadingText="Fetching bachelor degree"
                loadedText="BSc Computer Science at AUEB"
                timeout={4000}
            />
            <ProgressCodeLine
                loadingText="Fetching master degree"
                loadedText="MSc Software Engineering at UvA"
                timeout={4250}
            />
            <CodeLine>
                Status: Finilizing master degree.
            </CodeLine>
            {isFinished ? (
                <CodeLine>
                    <ReservedName caption="ag-macbook-pro:~$"/>
                </CodeLine>
            ) : ""}
        </div>
    )

    return (
        <div id="window">
            <div id="window-line">
                <div id="window-line-left-side">
                    <span id="cmd-icon">{'>'}_</span>
                    <span>apipilikas</span>
                </div>
                <div id="window-line-right-side">
                    <img id="window-minimize-button" src="/images/minimize-sign.png" width="15px" height="15px" alt="Minimize button"/>
                    <img id="window-full-screen-button" src="/images/full-screen.png" width="15px" height="15px" alt="Full screen button"/>
                    <img id="window-close-button" src="/images/close.png" width="15px" height="15px" alt="Close button"/>
                </div>
            </div>
            <div id="code-section">
                <CodeLine>
                    <ReservedName caption="ag-macbook-pro:~$"/>
                    ./initialize_engineer.sh --name "Aggelos Pipilikas"
                </CodeLine>
                {run ? lines : ""}
            </div>
        </div>
    )
}

function CodeLine({children} : {children : React.ReactNode}) {
    return (
        <code className="code-line">
            {children}
        </code>
    )
}

interface ProgressCodeLineProps {
    loadingText?: string,
    loadedText?: string,
    timeout?: number
}

function ProgressCodeLine({loadingText, loadedText, timeout} : ProgressCodeLineProps) {
    const [isFinished, setIsFinished] = useState<boolean>(false);
    
    useEffect(() => {
        setTimeout(() => {
            setIsFinished(true)
        }, timeout)
    },[])

    const { dotCount } = useSpring({
    from: { dotCount: 0 },
    to: { dotCount: 4 },
    loop: !isFinished,
    config: { duration: 1500 },
    reset: true,
    });

    const statusText = dotCount.to(n => {
        if (isFinished) return "[ OK ]"; 
        
        const dots = ".".repeat(Math.floor(n));
        
        return `[${dots.padEnd(4, '\u00A0')}]`;
    });
    
    return (
        <CodeLine>
            <animated.span>
                {statusText}
            </animated.span>
            <span> </span>
            <animated.span>
                {isFinished ? loadedText : loadingText}
            </animated.span>
        </CodeLine>
    )
}

function CodeNumber({caption} : {caption : string}) {
    return <span className="code-number">{caption} </span>
}

function ClassName({caption} : {caption : string}) {
    return <span className="class-name">{caption}</span>
}

function VariableName({caption} : {caption : string}) {
    return <span className="variable-name">{caption}</span>
}

function FunctionName({caption} : {caption : string}) {
    return <span className="function-name">{caption}</span>
}

function ReservedName({caption} : {caption : string}) {
    return <span className="reserved-name">{caption}</span>
}

function PlainText({caption} : {caption : string}) {
    return <span className="plain-text">{caption}</span>
}