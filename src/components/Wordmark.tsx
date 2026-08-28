import Image from "next/image";
import logo from "../../public/logo/a12.png";

/** The nav mark. The ring is baked into the artwork itself, not a CSS border. */
export function LogoBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <Image src={logo} alt="Ahrom Labs" className="h-8 w-8" />
    </span>
  );
}
