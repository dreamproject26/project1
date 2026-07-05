import React from 'react';
import { useMulti, PageLoader } from '@/lib/useFetch';
import {
  getHeroMetrics, getVerticals, getVentures, getServices,
  getMetrics, getJourney, getTestimonials, getPartners, getBrandValues,
} from '@/lib/api';
import { useSite } from '@/lib/siteContext';

import HeroSection from '@/components/home/HeroSection';
import MetricsStrip from '@/components/home/MetricsStrip';
import AboutSummary from '@/components/home/AboutSummary';
import FounderPreview from '@/components/home/FounderPreview';
import VerticalsSection from '@/components/home/VerticalsSection';
import FeaturedVentures from '@/components/home/FeaturedVentures';
import ServicesTeaser from '@/components/home/ServicesTeaser';
import ImpactHighlights from '@/components/home/ImpactHighlights';
import JourneyTeaser from '@/components/home/JourneyTeaser';
import TestimonialsTrust from '@/components/home/TestimonialsTrust';
import { DownloadCTA, ValuesStrip } from '@/components/home/CtaSections';

const Home = () => {
  const { founder } = useSite();
  const { data, loading } = useMulti({
    heroMetrics: getHeroMetrics,
    verticals: getVerticals,
    ventures: getVentures,
    services: getServices,
    metrics: getMetrics,
    journey: getJourney,
    testimonials: getTestimonials,
    partners: getPartners,
    brandValues: getBrandValues,
  });

  if (loading || !data) return <div className="pt-32"><PageLoader label="Loading portfolio…" /></div>;

  return (
    <div className="overflow-hidden">
      <HeroSection founder={founder} />
      <MetricsStrip heroMetrics={data.heroMetrics} />
      <AboutSummary />
      <FounderPreview founder={founder} />
      <VerticalsSection verticals={data.verticals} />
      <FeaturedVentures ventures={data.ventures} />
      <ServicesTeaser services={data.services} />
      <ImpactHighlights metrics={data.metrics} />
      <JourneyTeaser journey={data.journey} />
      <TestimonialsTrust testimonials={data.testimonials} partners={data.partners} />
      <DownloadCTA />
      <ValuesStrip brandValues={data.brandValues} />
    </div>
  );
};

export default Home;
