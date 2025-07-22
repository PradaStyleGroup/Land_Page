"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Instagram,
  Mail,
  ExternalLink,
  MessageCircle,
  ShoppingCart,
  Users,
  Award,
  Clock,
  Target,
  Zap,
  Heart,
  ChevronUp,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { TypewriterText } from "@/components/TypewriterText"
import { AnimatedBackground } from "@/components/AnimatedBackground"
import { ProjectModal } from "@/components/ProjectModal"
import type { JSX } from "react/jsx-runtime"
import { LanguageSelector } from "@/components/LanguageSelector"
import { t, setCurrentLanguage, type Language } from "@/lib/translations"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/hooks/use-toast"

// Types
interface Project {
  id: number
  title: string
  description: string
  mainImage: string
  images: string[]
  tags: string[]
  videos?: string[]
}

interface Plan {
  id: number
  name: string
  price: string
  period: string
  description: string
  features: string[]
  popular: boolean
  color: string
  buttonColor: string
}

interface Company {
  name: string
  image: string
}

interface Skill {
  name: string
  level: number
  icon: JSX.Element
}

// Data
const projects: Project[] = [
  {
    id: 1,
    title: "MLO Exclusivo",
    description: "Projeto exclusivo com identidades unica! Detalhes minimalista e completo em tecnicas Nativas.",
    mainImage: "https://imgur.com/G3wQYA6.jpg",
    images: [
      "https://imgur.com/oZwYdid.jpg",
      "https://imgur.com/1cWw8xx.jpg",
      "https://imgur.com/6r0BJJf.jpg",
      "https://imgur.com/3Ocp9d1.jpg",
      "https://imgur.com/E9X2Zya.jpg",
      "https://imgur.com/B1HfzAA.jpg",
      "https://imgur.com/dxpLWTw.jpg",
      "https://imgur.com/TNQHrzb.jpg",
    ],
    tags: ["MLO", "PAID", "LOD"],
  },
  {
    id: 2,
    title: "MLO Exclusivo",
    description: "[MLO] Projeto exclusivo com identidades unicas",
    mainImage: "https://i.imgur.com/gaqGPba.jpg",
    images: [
      "https://i.imgur.com/gaqGPba.jpg", 
      "https://i.imgur.com/s8LnZis.jpg", 
      "https://i.imgur.com/xgo6miF.jpg"
    ],
    tags: ["MLO", "PAID"],
  },
  {
    id: 3,
    title: "Bunker Secret",
    description: "Projeto exclusivo, realizado sob encomenda.",
    mainImage: "https://imgur.com/I9plD84.jpg",
    images: [
      "https://imgur.com/geQtnKa.jpg", 
      "https://imgur.com/NkyJMIw.jpg"
    ],
    videos: [
      "https://youtu.be/8Ptc29xJSZQ"
    ],
    tags: ["PVP", "REINO UNIDO", "EXCLUSIVO", "AUDIO OCCLUSION"],
  },
  {
    id: 4,
    title: "Arena Fluentes",
    description: "Projeto exclusivo, realizado sob encomenda para o maior servidor de PVP do cenario do Fivem - ARENA",
    mainImage: "https://imgur.com/KeQohl2.jpg",
    images: [
      "https://imgur.com/t4LnkUg.jpg", 
      "https://imgur.com/syMtBSt.jpg", 
      "https://imgur.com/90jBjhH.jpg"
    ],
    tags: ["PVP", "REINO UNIDO", "EXCLUSIVO"],
  },
  {
    id: 5,
    title: "Arena Fluentes",
    description: "Projeto exclusivo, realizado sob encomenda para o maior servidor de PVP do cenario do Fivem - ARENA",
    mainImage: "https://imgur.com/KP0rBGE.jpg",
    images: [
      "https://imgur.com/KU0b72L.jpg", 
      "https://imgur.com/m5r8vPV.jpg", 
      "https://imgur.com/GuIGZAE.jpg"
    ],
    tags: ["PVP", "REINO UNIDO", "EXCLUSIVO"],
  },
  {
    id: 6,
    title: "Arena Fluentes",
    description: "Projeto exclusivo, realizado sob encomenda para o maior servidor de PVP do cenario do Fivem - ARENA",
    mainImage: "https://imgur.com/uUQJnTP.jpg",
    images: [
      "https://imgur.com/Is9nHOg.jpg", 
      "https://imgur.com/US7lvhj.jpg", 
      "https://imgur.com/zDzeSMO.jpg"
    ],
    tags: ["PVP", "REINO UNIDO", "EXCLUSIVO"],
  },
]

const companies: Company[] = [
  {
    name: "Arena",
    image: "https://imgur.com/T4LObXi.jpg",
  },
  {
    name: "Oasis",
    image: "https://imgur.com/dkEllrq.jpg",
  },
  {
    name: "Starships",
    image: "https://imgur.com/dGlY0Wk.jpg",
  },
  {
    name: "Wanted",
    image: "https://imgur.com/aTqAKZG.jpg",
  },
  {
    name: "BloodsWars",
    image: "https://imgur.com/99qu43M.jpg",
  },
  {
    name: "Diamond",
    image: "https://imgur.com/9286k5D.jpg",
  },
  {
    name: "Void",
    image: "https://imgur.com/24U01us.jpg",
  },
  {
    name: "Fivem",
    image: "https://i.imgur.com/n5xYBqj.jpg",
  },
]

const skills: Skill[] = [
  {
    name: "Blender",
    level: 35,
    icon: (
      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" fill="white" opacity="0.9" />
          <circle cx="16" cy="16" r="8" fill="currentColor" className="text-orange-600" />
          <circle cx="16" cy="16" r="4" fill="white" />
        </svg>
      </div>
    ),
  },
  {
    name: "3ds Max",
    level: 95,
    icon: (
      <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="6" y="6" width="20" height="20" rx="2" fill="white" opacity="0.9" />
          <text x="16" y="20" textAnchor="middle" className="text-xs font-bold fill-cyan-600">
            3D
          </text>
        </svg>
      </div>
    ),
  },
  {
    name: "Photoshop",
    level: 80,
    icon: (
      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="4" width="24" height="24" rx="4" fill="white" opacity="0.9" />
          <text x="16" y="20" textAnchor="middle" className="text-sm font-bold fill-blue-700">
            Ps
          </text>
        </svg>
      </div>
    ),
  },
  {
    name: "Illustrator",
    level: 40,
    icon: (
      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="4" width="24" height="24" rx="4" fill="white" opacity="0.9" />
          <text x="16" y="20" textAnchor="middle" className="text-sm font-bold fill-orange-600">
            Ai
          </text>
        </svg>
      </div>
    ),
  },
  {
    name: "Substance",
    level: 45,
    icon: (
      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="4" width="24" height="24" rx="4" fill="white" opacity="0.9" />
          <text x="16" y="20" textAnchor="middle" className="text-xs font-bold fill-red-600">
            Sb
          </text>
        </svg>
      </div>
    ),
  },
  {
    name: "SketchUp",
    level: 30,
    icon: (
      <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="4" width="24" height="24" rx="4" fill="white" opacity="0.9" />
          <text x="16" y="20" textAnchor="middle" className="text-xs font-bold fill-red-700">
            Su
          </text>
        </svg>
      </div>
    ),
  },
  {
    name: "AutoCAD",
    level: 95,
    icon: (
      <div className="w-16 h-16 bg-gradient-to-br from-red-700 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="4" width="24" height="24" rx="4" fill="white" opacity="0.9" />
          <text x="16" y="20" textAnchor="middle" className="text-xs font-bold fill-red-800">
            AC
          </text>
        </svg>
      </div>
    ),
  },
  {
    name: "SolidWorks",
    level: 95,
    icon: (
      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="4" width="24" height="24" rx="4" fill="white" opacity="0.9" />
          <text x="16" y="20" textAnchor="middle" className="text-xs font-bold fill-red-700">
            SW
          </text>
        </svg>
      </div>
    ),
  },
]

// Components
function PlansContent() {
  const getPlansData = (): Plan[] => [
    {
      id: 1,
      name: t("professionalPlan"),
      price: "R$ 399",
      period: "Assinatura Mensal",
      description: t("professionalDesc"),
      features: t("professionalFeatures") as unknown as string[],
      popular: false,
      color: "from-yellow-500 to-yellow-600",
      buttonColor: "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black",
    },
    {
      id: 2,
      name: t("premiumPlan"),
      price: "R$ 699",
      period: "Assinatura Mensal",
      description: t("premiumDesc"),
      features: t("premiumFeatures") as unknown as string[],
      popular: false,
      color: "from-yellow-500 to-yellow-600",
      buttonColor: "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black",
    },
    {
      id: 3,
      name: t("enterprisePlan"),
      price: "R$ 1.599",
      period: "Assinatura Mensal",
      description: t("enterpriseDesc"),
      features: t("enterpriseFeatures") as unknown as string[],
      popular: false,
      color: "from-yellow-500 to-yellow-600",
      buttonColor: "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black",
    },
    {
      id: 4,
      name: t("exclusivePlan"),
      price: "R$ 4.200",
      period: "Assinatura Mensal",
      description: t("exclusiveDesc"),
      features: t("exclusiveFeatures") as unknown as string[],
      popular: false,
      color: "from-yellow-500 to-yellow-600",
      buttonColor: "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black",
    },
    {
      id: 5,
      name: t("freelancerPlan"),
      price: "R$ Consultar",
      period: "Pagamentos Imediatos",
      description: t("freelancerDesc"),
      features: t("freelancerFeatures") as unknown as string[],
      popular: true,
      color: "from-yellow-500 to-yellow-600",
      buttonColor: "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black",
    },
  ]

  const plans = getPlansData()

  return (
    <>
      {/* Plans Header */}
      <div className="relative z-10 px-6 py-8">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {t("plansTitle").split(" ")[0]} <span className="text-yellow-500">{t("plansTitle").split(" ")[1]}</span>
            </h1>
            <p className="text-gray-400 text-lg mt-2">{t("plansSubtitle")}</p>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="relative z-10 px-6 pb-20">
        <div className="container mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 group flex flex-col ${
                  plan.popular ? "ring-2 ring-yellow-500/50 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-yellow-500 text-black font-semibold px-4 py-1">{t("mostPopular")}</Badge>
                  </div>
                )}

                <CardContent className="p-6 flex flex-col flex-grow">
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${plan.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="text-black font-bold text-xl">{plan.name[0]}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-500 transition-colors">
                      {plan.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 min-h-[40px]">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-white mb-1">{plan.price}</div>
                    <div className="text-gray-400 text-sm">{plan.period}</div>
                  </div>

                  {/* Features */}
                  <div className="mb-6 flex-grow">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm">
                          <div className="w-5 h-5 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          </div>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <Link
                      href="https://discord.gg/stylegroup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full ${plan.buttonColor} font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg bg-transparent border inline-flex items-center justify-center`}
                    >
                      {t("choosePlan")}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm max-w-4xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {t("customNeed").split("personalizado?")[0]}
                  <span className="text-yellow-500">personalizado?</span>
                </h3>
                <p className="text-gray-400 text-lg mb-6 max-w-2xl mx-auto">{t("customNeedDesc")}</p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>{t("qualityGuarantee")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{t("deadlinesRespected")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{t("dedicatedSupport")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span>{t("optimizedDelivery")}</span>
                  </div>
                </div>
                <Link
                  href="https://discord.gg/stylegroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  {t("requestQuote")}
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

function ContactContent() {
  return (
    <>
      {/* Contact Header */}
      <div className="relative z-10 px-6 py-8">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {t("contactPageTitle").split(" ")[0]} {t("contactPageTitle").split(" ")[1]}{" "}
              <span className="text-yellow-500">{t("contactPageTitle").split(" ")[2]}</span>
            </h1>
            <p className="text-gray-400 text-lg mt-2">{t("contactPageSubtitle")}</p>
          </div>
        </div>
      </div>

      {/* Contact Options */}
      <div className="relative z-10 px-6 pb-20">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Discord Card */}
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 group">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-yellow-500 transition-colors">
                  {t("discord")}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{t("discordDesc")}</p>
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 text-green-500 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">{t("onlineMembers")}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{t("connectCommunity")}</p>
                </div>
                <Link
                  href="https://discord.gg/stylegroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t("joinDiscord")}
                </Link>
              </CardContent>
            </Card>

            {/* Tebex Store Card */}
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 group">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <ShoppingCart className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-yellow-500 transition-colors">
                  {t("myStore")}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{t("myStoreDesc")}</p>
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
                    <Award className="w-4 h-4" />
                    <span className="text-sm font-medium">{t("premiumProducts")}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{t("qualityGuaranteed")}</p>
                </div>
                <Link
                  href="https://stylegroup.tebex.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {t("visitStore")}
                </Link>
              </CardContent>
            </Card>

            {/* Instagram Prada Card */}
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 group">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Instagram className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-yellow-500 transition-colors">
                  {t("prada")}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{t("pradaDesc")}</p>
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 text-pink-500 mb-2">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm font-medium">{t("exclusiveContent")}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{t("followCreative")}</p>
                </div>
                <Link
                  href="https://www.instagram.com/prada.stg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 shadow-lg"
                >
                  <Instagram className="w-5 h-5" />
                  {t("followPrada")}
                </Link>
              </CardContent>
            </Card>

            {/* Instagram StyleGroup Card */}
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 group">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Instagram className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-yellow-500 transition-colors">
                  {t("styleGroup")}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{t("styleGroupDesc")}</p>
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 text-purple-500 mb-2">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-medium">{t("officialPortfolio")}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{t("professionalWork")}</p>
                </div>
                <Link
                  href="https://www.instagram.com/stylegroup.cfx/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 shadow-lg"
                >
                  <Instagram className="w-5 h-5" />
                  {t("followStyleGroup")}
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Additional Contact Info */}
          <div className="mt-16 text-center">
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {t("readyToStart").split("projeto?")[0]}
                  <span className="text-yellow-500">projeto?</span>
                </h3>
                <p className="text-gray-400 text-lg mb-6 max-w-2xl mx-auto">{t("readyToStartDesc")}</p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{t("response24h")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>{t("qualityGuarantee")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{t("personalizedSupport")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

function PortfolioContent() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openProject = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <>
      {/* Portfolio Header */}
      <div className="relative z-10 px-6 py-8">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {t("portfolioTitle").split(" ")[0]}{" "}
              <span className="text-yellow-500">{t("portfolioTitle").split(" ")[1]}</span>
            </h1>
            <p className="text-gray-400 text-lg mt-2">{t("portfolioSubtitle")}</p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="relative z-10 px-6 pb-20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 cursor-pointer group"
                onClick={() => openProject(project)}
              >
                <CardContent className="p-0">
                  {/* Project Image */}
                  <div className="aspect-video bg-gray-800 relative overflow-hidden rounded-t-lg">
                    <Image
                      src={project.mainImage || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-yellow-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}

function AboutStyleGroupSection() {
  const aboutItems = [
    {
      icon: <Users className="w-8 h-8" />,
      title: t("ourTeam"),
      description: t("ourTeamDesc"),
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: t("premiumQuality"),
      description: t("premiumQualityDesc"),
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t("experience"),
      description: t("experienceDesc"),
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: t("clientFocus"),
      description: t("clientFocusDesc"),
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t("innovation"),
      description: t("innovationDesc"),
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: t("passion"),
      description: t("passionDesc"),
    },
  ]

  return (
    <section id="about-style-group" className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("aboutStyleGroupTitle").split(" ").slice(0, -2).join(" ")}{" "}
            <span className="text-yellow-500">{t("aboutStyleGroupTitle").split(" ").slice(-2).join(" ")}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t("aboutStyleGroupSubtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aboutItems.map((item, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 group"
            >
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <div className="text-black">{item.icon}</div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-yellow-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
          {/* Retângulo especial */}
          <div className="lg:col-span-3 md:col-span-2 col-span-1 mt-4">
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg">
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-2">{t("aboutSpecialBoxTitle")}</h3>
              <p className="text-gray-200 text-lg mb-4 text-center max-w-2xl" dangerouslySetInnerHTML={{ __html: t("aboutSpecialBoxSubtitle") }} />
              <div className="flex items-center gap-2 mt-2">
                <span className="text-3xl font-bold text-yellow-500">{t("aboutSpecialBoxClients").split(" ")[0]}</span>
                <span className="text-white text-lg font-semibold">{t("aboutSpecialBoxClients").split(" ").slice(1).join(" ")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PrincipaisAtuacoesSection() {
  return (
    <section className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("mainActivitiesTitle").split(" ")[0]}{" "}
            <span className="text-yellow-500">{t("mainActivitiesTitle").split(" ")[1]}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t("mainActivitiesSubtitle")}</p>
        </div>

        <div className="relative max-w-7xl mx-auto overflow-hidden px-8 py-4">
          {/* Container com animação contínua */}
          <div className="flex gap-6 animate-scroll-continuous">
            {/* Duplicar o array para animação contínua sem quebras */}
            {[...companies, ...companies].map((company, index) => (
              <div key={`${company.name}-${index}`} className="flex-shrink-0 w-[215px] relative group cursor-pointer">
                {/* Card da Imagem */}
                <div className="w-full h-[215px] rounded-xl overflow-hidden border-2 border-gray-800 hover:border-yellow-500/50 transition-all duration-300 group-hover:scale-105 shadow-lg mb-4">
                  <Image
                    src={company.image || "/placeholder.svg?height=215&width=215"}
                    alt={company.name}
                    width={215}
                    height={215}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                  />
                </div>

                {/* Nome do Servidor */}
                <div className="text-center">
                  <h3 className="text-white text-lg font-semibold truncate px-8">{company.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    const element = document.getElementById("skills-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills-section" className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("skillsTitle").split(" ")[0]} <span className="text-yellow-500">{t("skillsTitle").split(" ")[1]}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t("skillsSubtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <Card
              key={skill.name}
              className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4 transform hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{skill.name}</h3>
                <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: isVisible ? `${skill.level}%` : "0%",
                      transitionDelay: `${index * 200}ms`,
                    }}
                  />
                </div>
                <span className="text-yellow-500 font-semibold mt-2 block">{skill.level}%</span>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Experiências Section */}
        <div className="mt-16">
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  <span className="text-yellow-500">Diferenciais</span>
                </h3>
                <p className="text-gray-400 text-lg">
                  Veja alguns de meus NoHalll pelos qual você deve trabalhar comigo!
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* MLO Creations */}
                <div className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-700/50 transition-all duration-300 group">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-black font-bold text-sm">MLO</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-yellow-500 transition-colors">
                      Criações de MLO
                    </h4>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Desenvolvimento completo de interiores personalizados, desde conceito até implementação final,
                    criando ambientes únicos e otimizados para servidores FiveM.
                  </p>
                </div>

                {/* Ambientações */}
                <div className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-700/50 transition-all duration-300 group">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-sm">AMB</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-yellow-500 transition-colors">
                      Ambientações
                    </h4>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Criação de atmosferas imersivas através de iluminação profissional, texturas realistas e composição
                    visual que transformam espaços em experiências memoráveis.
                  </p>
                </div>

                {/* Audio Occlusion */}
                <div className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-700/50 transition-all duration-300 group">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-sm">AUD</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-yellow-500 transition-colors">
                      Audio Occlusion
                    </h4>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Implementação avançada de sistemas de oclusão sonora, criando experiências auditivas realistas que
                    aumentam significativamente a imersão dos jogadores.
                  </p>
                </div>

                {/* Animações */}
                <div className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-700/50 transition-all duration-300 group">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-sm">ANI</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-yellow-500 transition-colors">
                      Animações
                    </h4>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Desenvolvimento de animações fluidas e naturais para objetos interativos, portas, elevadores e
                    elementos dinâmicos que enriquecem a jogabilidade.
                  </p>
                </div>

                {/* LOD Configurations */}
                <div className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-700/50 transition-all duration-300 group">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-sm">LOD</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-yellow-500 transition-colors">
                      Configurações de LOD's
                    </h4>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Otimização avançada de Level of Detail para interiores, garantindo máxima performance sem
                    comprometer a qualidade visual dos ambientes criados.
                  </p>
                </div>

                {/* Bonus - Consultoria */}
                <div className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-700/50 transition-all duration-300 group">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-sm">CON</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-yellow-500 transition-colors">
                      Consultoria Técnica
                    </h4>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Assessoria especializada em projetos complexos, otimização de recursos e implementação de soluções
                    inovadoras para servidores de alto desempenho.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Substituir o sistema de likes local por integração com API PHP global
const API_URL = "http://198.1.195.202/videosland/likes.php"

export default function PortfolioLanding() {
  const [currentPage, setCurrentPage] = useState<"home" | "portfolio" | "contact" | "plans">("home")
  const [language, setLanguage] = useState<Language>("pt")
  const [, forceUpdate] = useState({})
  // LIKE state
  const [likeCount, setLikeCount] = useState(0)

  // Buscar likes ao carregar
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setLikeCount(data.likes || 0))
      .catch(() => setLikeCount(0))
  }, [])

  // Função para dar like
  const handleLike = async () => {
    try {
      const res = await fetch(API_URL, { method: "POST" })
      const data = await res.json()
      setLikeCount(data.likes || likeCount + 1)
      if (data.alreadyLiked) {
        toast({
          title: "Like já registrado!",
          description: "Você já curtiu. Só é permitido 1 like por pessoa.",
          variant: "success-yellow"
        })
      }
    } catch {
      // fallback local
      setLikeCount(likeCount + 1)
    }
  }

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang as Language)
    setLanguage(lang as Language)
    // Força re-render de todos os componentes
    forceUpdate({})
  }

  const navigateToPortfolio = () => {
    setCurrentPage("portfolio")
  }

  const navigateToHome = () => {
    setCurrentPage("home")
  }

  const navigateToContact = () => {
    setCurrentPage("contact")
  }

  const navigateToPlans = () => {
    setCurrentPage("plans")
  }

  const scrollToSection = (sectionId: string) => {
    if (currentPage !== "home") {
      setCurrentPage("home")
      // Aguarda a mudança de página antes de fazer o scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  // Estado para mostrar/esconder botão de scroll to top
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <AnimatedBackground />

      {/* Header - Sempre visível */}
      <header className="relative z-20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-lg">F</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Prada</h1>
            <p className="text-sm text-yellow-500">Exclusive Customizations</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={navigateToHome}
            className={`${
              currentPage === "home" ? "text-white" : "text-gray-400"
            } hover:text-yellow-500 transition-colors relative group`}
          >
            {t("home")}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={navigateToPortfolio}
            className={`${
              currentPage === "portfolio" ? "text-white" : "text-gray-400"
            } hover:text-yellow-500 transition-colors relative group`}
          >
            {t("portfolio")}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={() => scrollToSection("skills-section")}
            className="text-gray-400 hover:text-yellow-500 transition-colors relative group"
          >
            {t("skills")}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={navigateToPlans}
            className={`${
              currentPage === "plans" ? "text-white" : "text-gray-400"
            } hover:text-yellow-500 transition-colors relative group`}
          >
            {t("plans")}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={navigateToContact}
            className={`${
              currentPage === "contact" ? "text-white" : "text-gray-400"
            } hover:text-yellow-500 transition-colors relative group`}
          >
            {t("contact")}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
          </button>
        </nav>

        <div className="flex items-center space-x-4 mr-12">
          <LanguageSelector currentLanguage={language} onLanguageChange={handleLanguageChange} />
          {/* Botão LIKE com texto 'Likes' antes do ícone */}
          <button
            onClick={handleLike}
            className={"w-10 h-10 flex items-center justify-center rounded-xl border border-gray-700 bg-gray-900/70 hover:bg-yellow-500/10 transition-all duration-300 shadow-lg px-2 hover:scale-105"}
            title="Clique para curtir"
            style={{ minWidth: 90 }}
          >
            <span className="text-xs font-bold text-white mr-1 uppercase">LIKES</span>
            <span className="text-xl">👍</span>
            <span className="font-bold text-yellow-500 text-sm ml-1">{likeCount}</span>
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      {currentPage === "plans" ? (
        <PlansContent />
      ) : currentPage === "contact" ? (
        <ContactContent />
      ) : currentPage === "portfolio" ? (
        <PortfolioContent />
      ) : (
        <>
          {/* Hero Section */}
          <section id="home" className="relative z-10 min-h-screen flex items-center">
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-5 gap-8 items-center">
                <div className="lg:col-span-3 space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-5xl md:text-7xl font-light text-white leading-tight">
                      <TypewriterText text={t("heroTitle")} speed={80} delay={500} />
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-yellow-500">{t("heroSubtitle")}</h3>
                  </div>

                  <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">{t("heroDescription")}</p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      onClick={navigateToPortfolio}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                      {t("viewPortfolio")}
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => scrollToSection("about-style-group")}
                      className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-3 rounded-full transition-all duration-300 bg-transparent"
                    >
                      {t("about")}
                      <Users className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-2 flex justify-center lg:justify-end">
                  <div className="relative">
                    <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-yellow-500/20 shadow-2xl">
                      <Image
                        src="https://imgur.com/3jwalmw.jpg"
                        alt="Fabio de Almeida"
                        width={320}
                        height={320}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-500 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-yellow-500/60 rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Style Group Section */}
          <AboutStyleGroupSection />

          {/* Principais Atuações Section */}
          <PrincipaisAtuacoesSection />

          {/* Skills Section */}
          <SkillsSection />

          {/* Contact Section */}
          <section id="contato" className="relative z-10 py-20 border-t border-gray-800">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                {t("contactTitle").split("juntos?")[0]} <span className="text-yellow-500">juntos?</span>
              </h2>
              <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">{t("contactDescription")}</p>
              <Button
                size="lg"
                onClick={navigateToContact}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-12 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="mr-2 w-5 h-5" />
                {t("getInTouch")}
              </Button>
            </div>
          </section>
        </>
      )}

      {/* Footer - Sempre visível */}
      <footer className="relative z-10 py-8 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">{t("footerCopyright")} | CNPJ: 40.728.148/0001-61</p>

            {/* Botões Discord e Tebex no Footer */}
            <div className="flex gap-4 mt-4 md:mt-0">
              {/* Botão Discord */}
              <Link
                href="https://discord.gg/stylegroup"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Discord
              </Link>

              {/* Botão Tebex */}
              <Link
                href="https://stylegroup.tebex.io"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                Tebex
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <Toaster />
      {/* Botão flutuante de scroll to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black bg-transparent rounded-xl p-3 shadow-lg transition-all duration-300 flex items-center justify-center"
          aria-label="Voltar ao topo"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}
