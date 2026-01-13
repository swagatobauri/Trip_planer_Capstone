import React from 'react'
import { Button } from './components/ui/button'
import Hero from './components/ui/custom/Hero'
import LogoLoop from './components/LogoLoop';
const placeImages = [
  { src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=60", alt: "Paris", title: "Paris" },
  { src: "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=600&auto=format&fit=crop&q=60", alt: "Rome", title: "Rome" },
  { src: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=60", alt: "Tokyo", title: "Tokyo" },
  { src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=60", alt: "Bali", title: "Bali" },
  { src: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600&auto=format&fit=crop&q=60", alt: "Sydney", title: "Sydney" },
  { src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop&q=60", alt: "London", title: "London" },
  { src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop&q=60", alt: "Dubai", title: "Dubai" },
  { src: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&auto=format&fit=crop&q=60", alt: "New York", title: "New York" },
];


const App = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-80px)] justify-between overflow-hidden">
      <div>
        <Hero />
        <div style={{ height: '200px', position: 'relative', overflow: 'hidden', margin: '10px 0' }}>
          <LogoLoop
            logos={placeImages}
            speed={100}
            direction="left"
            logoHeight={120}
            gap={60}
            pauseOnHover={false}
            scaleOnHover={false}
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Famous travel destinations"
          />
        </div>
      </div>

      <footer className="text-center py-4 text-gray-400 text-sm">
        © 2026 Trip planner. All rights reserved.
      </footer>
    </div>
  )
}

export default App
