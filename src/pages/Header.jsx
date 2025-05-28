import { useContext, useEffect, useRef, useState } from "react";
import axios from 'axios'
import {Link} from "react-router-dom";
import { UserContext } from "../UserContext";
import { RxExit } from 'react-icons/rx';
import { BsFillCaretDownFill } from 'react-icons/bs';
import Notiflix from "notiflix";
import IMG from '../assets/crackly-high-resolution-logo.png'
import DropdownMenu from "./DropdownMenu";

export default function Header() {
  const {user,setUser} = useContext(UserContext);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  // const [events, setEvents] = useState([]);
 
  async function logout(){
    await axios.post('/logout');
    localStorage.removeItem("user");
    localStorage.clear();
    setUser(null);
    window.location.reload();
  }


  return (
    <div>
      <header className='flex py-2 px-4 sm:px-6 justify-between place-items-center'>
          
          <div className="flex items-center gap-8">
            <Link to={'/'} className="flex item-center ">
              <img src={IMG} alt="" className='w-16 rounded-md'/>
            </Link>
            <Link to={'/aboutPage'} className="p-2 bg-gray-300 rounded-md">About </Link>
          </div>
           
        {!!user &&(
          
          <div className="flex flex-row items-center gap-2 sm:gap-8 ">
            <div className="flex items-center gap-2 font-semibold">
              <Link to={'/useraccount'}>  {/*TODO: Route user profile page after creating it -> 1.50*/}
                <div className=" shadow-xl border-2 hover:scale-110 transition-all duration-200 p-2 rounded-md">
                  {user.name.toUpperCase()}
                </div> 
              </Link>
              
              {/* <BsFillCaretDownFill className="h-5 w-5 cursor-pointer hover:rotate-180 transition-all" onClick={() => setisMenuOpen(!isMenuOpen)}/> */}
            </div>
            <div className="hidden md:flex">
              <button onClick={logout} className="secondary">
                <div className="font-semibold">Log out</div>
                <RxExit/>
              </button>
            </div>
          </div>  
        )}

        {/* -------------------IF user is not Logged in DO this MAIN AND MOBILE-------------------- */}
        {!user &&(
          <div>
            
            <Link to={'/login'} className=" ">
              <button className="primary">
                <div>Sign in </div>
              </button>
            </Link>
          </div>
        )}
          
          {/* -------------------IF user is Logged DO this Mobile -------------------- */}
          {!!user &&(
            //w-auto flex flex-col absolute bg-white pl-2 pr-6 py-5 gap-4 rounded-xl
            <div className="absolute z-10 mt-64 flex flex-col w-48 bg-white right-2 md:right-[160px] rounded-lg shadow-lg"> 
            {/* TODO: */}
              <nav className={`block ${isMenuOpen ? 'block' : 'hidden'} `}>
                <div className="flex flex-col font-semibold text-[16px]">
               
                

                <Link className="flex hover:bg-background hover:shadow py-2 pl-6 pb-3 pr-8 rounded-lg" onClick={logout}>
                  Log out
                </Link>
                </div>
              </nav>
            </div>
        )}

        </header>
          
    </div>
  )
}
