import { useState, useEffect, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';

interface ImageSliderProps {
  images: string[];
  autoPlayInterval?: number;
}

const ImageSlider = ({ images, autoPlayInterval = 4000 }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => setCurrentIndex((prev) => (prev + 1) % images.length), [images.length]);
  const prev = useCallback(() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [next, autoPlayInterval]);

  // For large image sets, show a progress bar instead of dots
  const showDots = images.length <= 8;

  return (
    <div className="relative w-full h-56 sm:h-72 md:h-96 lg:h-[28rem] rounded-2xl overflow-hidden shadow-md border border-border group">
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            className="w-full h-full object-cover flex-shrink-0"
            alt={`Campus view ${idx + 1}`}
            loading={idx <= 1 ? 'eager' : 'lazy'}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />

      {/* Counter badge */}
      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white text-[10px] font-mono px-2.5 py-1 rounded-full border border-white/10">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Nav buttons */}
      <button onClick={prev} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-1.5 sm:p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 border border-white/20">
        <ChevronRight size={18} className="rotate-180" />
      </button>
      <button onClick={next} className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-1.5 sm:p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 border border-white/20">
        <ChevronRight size={18} />
      </button>

      {/* Dots or progress bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        {showDots ? (
          <div className="flex gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all shadow-sm ${idx === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
        ) : (
          <div className="w-32 sm:w-48 h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
