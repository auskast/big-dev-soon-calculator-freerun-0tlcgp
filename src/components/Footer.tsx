import * as React from "react";

import clsx from "clsx";

const Footer = () => (
  <footer className="p-2 text-center text-sm">
    <FooterLink
      href="https://bigdevsoon.me"
      target="_blank"
      rel="noopener noreferrer"
    >
      Project by BigDevSoon
    </FooterLink>{" "}
    |{" "}
    <span>
      Built with ❤️ by{" "}
      <FooterLink
        href="https://github.com/auskast"
        target="_blank"
        rel="noopener noreferrer"
      >
        @auskast
      </FooterLink>
    </span>
  </footer>
);

const FooterLink = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"a">) => (
  <a className={clsx("font-bold", className)} {...props} />
);

export { Footer };
