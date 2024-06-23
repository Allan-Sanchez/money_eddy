import React from 'react';
import HomeIcon from '../assets/icons/HomeIcon';
import ProfileIcon from '../assets/icons/ProfileIcon';
import SettingsIcon from '../assets/icons/SettingsIcon';
import LogoutIcon from '../assets/icons/LogoutIcon';
import NotificationIcon from '../assets/icons/NotificationIcon';
import CollapseIcon from '../assets/icons/CollapseIcon';
import HamburgerIcon from '../assets/icons/HamburgerIcon';
import MoneyIcon from '../assets/icons/MoneyIcon';
import BorrowerIcon from '../assets/icons/BorrowerIcon';
import LoanIcon from '../assets/icons/LoanIcon';
import CalcIcon from '../assets/icons/CalcIcon';
interface IconProps {
  name: string;
  className?: string;
}

const iconMap: { [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>> } = {
  home: HomeIcon,
  profile: ProfileIcon,
  settings: SettingsIcon,
  logout: LogoutIcon,
  notification: NotificationIcon,
  collapse: CollapseIcon,
  hamburger: HamburgerIcon,
  money: MoneyIcon,
  borrower: BorrowerIcon,
  loan: LoanIcon,
  calc: CalcIcon,
};

const Icon: React.FC<IconProps> = ({ name, className }) => {
  const SvgIcon = iconMap[name];
  return <SvgIcon className={className} />;
};

export default Icon;
