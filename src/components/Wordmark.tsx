import Image from "next/image";
import logo from "../../public/logo/a_logo.webp";

/** The nav mark. */
export function LogoBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <Image src={logo} alt="Ahrom Labs" className="h-8 w-8" />
    </span>
  );
}
