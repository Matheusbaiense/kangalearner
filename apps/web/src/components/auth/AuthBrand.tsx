import Image from "next/image";
import Link from "next/link";

/** Brand lockup used above the auth cards: logo mark + wordmark. */
export function AuthBrand() {
  return (
    <Link href="/" className="auth-brand" aria-label="KangaLearner home">
      <Image
        src="/brand/logo-mark.svg"
        alt=""
        width={40}
        height={40}
        className="auth-logo-mark"
        priority
      />
      <span className="auth-logo-name">KangaLearner</span>
    </Link>
  );
}
