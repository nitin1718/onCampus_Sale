// 'use client'
// import React from "react";
// import Link from "next/link";
// import { useSession } from "next-auth/react";
// import { signOut } from "next-auth/react";
// import {
//   Card,
//   Typography,
//   List,
//   ListItem,
//   ListItemPrefix,
//   ListItemSuffix,
//   Chip,
//   Accordion,
//   AccordionHeader,
//   AccordionBody,
// } from "@material-tailwind/react";
// import {
//   PresentationChartBarIcon,
//   ShoppingBagIcon,
//   UserCircleIcon,
//   Cog6ToothIcon,
//   InboxIcon,
//   PowerIcon,
// } from "@heroicons/react/24/solid";
// import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

// export default function Sidebar() {

//   const { data: session } = useSession()

//   const [open, setOpen] = React.useState(0);

//   const handleOpen = (value) => {
//     setOpen(open === value ? 0 : value);
//   };

//   return (
//     <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
//       <div className="mb-2 p-4">
//         <Typography variant="h5" color="blue-gray">
//           Sidebar
//         </Typography>
//       </div>


//       <List>
//       {session?.user?.role === "admin" && (
//         <Accordion
//           open={open === 1}
//           icon={
//             <ChevronDownIcon
//               strokeWidth={2.5}
//               className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
//             />
//           }
//         >      
          
      
//           <ListItem className="p-0" selected={open === 1}>
//             <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
//               <ListItemPrefix>
//                 <PresentationChartBarIcon className="h-5 w-5" />
//               </ListItemPrefix>
//               <Typography color="blue-gray" className="mr-auto font-normal">
//                 Dashboard
//               </Typography>
//             </AccordionHeader>
//           </ListItem>
//           <AccordionBody className="py-1">
//             <List className="p-0">
//               <ListItem>
//                 <ListItemPrefix>
//                   <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
//                 </ListItemPrefix>
//                 <Link
//                   href="/admin/products/new"
//                   className="block px-1 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
//                 >New Product <span className="text-red-500">(Admin)</span>
//                 </Link>
//               </ListItem>
//               <ListItem>
//                 <ListItemPrefix>
//                   <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
//                 </ListItemPrefix>
//                 <Link
//                   href="/admin/products"
//                   className="block px-1 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
//                 >All Products <span className="text-red-500">(Admin)</span>
//                 </Link>
//               </ListItem>
//               <ListItem>
//                 <ListItemPrefix>
//                   <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
//                 </ListItemPrefix>
//                 <Link
//                   href="/admin/orders"
//                   className="block px-1 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
//                 >All Orders <span className="text-red-500">(Admin)</span>
//                 </Link>
//               </ListItem>
//               <ListItem>
//                 <ListItemPrefix>
//                   <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
//                 </ListItemPrefix>
//                 <Link
//                   href="/admin/users"
//                   className="block px-1 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
//                 >All Users <span className="text-red-500">(Admin)</span>
//                 </Link>
//               </ListItem>

//             </List>

//           </AccordionBody>
//         </Accordion>
//         )}
//         <Accordion
//           open={open === 2}
//           icon={
//             <ChevronDownIcon
//               strokeWidth={2.5}
//               className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
//             />
//           }
//         >

//           <ListItem className="p-0" selected={open === 2}>
//             <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
//               <ListItemPrefix>
//                 <ShoppingBagIcon className="h-5 w-5" />
//               </ListItemPrefix>
//               <Typography color="blue-gray" className="mr-auto font-normal">
//                 E-Commerce
//               </Typography>
//             </AccordionHeader>
//           </ListItem>
//           <AccordionBody className="py-1">
//             <List className="p-0">
//               <ListItem>
//                 <ListItemPrefix>
//                   <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
//                 </ListItemPrefix>
//                 <Link href='/me/orders'>Your Orders</Link>
//               </ListItem>
//               <ListItem>
//                 <ListItemPrefix>
//                   <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
//                 </ListItemPrefix>
//                 Products
//               </ListItem>
//             </List>
//           </AccordionBody>
//         </Accordion>
//         <ListItem>
//           <ListItemPrefix>
//             <InboxIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           Inbox
//           <ListItemSuffix>
//             <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
//           </ListItemSuffix>
//         </ListItem>
//         <ListItem>
//           <ListItemPrefix>
//             <UserCircleIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           <Link href='/me'>Profile</Link>
//         </ListItem>
//         <ListItem>
//           <ListItemPrefix>
//             <Cog6ToothIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           <Link href={`/me/${session?.user?._id}`} key={session?.user?._id}>Edit Profile</Link>
//         </ListItem>
//         <ListItem>
//           <ListItemPrefix>
//             <PowerIcon className="h-5 w-5" />
//           </ListItemPrefix>
//           <button onClick={() => { signOut() }} >Logout</button>
//         </ListItem>
//       </List>
//     </Card>
//   );
// }






"use client";


import Link from "next/link";
import React, { useContext } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Sidebar = () => {

  const { data: session } = useSession()

  const logoutHandler = () => {
    signOut();
  };

  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <ul className="sidebar">
        {session?.user?.role === "admin" && (
          <>
            <li>
              {" "}
              <Link
                href="/admin/products/new"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
              >
                New Product <span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <li>
              {" "}
              <Link
                href="/admin/products"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
              >
                All Products <span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <li>
              {" "}
              <Link
                href="/admin/orders"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
              >
                All Orders <span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <li>
              {" "}
              <Link
                href="/admin/users"
                className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
              >
                All Users <span className="text-red-500">(Admin)</span>
              </Link>
            </li>

            <hr />
          </>
        )}

        <li>
          {" "}
          <Link
            href="/me"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Your Profile
          </Link>
        </li>
        <li>
          {" "}
          <Link
            href="/me/orders"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Orders
          </Link>
        </li>
        <li>
          {" "}
          <Link
            href="/me/update"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Update Profile
          </Link>
        </li>
        <li>
          {" "}
          <Link
            href="/me/update_password"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Update Password
          </Link>
        </li>

        <li>
          {" "}
          <a
            className="block px-3 py-2 text-red-800 hover:bg-red-100 hover:text-white-500 rounded-md cursor-pointer"
            onClick={logoutHandler}
          >
            Logout
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;