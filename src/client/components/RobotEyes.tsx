import { useEffect, useRef, useState } from "react"
import "./RobotEyes.css"

const MOOD_KEYWORDS = ["triste", "sorpresa", "sueño", "enojado", "guiño"] as const
type Mood = (typeof MOOD_KEYWORDS)[number]

const MAX_TYPED_LENGTH = 20
const IDLE_CLEAR_MS = 4000
const MOOD_DURATION_MS = 3400
const INVALID_SHAKE_MS = 500
const HELP_DURATION_MS = 5000

function isTypingTarget(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) return false
    return target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable
}

function RobotEyes() {
    const [typed, setTyped] = useState("")
    const [invalid, setInvalid] = useState(false)
    const [mood, setMood] = useState<Mood | null>(null)
    const [showHelp, setShowHelp] = useState(false)

    // fuente de verdad sincrónica del buffer: el estado `typed` es solo para renderizarlo,
    // leerlo desde el closure del listener quedaría stale entre renders
    const typedRef = useRef("")
    const idleClearTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
    const invalidTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
    const moodTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
    const helpTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

    useEffect(() => {
        function scheduleIdleClear() {
            clearTimeout(idleClearTimeoutRef.current)
            idleClearTimeoutRef.current = setTimeout(() => {
                typedRef.current = ""
                setTyped("")
            }, IDLE_CLEAR_MS)
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.ctrlKey || event.metaKey || event.altKey) return
            if (isTypingTarget(event.target)) return

            if (event.key === "Enter") {
                const command = typedRef.current.trim().toLowerCase()
                const matched = MOOD_KEYWORDS.find((word) => word === command)
                typedRef.current = ""

                if (command === "help") {
                    setTyped("")
                    clearTimeout(helpTimeoutRef.current)
                    setShowHelp(true)
                    helpTimeoutRef.current = setTimeout(() => setShowHelp(false), HELP_DURATION_MS)
                    return
                }

                if (matched) {
                    setTyped("")
                    clearTimeout(moodTimeoutRef.current)
                    setMood(matched)
                    moodTimeoutRef.current = setTimeout(() => setMood(null), MOOD_DURATION_MS)
                    return
                }

                if (command.length > 0) {
                    setInvalid(true)
                    clearTimeout(invalidTimeoutRef.current)
                    invalidTimeoutRef.current = setTimeout(() => {
                        setInvalid(false)
                        setTyped("")
                    }, INVALID_SHAKE_MS)
                }
                return
            }

            if (event.key === "Backspace") {
                typedRef.current = typedRef.current.slice(0, -1)
                setTyped(typedRef.current)
                scheduleIdleClear()
                return
            }

            if (event.key.length !== 1) return

            typedRef.current = (typedRef.current + event.key).slice(-MAX_TYPED_LENGTH)
            setTyped(typedRef.current)
            scheduleIdleClear()
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            clearTimeout(idleClearTimeoutRef.current)
            clearTimeout(invalidTimeoutRef.current)
            clearTimeout(moodTimeoutRef.current)
            clearTimeout(helpTimeoutRef.current)
        }
    }, [])

    const isTyping = typed.length > 0

    return (
        <div className="robot-eyes" data-mood={mood ?? undefined} data-typing={isTyping || undefined}>
            <div className="robot-eyes-inner">
                <div className="robot-eye-wrap">
                    <div className="robot-eye-mood">
                        <span className="robot-eye" />
                    </div>
                </div>
                <div className="robot-eye-wrap">
                    <div className="robot-eye-mood">
                        <span className="robot-eye" />
                    </div>
                </div>
            </div>
            {showHelp ? (
                <div className="robot-eyes-help" aria-hidden="true">
                    {[...MOOD_KEYWORDS, "help"].map((word) => (
                        <span key={word}>{word}</span>
                    ))}
                </div>
            ) : (
                <div className="robot-eyes-terminal" data-invalid={invalid || undefined} aria-hidden="true">
                    {isTyping && <span className="robot-eyes-terminal-text">{typed}</span>}
                    <span className="robot-eyes-caret" />
                </div>
            )}
        </div>
    )
}

export default RobotEyes
