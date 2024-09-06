import React, { FC, useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { redirect, useRouter } from 'next/navigation'
import { API_URI } from '@/app/constants'
import store from '@/redux/store'
import { getToken, deleteToken } from '@/redux/slices/tokenSlice'
import { fetchProfile } from '@/services/handlers'
import { errorMonitor } from 'node:events'

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
  { name: "Profile", route: "/profile" },
];

interface TheLinkProps {
  name: string;
  route: string;
  style?: React.CSSProperties;
  onClick?: (e: any) => any
}


const TheLink: FC<TheLinkProps> = ({ name, route, style, onClick }) => {
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
    <Link style={style} className='font-bold lg:text-[20px] sm:text-sm' href={route}>
      <p>{name}</p>

    </Link>
  )
}

interface AccountDropdownProps {
  profileClick?: (e: any) => any
  logoutClick?: (e: any) => any
}

const AccountDropdown: FC<AccountDropdownProps> = ({ profileClick, logoutClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const tokenSelector = useAppSelector((state) => state.jwt)
  const [profileImage, setProfileImage] = useState("");

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const init = async () => {
      try {

        const { status, data } = await fetchProfile(tokenSelector.username, tokenSelector.token as string)
        if (status !== 200) {
          console.error(data);
          return;
        }

        setProfileImage(data?.image_url);
      } catch (error) {
        console.error(error)
      }
    }
    init()
  }, [tokenSelector])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-2 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="rounded-full w-10 h-10 overflow-hidden">
          <Image
            src={profileImage !== "" ? profileImage : "https://via.placeholder.com/40"}
            alt="Profile"
            className="rounded-full object-cover"
            width={40}
            height={40}

          />
        </div>
      </button>
      <div
        className={`absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg transition-transform duration-300 ease-out transform ${isOpen
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-95 pointer-events-none'
          }`}
      >
        <ul className="py-1 text-gray-700">
          <li>
            <button
              onClick={profileClick}
              className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
            >
              My Profile
            </button>
          </li>
          <li>
            <button
              onClick={logoutClick}
              className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
            >
              Log out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};


const NavigationBar: React.FC<NavigationBarProps> = ({ logo, navigationMenu = navigationRoute }) => {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const tokenSelector = useAppSelector((state) => state.jwt)

  useEffect(() => {
    // Function to be called on state change
    const handleStateChange = () => {
      const state = getToken(store.getState());
      console.log('Token changed:', state); // Log the updated jwt state


    };

    // Subscribe to the store
    const unsubscribe = store.subscribe(handleStateChange);

    // Unsubscribe when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);


  const handleLogout = () => {
    dispatch(deleteToken());
    router.push("/");
  }

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
    <div className='flex items-center flex-row justify-between pr-16 pl-8 py-1 z-10 w-full fixed text-black bg-blue-300/50 shadow-sm'>
      <div className="flex items-center">
        <Image src={`/${logo.source}`} alt="Logo" width={logo.width} height={logo.height} />
      </div>
      <div className='flex items-center flex-row lg:space-x-16 sm:space-x-4'>
        <TheLink name='Home' route='/' />
        <TheLink name='Dashboard' route='/dashboard' />
        <TheLink name='Courses' route='/courses' />
        <AccountDropdown profileClick={handleProfileClick} logoutClick={handleLogout} />
      </div>
    </div>
  )
}

export default NavigationBar
