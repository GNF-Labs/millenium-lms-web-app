import React, { FC, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { redirect, useRouter } from 'next/navigation'
import { API_URI } from '@/app/constants'

interface NavigationBarProps {
  /**
 * The logo image properties.
 * should have source, and size (width and height).
 * @example {source: logo.png, width:100, height:100}
 */
  logo: { source: string, width: number, height: number },

  /**
 * An array of objects representing the navigation menu items.
 * Each object should have a 'name' (displayed text) and a 'route' (link destination).
 * @example [{ name: "Home", route: "/" }, { name: "About", route: "/about" }]
 */
  navigationMenu?: { name: string, route: string }[]
}

/**
 * NavigationBar component
 * 
 * Renders a navigation bar with a logo and menu items.
 * 
 * @param props - The props for the NavigationBar component
 * @param props.logo - The logo configuration
 * @param props.navigationMenu - An array of objects representing the navigation menu items
 * @returns A React component representing the navigation bar
 */

const navigationRoute = [
  { name: "Home", route: "/" },
  { name: "Dashboard", route: "/dashboard" },
  { name: "Courses", route: "/courses" },
  { name: "Informations", route: "/informations" },
  { name: "Profile", route: "/profile" },
];

interface TheLinkProps {
  name:string;
  route:string;
  style?:React.CSSProperties;
  onClick?: (e:any)=>any
}


const TheLink: FC<TheLinkProps> = ({name, route, style, onClick}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    } else {
      router.push(route);
    }
  };



  return (
    <button style={style} onClick={handleClick} className='font-bold lg:text-[20px] sm:text-sm'>
      {name}
    </button>
  )
}


const NavigationBar: React.FC<NavigationBarProps> = ({ logo, navigationMenu = navigationRoute }) => {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const tokenSelector = useAppSelector((state) => state.jwt)

  useEffect(() => {
    console.log('Token changed:', tokenSelector);
  }, [tokenSelector])
  const handleProfileClick = async (e: React.MouseEvent) => {
    if (!tokenSelector.token) {
      router.push("/login");
      return;
    }

    try {
      const uri = API_URI;
      const response = await fetch(`${uri}/verify-token/${tokenSelector.username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenSelector.token}`
        },
      });

      if (response.status === 401 || response.status === 403) {
        router.push("/login");
      } else if (response.ok) {
        router.push("/profile");
      } else {
        console.error('Failed to verify token:', response.statusText);
      }
    } catch (error) {
      console.error('Error while verifying token:', error);
      router.push("/login");
    }
  }
  return (
    <div className='flex items-center flex-row justify-between pr-16 pl-8 py-1 z-50 w-full fixed text-black bg-blue-300/50 shadow-sm'>
      <div className="flex items-center">
        <Image src={`/${logo.source}`} alt="Logo" width={logo.width} height={logo.height} />
      </div>
      <div className='flex items-center flex-row lg:space-x-16 sm:space-x-4'>
        <TheLink name='Home' route='/'/>
        <TheLink name='Dashboard' route='/dashboard'/>
        <TheLink name='Courses' route='/courses'/>
        <TheLink name='Informations' route='/informations'/>
        <TheLink name='Profile' route={`/profile/${tokenSelector.username}`} onClick={handleProfileClick}/>
      </div>
    </div>
  )
}

export default NavigationBar
