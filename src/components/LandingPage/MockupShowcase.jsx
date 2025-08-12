
import React from "react";
import lazybugmockup from '@/assets/lazybug-mockup.webp';
import { DotPatterns } from "../DotPatterns";

const MockupShowcase = () => {
  return (
    <section className="z-51 w-full py-16 px-4 ">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">See LazyBug in Action</h2>
        <p className="text-gray-600 mb-10 ">
          A minimal bug tracking dashboard that keeps your projects organized and smooth.
        </p>
        <div className="border-animated rounded-2xl overflow-hidden shadow-2xl">
  <img
    src={lazybugmockup}
    alt="LazyBug Dashboard"
    className="w-full h-auto block rounded-2xl"
    loading="lazy"
  />
</div>


      </div>
    </section>
  );
};

export default MockupShowcase;
