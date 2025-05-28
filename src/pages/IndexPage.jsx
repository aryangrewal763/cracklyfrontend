import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
// import { BiLike } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import Magicbanner from "./magicBanner/MagicBanner";
import Organiser from "./Organizer/Organizer";
import Notiflix from "notiflix";
import NewsLetter from "./newsLetter/NewsLetter";

export default function IndexPage() {
  const [events, setEvents] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage

  // useEffect(() => {
  //   axios
  //     .get("/createEvent")
  //     .then((response) => {
  //       setEvents(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching events:", error);
  //       Notiflix.Notify.failure("Error fetching Events");
  //     });
  // }, []);


  
  

  return (
    <>
      <div className="w-full flex flex-col">
        <div>
          <Magicbanner />
          <Organiser />
        </div>
        
      </div>
      <div>
        <NewsLetter />
      </div>
    </>
  );
}
