import { Link } from "react-router-dom";
import organizer from "../magicBanner/images2/organizer.jpg";

const Organizer = () => {
  return (
    <div className="bg-gray-200 py-16 font-poppins">
       <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:gap-10 items-center">
          <div className="flex-1">
            <img className="rounded-md" src={organizer} alt="" />
          </div>
          <div className="flex-1 bg-white md:-ml-20 p-12 rounded-md">
            <h2 className="text-2xl text-dark_01 md:text-5xl font-semibold">
              What we do ?
            </h2>
            <p className="text-black my-4 ">
            At Crackly, we empower you to ace your interviews with confidence. From personalized mock interviews and AI-powered feedback to expert tips and industry-specific resources, we provide everything you need to prepare smarter and perform better. Whether you're tackling technical challenges, behavioral questions, or case studies, Crackly is your go-to platform for turning interview anxiety into success.
            </p>
            <Link to="request-organizer">
              <button className="bg-dark_01 text-white px-6 py-3 rounded-md uppercase">
                Request Organizer
              </button>
            </Link>
          </div>
        </div>
        </div>
    </div>
  );
};

export default Organizer;
