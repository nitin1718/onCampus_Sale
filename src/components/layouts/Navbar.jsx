'use client'

import React from 'react'
import { useContext } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Search from "./SearchIcon";
import CartContext from '@/context/CartContext';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/react";
import { Button } from '@nextui-org/react'


const menuItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'About',
    href: '#',
  },
  {
    name: 'Contact',
    href: '#',
  },
]

export default function App() {

  const router = useRouter();

  const handleSignUpClick = () => {
    router.push('/register');
  };
  const handleLogInClick = () => {
    router.push('/login');
  };



  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const [showDropdown, setShowDropdown] = React.useState(false)

  const { data: session } = useSession()


  const handleShowDropdown = () => setShowDropdown(prev => true)

  const handleHideDropdown = () => setShowDropdown(prev => false)

  const loggedIn = false

  const { cart } = useContext(CartContext);
  const cartItems = cart?.cartItems;

  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <svg
              width="30"
              height="30"
              viewBox="0 0 50 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                fill="black"
              />
            </svg>
          </span>
          <span className="font-bold">Campus_ReSale</span>
        </div>
        <div className="hidden grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  {item.name}
                  <span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div >
          <Search />
        </div>

        <Link color="foreground" href="/cart">
          <span className="hidden lg:inline ml-1">
            Cart (<b>{cartItems?.length || 0}</b>)
          </span>        </Link>

        {session?.user ? (

          <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer">
            <img
              className="w-10 h-10 rounded-full"
              src={session?.user?.avatar||'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'}
            />

            <Dropdown>
              <DropdownTrigger>
                <Button
                  color='default'
                  variant='shadow'
                  className="capitalize"
                >
                  <div className="space-y-1 font-medium">
                  <p>
                      {session?.user?.username}
                      <time className="block text-sm text-gray-500 dark:text-gray-400">
                        {session?.user?.email}
                      </time>
                    </p>
                  </div>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Dropdown Variants"
                color='default'
                variant='shadow'
              >
                <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{session.user?.email}</p>
          </DropdownItem>
                <DropdownItem key="copy"><Link href="/me">Profile</Link></DropdownItem>
                <DropdownItem key="edit"><Link href={`/me/${session?.user?._id}`} key={session?.user?._id}>Edit Profile</Link></DropdownItem>
                <DropdownItem key="logout" color="danger">
              <button onClick={() => {signOut(); handleHideDropdown()}} >Logout</button>
              </DropdownItem>
              </DropdownMenu>
            </Dropdown>




          </div>

        )
          : (<div className="hidden space-x-2 lg:block">

            <button
              type="button"
              onClick={handleSignUpClick}
              className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={handleLogInClick}
              className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Log In
            </button>
          </div>
          )
        }
      </div>
    </div>
  )
}
