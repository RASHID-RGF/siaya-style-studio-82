import React, { useEffect, useRef, KeyboardEvent } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { X } from 'lucide-react';

type Props = {
  images: string[];
  open: boolean;
  onClose: () => void;
  autoPlayInterval?: number; // ms
};

export function CarouselModal({ images, open, onClose, autoPlayInterval = 2000 }: Props) {
  const autoplay = useRef<any>(Autoplay({ delay: autoPlayInterval, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: false }, [autoplay.current]);

  useEffect(() => {
    if (!emblaApi) return;
    if (open) {
      // start autoplay when opened
      try {
        autoplay.current.play(emblaApi);
      } catch (e) {
        // plugin may manage internally
      }
    } else {
      try {
        autoplay.current.stop(emblaApi);
      } catch (e) {}
    }
    return () => {
      try {
        autoplay.current.stop(emblaApi);
      } catch (e) {}
    };
  }, [open, emblaApi]);

  function onKeyDown(e: KeyboardEvent) {
    if (!emblaApi) return;
    if (e.key === 'ArrowRight') emblaApi.scrollNext();
    if (e.key === 'ArrowLeft') emblaApi.scrollPrev();
    if (e.key === 'Escape') onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onKeyDown={onKeyDown} tabIndex={-1}>
      <div className="relative max-w-4xl w-full rounded-xl overflow-hidden bg-white">
        <button
          className="absolute right-3 top-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white"
          onClick={onClose}
          aria-label="Close carousel"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="embla" ref={emblaRef as any}>
          <div className="embla__container flex">
            {images.map((src, i) => (
              <div key={i} className="embla__slide flex-[0_0_100%] flex items-center justify-center bg-gray-100 cursor-pointer">
                {/* clicking a slide advances to the next */}
                <img
                  src={src}
                  alt={`slide-${i}`}
                  className="object-contain max-h-[520px] max-w-full"
                  onClick={() => emblaApi && emblaApi.scrollNext()}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 p-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi && emblaApi.scrollTo(i)}
              className={`w-3 h-3 rounded-full ${emblaApi && emblaApi.selectedScrollSnap() === i ? 'bg-primary' : 'bg-primary-foreground/40'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarouselModal;
