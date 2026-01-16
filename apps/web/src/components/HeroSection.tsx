import { Flame } from 'lucide-react';
import heroImage from '@/assets/hero-grill.jpg';
import logo from '@/assets/logo-mr-teo.svg';

const HeroSection = () => {
  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    menuSection?.scrollIntoView({
      behavior: 'smooth',
    });
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

      {/* Fire glow effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-fire-orange/20 via-fire-red/10 to-transparent blur-2xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <img
            src={logo}
            alt="Mr. Teo Chicken Grill"
            className="h-44 sm:h-56 md:h-64 w-auto mx-auto mb-4 drop-shadow-[0_0_30px_rgba(255,69,0,0.6)] animate-fade-in"
          />

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-fire-orange/30 mb-6 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <Flame className="w-4 h-4 text-fire-orange" />
            <span className="text-sm font-medium text-foreground">
              Pollos a la brasa desde 1995
            </span>
          </div>

          {/* Main Title */}
          <h1
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-fade-in"
            style={{
              animationDelay: '0.1s',
            }}
          >
            <span className="text-foreground">El Verdadero</span>
            <br />
            <span className="fire-text">Sabor a las Brasas</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in"
            style={{
              animationDelay: '0.2s',
            }}
          >
            Pollos y carnes cocinados lentamente sobre carbón de leña, con el sazón que solo la
            tradición puede dar.
          </p>

          {/* CTA Button */}
          <button
            onClick={scrollToMenu}
            className="btn-fire px-10 py-4 rounded-lg text-lg font-display font-semibold uppercase tracking-wider animate-fade-in"
            style={{
              animationDelay: '0.3s',
            }}
          >
            <span className="flex items-center gap-3">
              <Flame className="w-5 h-5" />
              Ver Menú
              <Flame className="w-5 h-5" />
            </span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-fire-orange rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
