import Image from "next/image";

const LOGO_SRC = "/dwjob-logo-transparent.png";

export default function BrandLogo({
  className = "h-12 w-auto sm:h-14",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={LOGO_SRC}
      alt="DreamWise Konsulting"
      width={643}
      height={388}
      className={className}
      priority={priority}
    />
  );
}
