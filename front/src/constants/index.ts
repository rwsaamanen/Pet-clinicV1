import HomeIcon from '../assets/home.png';
import PetsIcon from '../assets/pets.png';


// Links

export const Links = [
    { href: '/pets', key: 'pets', label: 'Pets'},
    { href: '/about', key: 'about', label: 'About' },
    { href: '/contact', key: 'contact', label: 'Contact' },
]

// Sidebar Links

export const sidebarLinks = [
    { href: '/dashboard', key: 'dashboard', label: 'Dashboard', imgURL: HomeIcon },
    { href: '/dashboard/all-pets', key: 'pets', label: ' All Pets', imgURL: PetsIcon },
  ];