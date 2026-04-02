import HomeHeroAside from './HomeHeroAside';
import HomeHeroBody from './HomeHeroBody';
import HomeHeroHeading from './HomeHeroHeading';
import HomeHeroKicker from './HomeHeroKicker';

export default function HomeHero() {
  return (
    <section className="home-hero" aria-label="Introduction">
      <div className="home-hero-left">
        <HomeHeroKicker />
        <HomeHeroHeading />
        <HomeHeroBody />
      </div>
      <HomeHeroAside />
    </section>
  );
}
