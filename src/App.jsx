import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import RegisterPage from './pages/RegisterPage'
import Layout from './Layout'
import LoginPage from './pages/LoginPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import UserAccountPage from './pages/UserAccountPage'
import NotFoundPage from './pages/NotFoundPage';
import AboutSection from './pages/AboutSection'
import { useState,useContext } from 'react'
import { UserContext } from './UserContext'
import UserAccountPageEdit from './pages/UserAccountPageEdit'
import QuizApp from './pages/req/QuizApp'
import VideoRecorder from './pages/req/VideoRecorder'
import InterviewPrep from './pages/req/InterviewPrep'
import CertificateComponent from './pages/req/CertificateComponent'
import MeetingScheduler from './pages/req/MeetingScheduler'


axios.defaults.baseURL = 'https://cracklybackend-git-master-aryans-projects-c0da387d.vercel.app/';

axios.defaults.withCredentials=true;


function App() {
  const user1 = JSON.parse(localStorage.getItem("user"));
  const {user,setUser}=useContext(UserContext);
  //setUser({user1});
  console.log("User : ",user);
  
  return (
    <UserContextProvider> 
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/useraccount" element={<UserAccountPage />} />         
          <Route path="/aboutPage" element={<AboutSection />} />
          <Route path="/userEdit" element={<UserAccountPageEdit></UserAccountPageEdit>}></Route>
          <Route path="/questions" element={<QuizApp></QuizApp>}></Route>
          <Route path='/videoRecorder' element={<VideoRecorder></VideoRecorder>}></Route>
          <Route path='/interviewPrep' element={<InterviewPrep></InterviewPrep>}></Route>
          <Route path='/certificate' element={<CertificateComponent></CertificateComponent>}></Route>
          <Route path='/schedule' element={<MeetingScheduler></MeetingScheduler>}></Route>
          

        </Route>

        
        {!user1&&<Route path="/register" element={<RegisterPage />} />}
        {!user1&&<Route path="/login" element={<LoginPage />} />}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;