import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Notiflix from "notiflix";

export default function UserAccountPageEdit() {
  const [name, setName] = useState("");
  const [resumeFile, setResumeFile] = useState(null); // State for resume file
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  // Redirect to login if user is not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Create FormData object to send both name and resume file
    const formData = new FormData();
    formData.append("name", name);
    if (resumeFile) {
      formData.append("resume", resumeFile); // Append the resume file
    }

    try {
      const response = await axios.post("/editUser", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file upload
        },
      });

      console.log("res:::", response.data.data);

      // Update user context with the new name and resume file name
      setUser((prevUser) => ({
        ...prevUser,
        name: response.data.data.name,
        resume: response.data.data.resume, // Update resume file name
      }));

      // Check response success
      if (response.status === 200 || response.status === 201) {
        Notiflix.Notify.success("User updated successfully!");
      } else {
        Notiflix.Notify.failure("Failed to update user. Please try again.");
      }

      navigate("/");
    } catch (error) {
      // Log and notify error
      console.error("Error while updating user:", error);
      Notiflix.Notify.failure("An error occurred while updating user.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow rounded-lg p-6 w-full max-w-md">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            Edit Account Page
          </h1>
          <p className="text-gray-700 font-semibold">
            Name:<sup className="text-red-500">*</sup>
          </p>
          <input
            type="text"
            name="name"
            className="border-2 border-blue-600 rounded-md p-2 w-full"
            onChange={(e) => setName(e.target.value)}
          ></input>

          {/* Resume Upload Input */}
          <div className="mt-4">
            <p className="text-gray-700 font-semibold">
              Upload Resume:<sup className="text-red-500">*</sup>
            </p>
            <input
              type="file"
              name="resume"
              className="border-2 border-blue-600 rounded-md p-2 w-full"
              accept=".pdf,.doc,.docx" // Accept only specific file types
              onChange={(e) => setResumeFile(e.target.files[0])} // Set the selected file
            />
          </div>

          {user.role === "admin" ? (
            <div className="mt-4">
              <h2 className="text-lg font-medium text-gray-800">Admin Section</h2>
              <p className="text-gray-600 text-sm">
                You have access to administrative features.
              </p>
            </div>
          ) : (
            <div className="mt-4">
              <h2 className="text-lg font-medium text-gray-800">User Section</h2>
              <p className="text-gray-600 text-sm">
                Thank you for being a valued user.
              </p>
            </div>
          )}
          <button
            type="submit"
            className="text-xl font-semibold text-white p-2 bg-blue-500 rounded-md w-fit cursor-pointer"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}