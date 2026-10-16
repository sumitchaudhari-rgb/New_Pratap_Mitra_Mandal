"use client";

import { useState } from "react";
import {
  Brain,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Share2,
  RotateCcw,
  Sparkles,
  Trophy,
  Award,
  ChevronRight,
  Flame,
  Volume2,
} from "lucide-react";
import { QUIZ_QUESTIONS, QuizQuestion } from "@/lib/data/quiz";

interface DeviQuizProps {
  locale: string;
}

// Pure Web Audio API temple bell synthesizer
function playTempleChime(isCorrect: boolean) {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (isCorrect) {
      // Ascending celebratory chime
      const notes = [587.33, 880, 1174.66];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const now = ctx.currentTime + idx * 0.12;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.15, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.7);
      });
    } else {
      // Gentle soft tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = "sine";
      osc.frequency.setValueAtTime(320, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.1, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    }
  } catch {
    // Ignore audio errors
  }
}

export default function DeviQuiz({ locale }: DeviQuizProps) {
  const isMr = locale === "mr";

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [participantName, setParticipantName] = useState<string>("");
  const [shared, setShared] = useState<boolean>(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex];
  const progressPercent = ((currentIndex + (isAnswered ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100;

  // Handle Option Selection
  const handleSelect = (idx: number) => {
    if (isAnswered) return;

    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      playTempleChime(true);
    } else {
      playTempleChime(false);
    }
  };

  // Next Question
  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      setIsFinished(true);
    }
  };

  // Restart Quiz
  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowHint(false);
    setIsFinished(false);
    setShared(false);
  };

  // WhatsApp Share Result
  const handleShareResult = () => {
    const total = QUIZ_QUESTIONS.length;
    const nameStr = participantName.trim() ? `मी (${participantName.trim()}) ` : "मी ";
    const text = isMr
      ? `🏆 ${nameStr}न्यु प्रताप मित्र मंडळ, डांगरवाडा असोदा आयोजित 'श्री छिन्नमस्ता माता व नवदुर्गा प्रश्नमंजुषेत' ${total} पैकी ${score} गुण मिळवले! 🌸\n\nतुम्हीही देवीबद्दलचे आपले ज्ञान तपासा:`
      : `🏆 ${nameStr}scored ${score}/${total} in the Shri Chhinnamasta Mata & Navdurga Quiz by New Pratap Mitra Mandal, Dangarvada Asoda! 🌸\n\nTest your divine knowledge here:`;
    const url = typeof window !== "undefined" ? window.location.href : "https://newpratapmandal.org/quiz";

    if (navigator.share) {
      navigator
        .share({ title: isMr ? "प्रश्नमंजुषा निकाल" : "Quiz Result", text, url })
        .catch(() => {});
    } else {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${text}\n${url}`
      )}`;
      window.open(whatsappUrl, "_blank");
    }

    setShared(true);
    setTimeout(() => setShared(false), 2500);
  };

  // Celebration Evaluation
  const getBadge = () => {
    if (score === 10) {
      return {
        title_mr: "🏆 दशमहाविद्या विद्वान",
        title_en: "🏆 Supreme Devi Scholar",
        desc_mr: "अद्भुत! तुमचे देवीबद्दलचे आणि मंडळाबद्दलचे ज्ञान परिपूर्ण व अलौकिक आहे.",
        desc_en: "Outstanding! Perfect score with deep devotional knowledge.",
        color: "text-amber-500",
      };
    }
    if (score >= 7) {
      return {
        title_mr: "🌟 निष्ठावंत भक्त",
        title_en: "🌟 Devoted Disciple",
        desc_mr: "उत्कृष्ट! नवरात्रोत्सव व श्री छिन्नमस्ता मातेबद्दल तुमचे ज्ञान वाखाणण्याजोगे आहे.",
        desc_en: "Excellent! Great understanding of the festival and Maa Chhinnamasta.",
        color: "text-primary",
      };
    }
    if (score >= 4) {
      return {
        title_mr: "🌸 जिज्ञासू साधक",
        title_en: "🌸 Spiritual Learner",
        desc_mr: "छान प्रयत्न! मातेच्या कृपेने तुमच्या ज्ञानामध्ये अधिक भर पडो.",
        desc_en: "Good attempt! May Goddess Chhinnamasta bless your spiritual journey.",
        color: "text-gold",
      };
    }
    return {
      title_mr: "🪔 नवप्रवेशी भाविक",
      title_en: "🪔 Devotional Seeker",
      desc_mr: "प्रयत्न केल्याबद्दल धन्यवाद! माहिती वाचून पुन्हा प्रश्नमंजुषा सोडवा.",
      desc_en: "Thank you for participating! Review the answers and try again.",
      color: "text-muted-foreground",
    };
  };

  const badge = getBadge();

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
      {/* ── QUIZ HEADER ──────────────────────────────────── */}
      {!isFinished && (
        <div className="rounded-3xl border-2 border-gold/40 bg-card p-5 sm:p-7 shadow-sm">
          {/* Top Progress Info */}
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-3">
            <span className="flex items-center gap-1.5 text-primary">
              <Brain size={16} />
              <span>
                {isMr
                  ? `प्रश्न ${currentIndex + 1} / ${QUIZ_QUESTIONS.length}`
                  : `Question ${currentIndex + 1} of ${QUIZ_QUESTIONS.length}`}
              </span>
            </span>

            <span className="flex items-center gap-1 rounded-full bg-gold/15 border border-gold/40 px-3 py-0.5 text-xs font-extrabold text-gold">
              <Trophy size={13} />
              <span>
                {isMr ? `गुण: ${score}` : `Score: ${score}`}
              </span>
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-gradient-to-r from-primary via-accent to-gold transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Current Question */}
          <div className="mt-5">
            <h2 className="deva-heading text-lg sm:text-2xl font-extrabold text-foreground leading-relaxed">
              {isMr ? currentQ.question_mr : currentQ.question_en}
            </h2>
          </div>

          {/* Hint Trigger */}
          <div className="mt-3">
            <button
              onClick={() => setShowHint(!showHint)}
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline min-h-[32px]"
            >
              <HelpCircle size={14} />
              <span>
                {showHint
                  ? isMr
                    ? "संकेत लपवा"
                    : "Hide Hint"
                  : isMr
                  ? "संकेत / क्लू हवा आहे का? (Hint)"
                  : "Need a hint?"}
              </span>
            </button>

            {showHint && (
              <p className="deva-body text-xs text-muted-foreground bg-accent/5 border border-accent/20 rounded-xl p-3 mt-1.5 animate-fade-in">
                💡 {isMr ? currentQ.hint_mr : currentQ.hint_en}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── QUESTION OPTIONS ─────────────────────────────── */}
      {!isFinished && (
        <div className="space-y-3">
          {(isMr ? currentQ.options_mr : currentQ.options_en).map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;

            let buttonStyle = "border-border/80 bg-card hover:border-gold/60 text-foreground/90";

            if (isAnswered) {
              if (isCorrect) {
                buttonStyle =
                  "border-2 border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-100 shadow-md font-bold";
              } else if (isSelected) {
                buttonStyle =
                  "border-2 border-red-500 bg-red-50 text-red-950 dark:bg-red-950/40 dark:text-red-100";
              } else {
                buttonStyle = "border-border/60 bg-muted/30 text-muted-foreground opacity-60";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
                type="button"
                className={`w-full flex items-center justify-between gap-3 rounded-2xl border p-4 sm:p-5 text-left text-sm sm:text-base transition-all min-h-[52px] select-none ${buttonStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-current text-xs font-black">
                    {["अ", "ब", "क", "ड"][idx] || idx + 1}
                  </span>
                  <span className="deva-body font-medium">{option}</span>
                </div>

                {/* Status Icon */}
                {isAnswered && (
                  <div>
                    {isCorrect && (
                      <CheckCircle2 size={20} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    )}
                    {isSelected && !isCorrect && (
                      <XCircle size={20} className="text-red-500 flex-shrink-0" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* ── EXPLANATION BOX & NEXT BUTTON ───────────────── */}
      {!isFinished && isAnswered && (
        <div className="rounded-2xl border border-gold/40 bg-card p-5 space-y-4 animate-fade-in shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent">
              {isMr ? "भावार्थ व स्पष्टीकरण" : "Spiritual Explanation"}
            </span>
            <p className="deva-body text-xs sm:text-sm text-foreground/90 mt-1 leading-relaxed">
              {isMr ? currentQ.explanation_mr : currentQ.explanation_en}
            </p>
          </div>

          <button
            onClick={handleNext}
            type="button"
            className="w-full flex items-center justify-center gap-2 rounded-2xl gradient-primary py-3.5 text-sm font-extrabold text-white shadow hover:opacity-95 transition-all min-h-[48px]"
          >
            <span>
              {currentIndex === QUIZ_QUESTIONS.length - 1
                ? isMr
                  ? "निकाल पहा 🏆"
                  : "View Results 🏆"
                : isMr
                ? "पुढील प्रश्न ➡️"
                : "Next Question ➡️"}
            </span>
          </button>
        </div>
      )}

      {/* ── CELEBRATION RESULT CARD ──────────────────────── */}
      {isFinished && (
        <div className="rounded-3xl border-2 border-gold/60 bg-gradient-to-b from-card via-card to-gold/10 p-6 sm:p-10 text-center shadow-xl space-y-6 animate-fade-in-up">
          {/* Trophy Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-gold text-white shadow-lg animate-bounce">
            <Trophy size={40} />
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 border border-gold/50 px-3.5 py-1 text-xs font-bold text-gold uppercase tracking-wider">
              <Sparkles size={14} />
              {isMr ? "अभिनंदन! प्रश्नमंजुषा पूर्ण" : "Congratulations! Quiz Completed"}
            </span>

            <h2 className="deva-heading text-2xl sm:text-3xl font-extrabold text-foreground mt-3">
              {participantName.trim() ? `${participantName.trim()}, ` : ""}
              {isMr ? badge.title_mr : badge.title_en}
            </h2>

            <p className="deva-body text-xs sm:text-sm text-muted-foreground mt-2 max-w-md mx-auto">
              {isMr ? badge.desc_mr : badge.desc_en}
            </p>
          </div>

          {/* Big Score Display */}
          <div className="mx-auto max-w-xs rounded-2xl border-2 border-gold/40 bg-card p-4 shadow-sm">
            <span className="deva-body text-xs text-muted-foreground uppercase font-bold tracking-wider">
              {isMr ? "एकूण प्राप्त गुण" : "Total Score"}
            </span>
            <div className="text-4xl sm:text-5xl font-black text-primary mt-1">
              {score} <span className="text-xl text-muted-foreground font-normal">/ {QUIZ_QUESTIONS.length}</span>
            </div>
            <p className="deva-body text-xs text-muted-foreground mt-1">
              {isMr
                ? `${Math.round((score / QUIZ_QUESTIONS.length) * 100)}% अचूक उत्तरे`
                : `${Math.round((score / QUIZ_QUESTIONS.length) * 100)}% Accuracy`}
            </p>
          </div>

          {/* Certificate Name Input */}
          <div className="max-w-sm mx-auto text-left">
            <label className="deva-body block text-xs font-bold text-foreground mb-1 text-center">
              {isMr ? "आपले नाव प्रविष्ट करा (शेअर करण्यासाठी):" : "Enter Your Name (for sharing):"}
            </label>
            <input
              type="text"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              placeholder={isMr ? "उदा. निलेश पाटील" : "e.g. Nilesh Patil"}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs sm:text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleShareResult}
              type="button"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl gradient-primary px-8 py-3.5 text-sm font-extrabold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all min-h-[48px]"
            >
              <Share2 size={16} />
              <span>
                {shared
                  ? isMr
                    ? "शेअर केले!"
                    : "Shared!"
                  : isMr
                  ? "व्हॉट्सॲपवर गुण शेअर करा"
                  : "Share Score on WhatsApp"}
              </span>
            </button>

            <button
              onClick={handleRestart}
              type="button"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3.5 text-sm font-bold text-foreground hover:bg-muted/60 transition-all min-h-[48px]"
            >
              <RotateCcw size={16} />
              <span>{isMr ? "पुन्हा खेळा 🔄" : "Retake Quiz 🔄"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
