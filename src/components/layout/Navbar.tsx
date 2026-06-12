import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Crown } from "lucide-react";
import { HOTEL } from "@/lib/mockData";
import { useAuth } from "@/lib/auth";

const links = [
  { to: "/", label: "Home" },
  { to: "/restaurant", label: "Restaurant" },
  { to: "/rooms", label: "Rooms" },
  { to: "/tourism", label: "Tourism" },
  { to: "/events", label: "Events" },
  
  { to: "/gallery", label: "Gallery" },

  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
  <img
    src="/dark.png"
    alt="Advitha Hotel"
    className="h-14 w- rounded-full object-cover"
  />

  <span className="flex flex-col leading-tight">
    <span className="font-display text-lg font-bold tracking-wide">
      {HOTEL.name.split(" & ")[0]}
    </span>

    <span className="text-[10px] uppercase tracking-[0.2em] text-gold">
      & Restaurant
    </span>
  </span>
</Link>


        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition"
              activeProps={{ className: "px-3 py-2 text-sm font-semibold text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          {user ? (
            <>
              <Link
                to={user.role === "admin" ? "/admin" : user.role === "receptionist" ? "/receptionist" : "/"}
                className="text-sm font-medium text-foreground/80 hover:text-primary"
              >
                {user.name}
              </Link>
              <button onClick={logout} className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-secondary">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-secondary">
              Login
            </Link>
          )}
          <Link
            to="/book"
            className="rounded-md gradient-gold px-4 py-2 text-sm font-semibold text-gold-foreground shadow-soft hover:opacity-90"
          >
            Book Now
          </Link>
        </div>

        <button className="lg:hidden p-2" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container mx-auto flex flex-col px-4 py-2">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2 text-sm font-medium hover:text-primary">
                {l.label}
              </Link>
            ))}
            {user ? (
              <button onClick={() => { logout(); setOpen(false); }} className="py-2 text-left text-sm font-medium">
                Logout ({user.name})
              </button>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="py-2 text-sm font-medium">Login</Link>
            )}
            <Link to="/book" onClick={() => setOpen(false)} className="my-2 rounded-md gradient-gold px-4 py-2 text-center text-sm font-semibold text-gold-foreground">
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}