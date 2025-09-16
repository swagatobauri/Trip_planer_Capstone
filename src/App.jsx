import React from 'react'
import { Button } from './components/ui/button'
import Hero from './components/ui/custom/Hero'
// import FlowingMenu from './components/FlowingMenu'

// const demoItems = [
//   { link: '#', text: 'Mojave', image: 'https://picsum.photos/600/400?random=1' },
//   { link: '#', text: 'Sonoma', image: 'https://picsum.photos/600/400?random=2' },
//   { link: '#', text: 'Monterey', image: 'https://picsum.photos/600/400?random=3' },
//   { link: '#', text: 'Sequoia', image: 'https://picsum.photos/600/400?random=4' }
// ];
import LogoLoop from './components/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

// Alternative with image sources
const imageLogos = [
  { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
  { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
  { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
];



const App = () => {
  return (
    <>
      <Hero/>
      {/* <div style={{ height: '600px', position: 'relative' }}>
  <FlowingMenu items={demoItems} />
</div> */}
      <div style={{ height: '200px', position: 'relative', overflow: 'hidden', margin: '60px'}}>
      <LogoLoop
        logos={techLogos}
        speed={120}
        direction="left"
        logoHeight={48}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Technology partners"
      />
    </div>
    </>
  )
}

export default App
