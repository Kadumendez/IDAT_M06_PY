import { Flame, MapPin, Phone, Clock } from 'lucide-react';
import logo from '@/assets/logo-mr-teo.png';

const Footer = () => {
  return (
    <footer className="bg-charcoal border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <img
              src={logo}
              alt="Mr. Teo Chicken Grill"
              className="h-24 w-auto drop-shadow-[0_0_15px_rgba(255,69,0,0.5)]"
            />
            <p className="text-fire-orange font-display text-lg font-semibold tracking-wide">
              Pollos a la brasa desde 1995
            </p>
            <p className="text-muted-foreground text-sm text-center md:text-left">
              Llevando el verdadero sabor a las brasas a tu mesa.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
              <Flame className="w-4 h-4 text-fire-orange" />
              Contáctanos
            </h4>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-fire-orange" />
                Av. Las Brasas 123, Lima
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-fire-orange" />
                +51 999 888 777
              </p>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-fire-orange" />
              Horarios
            </h4>
            <div className="space-y-1 text-muted-foreground text-sm">
              <p>Lun - Vie: 11:00 AM - 10:00 PM</p>
              <p>Sáb - Dom: 11:00 AM - 11:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Mr. Teo Chicken Grill. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
