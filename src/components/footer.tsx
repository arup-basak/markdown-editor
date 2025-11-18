import Link from "next/link";
import { footerSections, footerBottomLinks } from "@/constants/footer";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="bg-white mx-auto">
        <div className="border border-white shadow-lg rounded-lg p-8 md:p-12">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <h3 className="text-lg font-semibold">Flowprint</h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                Flowprint helps teams transform complex data into clear,
                engaging stories — everything you need in one place.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="grid grid-cols-3 gap-8">
              {footerSections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h4 className="text-sm font-semibold">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-foreground hover:text-muted-foreground transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center font-bold select-none w-screen overflow-x-hidden">
          <span
            className="bg-clip-text text-transparent bg-linear-to-b from-black/30 to-transparent text-[18vw]"
            
          >
            FLOWPRINT
          </span>
        </div>
      </div>
    </footer>
  );
}
