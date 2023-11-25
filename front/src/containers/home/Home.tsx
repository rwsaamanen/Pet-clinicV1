import React from 'react'

const Home = () => {
  return (
    <>
        <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <h1
            className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparentdrop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          >
            Työn alla
          </h1>
        </div>
        </>
  )
}

export default Home