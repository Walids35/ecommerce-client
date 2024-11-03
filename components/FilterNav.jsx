import React, { useState } from 'react'

const FilterNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="relative md:hidden">
        <button 
          onClick={toggleDrawer} 
          className="px-4 py-2 bg-blue-500 text-white mt-5 bg-blue"
        >
          Filter
        </button>
  
        <div className={`fixed z-50 top-0 left-0 h-full w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
            <h2 className="text-lg font-semibold">Drawer Title</h2>
            <button onClick={toggleDrawer} className="text-xl">×</button>
          </div>
          <div className="p-4">
            <p>This is the drawer content. You can add anything you want here.</p>
            {/* Additional content */}
          </div>
        </div>
  
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black opacity-50" 
            onClick={toggleDrawer}
          ></div>
        )}
      </div>
    );
}

export default FilterNav