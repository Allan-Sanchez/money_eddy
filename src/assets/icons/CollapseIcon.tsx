import * as React from "react";

const CollapseIcon = (props : React.SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M19 13H5v-2h14v2z" />
  </svg>
);

export default CollapseIcon;
