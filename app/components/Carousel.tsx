"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CarouselProps {
  slides: { src: string; alt: string }[]
}

export const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div className="flex-[0_0_100%] min-w-0 relative" key={index}>
              <img
                className="block w-full h-[400px] object-cover"
                src={slide.src || "/placeholder.svg"}
                alt={slide.alt}
              />
            </div>
          ))}
        </div>
      </div>
      <Button
        className="absolute top-1/2 left-4 transform -translate-y-1/2"
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
        variant="outline"
        size="icon"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        className="absolute top-1/2 right-4 transform -translate-y-1/2"
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
        variant="outline"
        size="icon"
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    </div>
  )
}

