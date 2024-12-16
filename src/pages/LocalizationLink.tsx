import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { AnchorHTMLAttributes } from "react";

type LocalizationLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps;

export default function LocalizationLink({
  children,
  className = "",
  ...rest
}: LocalizationLinkProps) {
  const { locale } = useRouter();

  return (
    <Link
      {...rest}
      locale={locale}
      className={`transition ${className}`}
    >
      {children}
    </Link>
  );
}
