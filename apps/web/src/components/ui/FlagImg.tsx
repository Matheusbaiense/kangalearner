import Image from "next/image";

export function FlagImg({ country, size = 20 }: { country: string; size?: number }) {
  return (
    <Image
      src={`https://flagcdn.com/w${size * 2}/${country}.png`}
      width={size}
      height={Math.round(size * 0.75)}
      alt=""
      aria-hidden="true"
      style={{ borderRadius: 2, objectFit: "cover", display: "block", flexShrink: 0 }}
    />
  );
}
