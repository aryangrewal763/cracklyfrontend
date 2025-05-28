import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Select an option');
    const dropdownRef = useRef(null);

    const options = ['Option 1', 'Option 2', 'Option 3'];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-64" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="w-full px-4 py-2 text-left bg-white border rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center"
            >
                {selectedOption}
                <svg
                    className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute w-full mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        <Link to={"/questions"}>
                            <button
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-left"
                            >
                                Question
                            </button>
                        </Link>

                        <Link to={"/videoRecorder"}>
                            <button
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-left"
                            >
                                Video Recorder
                            </button>
                        </Link>
                        <Link to={"/interviewPrep"}>
                            <button
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-left"
                            >
                                Interview Prep
                            </button>
                        </Link>
                        <Link to={"/certificate"}>
                            <button
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-left"
                            >
                                Download Certificate
                            </button>
                        </Link>
                        <Link to={"/schedule"}>
                        <button
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-left"
                            >
                                Schedule Interview
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;