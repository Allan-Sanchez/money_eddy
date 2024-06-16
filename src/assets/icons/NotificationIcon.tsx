import * as React from "react";

const NotificationIcon = (props : React.SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M12 2C10.34 2 9 3.34 9 5c0 0.89 0.36 1.67 0.93 2.22C8.37 7.76 7.23 9.13 6.45 10.78 5.56 12.63 5 14.67 5 16.78V19h2v2h10v-2h2v-2.22c0-2.11-0.56-4.15-1.45-6-0.78-1.65-1.92-3.02-3.48-3.56C14.64 6.67 15 5.89 15 5c0-1.66-1.34-3-3-3z"/>
  </svg>
);

export default NotificationIcon;
