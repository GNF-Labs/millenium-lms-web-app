import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface NavigationBarProps {
    /**
   * The logo image properties.
   * should have source, and size (width and height).
   * @example {source: logo.png, width:100, height:100}
   */
  logo: {source:string, width:number, height:number},

    /**
   * An array of objects representing the navigation menu items.
   * Each object should have a 'name' (displayed text) and a 'route' (link destination).
   * @example [{ name: "Home", route: "/" }, { name: "About", route: "/about" }]
   */
  navigationMenu: { name: string, route: string }[]
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
const NavigationBar: React.FC<NavigationBarProps> = ({ logo, navigationMenu }) => {
  return (
    <div className='flex items-center flex-row justify-between pr-16 pl-8 py-1 z-50 w-full fixed text-black bg-blue-300/50 backdrop-blur-xl shadow-sm'>
      <div className="flex items-center">
        <Image src={`/${logo.source}`} alt="Logo" width={logo.width} height={logo.height} />
      </div>
      <div className='flex items-center flex-row lg:space-x-16 sm:space-x-4'>
        {navigationMenu.map((item, index)=> (
          <Link key={index} href={item.route}>
            <p className='font-bold lg:text-[20px] sm:text-sm'>{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default NavigationBar
