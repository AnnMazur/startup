import { HeroSection } from "@/components/home/hero-section";
import { PromotedVenues } from "@/components/home/promoted-venues";
import { FeedSection } from "@/components/home/feed-section";
import { CTASection } from "@/components/home/cta-section";
import { venues } from "@/lib/data/venues";
import { feedPosts } from "@/lib/data/feed";

export default function HomePage() {
  // Get promoted venues
  const promotedVenues = venues.filter((v) => v.isPromoted);

  return (
    <>
      <HeroSection />
      <PromotedVenues venues={promotedVenues} />
      <FeedSection posts={feedPosts} />
      <CTASection />
    </>
  );
}
