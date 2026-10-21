import React, { useState, useEffect } from 'react';
import { animated, useSpring } from '@react-spring/web';
import './TypewriterTextStyles.scss';
import { joinProps } from '../../utils/propUtils';

interface TypewriterTextProps {
  texts?: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
}

export default function TypewriterText({
  texts = ["Input1...", "Input2..."],
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
  loop = true,
  className = "",
  showCursor = true
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [selectedTextIndex, setSelectedTextIndex] = useState<number>(0);

  const cursorStyles = useSpring({
    loop: { reverse: true },
    from: { opacity: 1 },
    to: { opacity: 0 },
    config: { duration: 400 },
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let text: string = texts[selectedTextIndex];

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        if (loop) {
          setIsDeleting(true);
        }
      }, pauseDuration);

    } else if (isDeleting) {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(text.substring(0, displayText.length - 1));
        }, deleteSpeed);

      } else {
        setIsDeleting(false);
        setSelectedTextIndex(index => (index + 1) % texts.length)
      }
    } else {
      if (displayText.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayText(text.substring(0, displayText.length + 1));
        }, speed);
      } else if (loop) {
        setIsPaused(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isPaused, texts, speed, deleteSpeed, pauseDuration, loop, selectedTextIndex]);

  return (
    <div className={joinProps("typewriter-container", className)}>
      <span>
        {displayText}
        {showCursor && (
          <animated.span
            style={cursorStyles}
            className="text-cursor"
          >
          |
          </animated.span>
        )}
      </span>
    </div>
  );
};