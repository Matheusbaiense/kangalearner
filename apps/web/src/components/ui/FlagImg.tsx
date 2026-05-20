export function FlagImg({ country, size = 20 }: { country: string; size?: number }) {
  return (
    <img
      src={`https://flagcdn.com/w${size}/${country}.png`}
      srcSet={`https://flagcdn.com/w${size * 2}/${country}.png 2x`}
      width={size}
      height={Math.round(size * 0.75)}
      alt=""
      aria-hidden="true"
      style={{ borderRadius: 2, objectFit: "cover", display: "block", flexShrink: 0 }}
    />
  );
}
