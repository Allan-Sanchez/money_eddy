import * as React from "react";

const HamburgerIcon = (props : React.SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
  </svg>
);

export default HamburgerIcon;
