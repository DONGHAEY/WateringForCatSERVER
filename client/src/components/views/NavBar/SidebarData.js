import React from 'react';
import * as BsIcons from 'react-icons/bs';
export const SidebarData = [
  {
    title: '서비스',
    path: '/machine',
    icon: <BsIcons.BsPersonLinesFill />,
    cName: 'nav-text'
  },
  {
    title: 'Iot 추가하기',
    path: '/make',
    icon: <BsIcons.BsBagFill />,
    cName: 'nav-text'
  },
  {
    title: 'Home',
    path: '/',
    icon: <BsIcons.BsFillHouseDoorFill />,
    cName: 'nav-text'
  },
  {
    title: 'About',
    path: '/About',
    icon: <BsIcons.BsFillInfoCircleFill />,
    cName: 'nav-text'
  },
  {
    title: 'Contact Us',
    path: '/Contact',
    icon: <BsIcons.BsEnvelopeFill />,
    cName: 'nav-text'
  }
];