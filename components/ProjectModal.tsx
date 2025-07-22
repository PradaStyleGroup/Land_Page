"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  mainImage: string
  images: string[]
  tags: string[]
  videos?: string[] // Added videos to the interface
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

function isYouTubeUrl(url: string) {
  return /youtu(be)?\.([a-z]+)/.test(url) || url.includes("youtube.com");
}
function getYouTubeEmbedUrl(url: string) {
  // Extrai o ID do vídeo do YouTube
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    if (project) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
    }
  }

  const prevImage = () => {
    if (project) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
    }
  }

  if (!isOpen || !project) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white">{project.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Image Slider + Vídeos */}
        <div className="relative">
          {/* Vídeos do projeto */}
          {project.videos && project.videos.length > 0 && (
            <div className="flex flex-col gap-4 mb-4">
              {project.videos.map((videoUrl, idx) => (
                isYouTubeUrl(videoUrl) ? (
                  <div key={idx} className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                    <iframe
                      src={getYouTubeEmbedUrl(videoUrl)}
                      title={`YouTube video ${idx + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                ) : (
                  <video key={idx} controls className="w-full rounded-lg bg-black">
                    <source src={videoUrl} type="video/mp4" />
                    Seu navegador não suporta vídeo.
                  </video>
                )
              ))}
            </div>
          )}
          <div className="aspect-video bg-gray-800 relative overflow-hidden">
            <Image
              src={project.images[currentImageIndex] || "/placeholder.svg"}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
            />

            {/* Navigation Arrows */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {project.images.length}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Descrição</h3>
            <p className="text-gray-300 leading-relaxed">{project.description}</p>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
                <Badge
                  key={tag}
                  className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
