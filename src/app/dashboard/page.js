

import Appsidebar from '@/components/Appsidebar'
import Maincontent from '@/components/Maincontent'
import { Sidebar, SidebarHeader, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

const page = () => {
  return (
    <>
    <SidebarProvider>
      <Appsidebar/>
      <main className='w-full h-screen'>
        {/* <SidebarTrigger/> */}
     

        <main className='mt-2' >

          <Maincontent/>

        </main>

        
       
      </main>
    </SidebarProvider>
    </>
  )
}

export default page