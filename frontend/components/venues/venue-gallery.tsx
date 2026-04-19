"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VenueGalleryProps {
  images: string[];
  venueName: string;
}

export function VenueGallery({ images, venueName }: VenueGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Main image */}
        <button
          onClick={() => openLightbox(0)}
          className="relative aspect-[4/3] overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <Image
            src={images[0]}
            alt={`${venueName} - главное фото`}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </button>

        {/* Secondary images */}
        <div className="hidden gap-4 md:grid md:grid-cols-2">
          {images.slice(1, 3).map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index + 1)}
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-primary",
                index === 1 && images.length > 3 && "relative"
              )}
            >
              <Image
                src={image}
                alt={`${venueName} - фото ${index + 2}`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {index === 1 && images.length > 3 && (
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/50">
                  <span className="text-lg font-semibold text-card">
                    +{images.length - 3} фото
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Mobile: show all photos button */}
        {images.length > 1 && (
          <Button
            variant="outline"
            className="md:hidden"
            onClick={() => openLightbox(0)}
          >
            Показать все фото ({images.length})
          </Button>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-card hover:bg-card/10 hover:text-card"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Navigation */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-card hover:bg-card/10 hover:text-card"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-card hover:bg-card/10 hover:text-card"
            onClick={goToNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Image */}
          <div className="relative h-[80vh] w-[90vw] max-w-5xl">
            <Image
              src={images[currentIndex]}
              alt={`${venueName} - фото ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-card/20 px-4 py-2 text-sm text-card backdrop-blur-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
