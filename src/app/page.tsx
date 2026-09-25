import { Hero } from "@/components/home/hero";
import {
  BigQuote,
  CtaBand,
  HowItWorks,
  MetricsBand,
  WhyRegistry,
} from "@/components/home/sections";
import { FeaturedProspects, Pricing } from "@/components/home/featured";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyRegistry />
      <MetricsBand />
      <HowItWorks />
      <FeaturedProspects />
      <Pricing />
      <BigQuote />
      <CtaBand />
    </>
  );
}
