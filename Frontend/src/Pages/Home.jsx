import React from 'react'
import Navbar from "../Components/Navbar"
import JobSearchArea from "../Components/JobSearch"
import JobLists from "../Components/JobLists"

const Home = () => {
  return (
    <div>
        <JobSearchArea/>
        <JobLists/>
    </div>
  )
}

export default Home