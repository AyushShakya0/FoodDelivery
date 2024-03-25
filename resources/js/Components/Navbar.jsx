import React, { useDebugValue } from "react";
import SearchIcon from '@mui/icons-material/Search';

export const Navbar = () => {
    return (

        <div>
            <div className="px-5 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between">
                <div className="flex items-centera space-x-4">
                    <div className="lg:mr-10 cursor-pointer flex items-center space-x-4 ">
                        <li className="logo font_semibold text-gray-300 text-2xl">
                            GoFood
                        </li>
                    </div>

                </div>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-10">
                <div className="">
                    <IconButton>
                        <SearchIcon sx={{fontSize:'1.5rem'}}/>
                    </IconButton>

                </div>
                <div>

                </div>

            </div>
        </div>

    )
}
