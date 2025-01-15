import { HousePlug, Menu} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Sheet ,SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';

const header = () => {
  return (
    <div className="flex justify-center items-center mt-6">
      <header className='z-40 w-[90%] border-b bg-red-600 rounded-3xl'>
        <div className='flex h-16 items-center justify-between px-4 md:px-6'>
          <Link to="/shop/home" className="flex items-center gap-2">
           <HousePlug className='h-6 w-6'/>
           <span className='font-bold'> Aisle Essentials</span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle header menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs">
              {/* <MenuItems/> */}
              {/* <HeaderRightContent/> */}

            </SheetContent>
          </Sheet>
          <div className="hidden lg:block">
          {/* <MenuItems /> */}
        </div>

        <div className="hidden lg:block">
          {/* <HeaderRightContent /> */}
        </div>
        </div>
        
      </header>

    </div>
  )
}

export default header