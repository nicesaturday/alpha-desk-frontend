"use client"

import { useState } from "react"

interface Props {
    open: boolean
    onClose: () => void
    cardId: number
    symbol: string
    name: string
    summary: string
}

export function SNSShareModal({ open, onClose, cardId, symbol, name, summary }: Props) {
    const [copied, setCopied] = useState(false)
    const [instaCopied, setInstaCopied] = useState(false)

    if (!open) return null

    const shareUrl =
        typeof window !== "undefined"
            ? `${window.location.origin}/share/${cardId}`
            : `/share/${cardId}`

    const shareText = `[Alpha Desk AI 분석] ${symbol} ${name}\n${summary.slice(0, 80)}...`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            // fallback
        }
    }

    // 인스타그램은 웹 공유 URL이 없음 → 링크 복사 후 붙여넣기 안내
    const handleInstaCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl)
            setInstaCopied(true)
            setTimeout(() => setInstaCopied(false), 3000)
        } catch {
            // fallback
        }
    }

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title: `${symbol} ${name} AI 분석`, text: shareText, url: shareUrl })
            } catch {
                // 취소
            }
        }
    }

    const options = [
        {
            label: copied ? "복사됨 ✓" : "링크 복사",
            icon: "🔗",
            action: handleCopy,
        },
        {
            label: "Twitter / X",
            icon: "🐦",
            action: () => window.open(twitterUrl, "_blank"),
        },
        {
            label: "Facebook",
            icon: "📘",
            action: () => window.open(facebookUrl, "_blank"),
        },
        {
            label: instaCopied ? "링크 복사됨 ✓" : "Instagram",
            icon: "📸",
            action: handleInstaCopy,
            note: instaCopied ? "Instagram에 붙여넣기 하세요" : undefined,
        },
        ...(typeof navigator !== "undefined" && "share" in navigator
            ? [{ label: "더 보기...", icon: "↗️", action: handleNativeShare }]
            : []),
    ]

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
            <button
                className="absolute inset-0 bg-black/60"
                onClick={onClose}
                aria-label="닫기"
            />
            <div className="relative z-10 w-full max-w-sm rounded-t-2xl bg-gray-900 p-5 shadow-xl md:rounded-2xl">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-base font-semibold text-gray-100">공유하기</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-200" aria-label="닫기">
                        ✕
                    </button>
                </div>

                <div className="mb-4 rounded-lg bg-gray-800 px-3 py-2">
                    <p className="truncate text-xs text-gray-400">{shareUrl}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {options.map((opt) => (
                        <button
                            key={opt.icon}
                            onClick={opt.action}
                            className="flex flex-col items-start gap-0.5 rounded-lg bg-gray-800 px-3 py-3 text-sm text-gray-200 transition hover:bg-gray-700"
                        >
                            <div className="flex items-center gap-2">
                                <span>{opt.icon}</span>
                                <span>{opt.label}</span>
                            </div>
                            {"note" in opt && opt.note && (
                                <span className="text-xs text-green-400 pl-6">{opt.note}</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
