"use client"

import { useState } from "react"
import Image from "next/image"

interface LanguageSelectorProps {
  currentLanguage: string
  onLanguageChange: (language: string) => void
}

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    {
      code: "pt",
      name: "Português",
      flag: "🇧🇷",
      flagUrl: "https://flagcdn.com/w40/br.png",
    },
    {
      code: "en",
      name: "English",
      flag: "🇺🇸",
      flagUrl: "https://flagcdn.com/w40/us.png",
    },
  ]

  const currentLang = languages.find((lang) => lang.code === currentLanguage) || languages[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm min-w-[100px]"
      >
        <Image
          src={currentLang.flagUrl || "/placeholder.svg"}
          alt={currentLang.name}
          width={24}
          height={16}
          className="rounded-sm flex-shrink-0"
        />
        <span className="text-white text-sm font-medium hidden sm:block whitespace-nowrap">
          {currentLang.code.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 min-w-[140px] backdrop-blur-sm">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                onLanguageChange(language.code)
                setIsOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-800 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                currentLanguage === language.code ? "bg-yellow-500/10 text-yellow-500" : "text-white"
              }`}
            >
              <Image
                src={language.flagUrl || "/placeholder.svg"}
                alt={language.name}
                width={24}
                height={16}
                className="rounded-sm flex-shrink-0"
              />
              <span className="text-sm font-medium whitespace-nowrap">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
