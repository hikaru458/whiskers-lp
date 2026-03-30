"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface GentleDropProps {
  text: string;
  className?: string;
  delay?: number;
  onComplete?: () => void;
}

export function TextScramble({ text, className = "", delay = 0, onComplete }: GentleDropProps) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          // コールバックを呼び出し
          if (onComplete) {
            onComplete();
          }
          // 3秒後にカーソルを消す
          setTimeout(() => {
            setShowCursor(false);
          }, 3000);
        }
      }, 120);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay, onComplete]);

  return (
    <span className={`${className} inline-flex justify-center bg-gradient-to-r from-[#ff6b35] to-[#4ecdc4] bg-clip-text text-transparent`}>
      {displayText}
      {showCursor && (
        <motion.span
          className="inline-block w-0.5 h-[1em] bg-[#ff6b35] ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </span>
  );
}

interface TextRevealProps {
  text: string;
  className?: string;
  charClassName?: string;
}

export function TextReveal({ text, className = "", charClassName = "" }: TextRevealProps) {
  return (
    <span className={`${className} inline-flex flex-wrap justify-center`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className={`${charClassName} inline-block`}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: i * 0.03,
            ease: [0.25, 1, 0.5, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// テキストを1文字ずつ表示するアニメーションコンポーネント
interface CharacterByCharacterTextProps {
  text: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

function CharacterByCharacterText({ 
  text, 
  delay = 0, 
  className = "",
  onComplete 
}: CharacterByCharacterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    
    const startTimeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
        }
      }, 120);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  return (
    <span className={className}>
      {displayText}
      {!isComplete && (
        <motion.span
          className="inline-block w-0.5 h-6 bg-white/60 ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </span>
  );
}

// TypewriterTextコンポーネント - 2行連続でタイプライティング風エフェクト
interface TypewriterTextProps {
  firstLine: string;
  secondLine: string;
  className?: string;
  highlightClassName?: string;
}

export function TypewriterText({ 
  firstLine, 
  secondLine, 
  className = "", 
  highlightClassName = "" 
}: TypewriterTextProps) {
  const [firstLineText, setFirstLineText] = useState("");
  const [secondLineText, setSecondLineText] = useState("");
  const [firstComplete, setFirstComplete] = useState(false);
  const [secondComplete, setSecondComplete] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    // 3秒遅延後に開始
    setTimeout(() => {
      // 1行目のタイプライティング
      let i = 0;
      const interval1 = setInterval(() => {
        if (i <= firstLine.length) {
          setFirstLineText(firstLine.slice(0, i));
          i++;
        } else {
          clearInterval(interval1);
          setFirstComplete(true);
          
          // 1行目完了後、0.2秒後に2行目開始
          setTimeout(() => {
            let j = 0;
            const interval2 = setInterval(() => {
              if (j <= secondLine.length) {
                setSecondLineText(secondLine.slice(0, j));
                j++;
              } else {
                clearInterval(interval2);
                setSecondComplete(true);
              }
            }, 120);
          }, 200);
        }
      }, 120);
    }, 3000);
  }, [firstLine, secondLine]);

  return (
    <div className={`text-center ${className}`}>
      {/* 1行目 */}
      <p className="text-white/90 text-xl md:text-2xl font-bold tracking-[0.15em] mb-3">
        {firstLineText}
        {!firstComplete && firstLineText.length < firstLine.length && (
          <motion.span
            className="inline-block w-0.5 h-6 bg-white/60 ml-1"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </p>
      
      {/* 2行目 */}
      <motion.p 
        className="text-2xl md:text-3xl font-bold tracking-[0.12em]"
        animate={secondComplete ? { 
          scale: [1, 1.02, 1],
          textShadow: [
            "0 0 0px rgba(255,107,53,0)",
            "0 0 20px rgba(255,107,53,0.5)",
            "0 0 0px rgba(255,107,53,0)"
          ]
        } : {}}
        transition={{ duration: 2, repeat: secondComplete ? Infinity : 0, repeatDelay: 1 }}
      >
        <span className={highlightClassName || "text-[#ff6b35]"}>
          {secondLineText}
        </span>
        {firstComplete && !secondComplete && (
          <motion.span
            className="inline-block w-0.5 h-8 bg-[#ff6b35] ml-1"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
        {secondComplete && (
          <motion.span
            className="inline-block w-1 h-8 bg-[#ff6b35] ml-2"
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0, 1, 0, 1, 0] }}
            transition={{ duration: 2.4, times: [0, 0.33, 0.5, 0.66, 0.83, 1] }}
          />
        )}
      </motion.p>
    </div>
  );
}

// BrandStoryTypewriter - Brand Storyセクション用のタイプライティングアニメーション（全7行）
interface LineConfig {
  text: string;
  className: string;
  isGradient?: boolean;
}

export function BrandStoryTypewriter() {
  const lines: LineConfig[] = [
    { text: "Whiskers は、", className: "text-white/60 text-lg tracking-[0.02em]" },
    { text: "大量生産でも、運任せのマッチングでもない。", className: "text-white/60 text-lg tracking-[0.02em] mb-6" },
    { text: "ブランドの想いと、クリエイターの表現を、", className: "text-xl md:text-2xl text-white leading-[1.8] tracking-[0.03em]" },
    { text: "ひげのように繊細に読み取り、", className: "text-xl md:text-2xl text-[#ff6b35] leading-[1.8] tracking-[0.03em]" },
    { text: "最も価値のある1本を届ける存在。", className: "text-xl md:text-2xl text-white leading-[1.8] tracking-[0.03em] mb-12" },
    { text: "だから Whiskers は、", className: "text-white/90 text-xl md:text-2xl font-bold tracking-[0.15em] mb-3" },
    { text: '"ただのUGCサービス" ではない。', className: "text-2xl md:text-3xl font-bold tracking-[0.12em]", isGradient: true },
  ];

  const [displayTexts, setDisplayTexts] = useState<string[]>(Array(lines.length).fill(""));
  const [currentLine, setCurrentLine] = useState(0);
  const [completedLines, setCompletedLines] = useState<boolean[]>(Array(lines.length).fill(false));
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    const typeLine = (lineIndex: number) => {
      if (lineIndex >= lines.length) return;

      let charIndex = 0;
      const line = lines[lineIndex];
      
      const interval = setInterval(() => {
        if (charIndex <= line.text.length) {
          setDisplayTexts(prev => {
            const newTexts = [...prev];
            newTexts[lineIndex] = line.text.slice(0, charIndex);
            return newTexts;
          });
          charIndex++;
        } else {
          clearInterval(interval);
          setCompletedLines(prev => {
            const newCompleted = [...prev];
            newCompleted[lineIndex] = true;
            return newCompleted;
          });
          // 次の行を開始（小さな遅延なしで連続）
          typeLine(lineIndex + 1);
        }
      }, 60); // タイピング速度

      return () => clearInterval(interval);
    };

    // 最初の行から開始
    typeLine(0);
  }, [isInView]);

  return (
    <div ref={containerRef} className="text-center">
      {lines.map((line, index) => (
        <p key={index} className={line.className}>
          {line.isGradient ? (
            <span className="bg-gradient-to-r from-[#ff6b35] to-[#4ecdc4] bg-clip-text text-transparent">
              {displayTexts[index]}
            </span>
          ) : (
            displayTexts[index]
          )}
          {!completedLines[index] && currentLine === index && (
            <motion.span
              className={`inline-block ml-1 ${line.isGradient ? 'w-0.5 h-8 bg-[#ff6b35]' : 'w-0.5 h-6 bg-white/60'}`}
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          )}
        </p>
      ))}
    </div>
  );
}

// CombinedHeroTypewriter - Whiskersと可能性をつなぐを一つのアニメーションとして扱う
interface CombinedHeroTypewriterProps {
  onComplete?: () => void;
}

export function CombinedHeroTypewriter({ onComplete }: CombinedHeroTypewriterProps) {
  const [whiskersText, setWhiskersText] = useState("");
  const [subtitleText, setSubtitleText] = useState("");
  const [phase, setPhase] = useState<"whiskers" | "subtitle" | "complete">("whiskers");
  const [showCursor, setShowCursor] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (hasStarted) return;
    setHasStarted(true);
    
    const whiskers = "Whiskers";
    const subtitle = "可能性をつなぐ";
    let currentIndex = 0;
    
    // Phase 1: Type "Whiskers" character by character
    function typeWhiskers() {
      if (currentIndex < whiskers.length) {
        setWhiskersText(whiskers.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeWhiskers, 120);
      } else {
        // Whiskers done, pause then start subtitle
        setTimeout(() => {
          setPhase("subtitle");
          currentIndex = 0;
          typeSubtitle();
        }, 200);
      }
    }
    
    // Phase 2: Type "可能性をつなぐ" character by character
    function typeSubtitle() {
      if (currentIndex < subtitle.length) {
        setSubtitleText(subtitle.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeSubtitle, 120);
      } else {
        // Subtitle done
        setPhase("complete");
        // アニメーション完了を通知
        if (onComplete) {
          onComplete();
        }
        // 3秒後にカーソルを消す
        setTimeout(() => {
          setShowCursor(false);
        }, 3000);
      }
    }
    
    // Start typing
    typeWhiskers();
  }, [hasStarted, onComplete]);

  return (
    <div className="text-center">
      {/* Whiskers - メインタイトル */}
      <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-6 tracking-[0.1em]">
        <span className="inline-flex justify-center bg-gradient-to-r from-[#ff6b35] to-[#4ecdc4] bg-clip-text text-transparent">
          {whiskersText}
        </span>
      </h1>
      
      {/* 可能性をつなぐ - サブタイトル */}
      <p className="text-2xl sm:text-3xl font-light mb-6 tracking-[0.15em] text-center">
        <span className="bg-gradient-to-r from-[#ff6b35] to-[#4ecdc4] bg-clip-text text-transparent font-medium">
          {subtitleText}
        </span>
      </p>
    </div>
  );
}

interface TypewriterSubtitleProps {
  text: string;
  delay?: number;
  speed?: number;
  start?: boolean;
  onComplete?: () => void;
}

export function TypewriterSubtitle({ text, delay = 0, speed = 120, start = true, onComplete }: TypewriterSubtitleProps) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!start || hasStarted) return;
    
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          // 3秒後にカーソルを消す
          setTimeout(() => {
            setShowCursor(false);
          }, 3000);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay, speed, start, hasStarted]);

  return (
    <p className="text-2xl sm:text-3xl font-light mb-6 tracking-[0.15em] text-center">
      <span className="bg-gradient-to-r from-[#ff6b35] to-[#4ecdc4] bg-clip-text text-transparent font-medium">
        {displayText}
      </span>
      {showCursor && (
        <motion.span
          className="inline-block w-0.5 h-8 bg-[#ff6b35] ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </p>
  );
}
