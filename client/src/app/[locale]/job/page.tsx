"use client"
import { useEffect } from "react";
import useJobsStore from "../../store/job";

export default function Job() {
    const { Jobs, loading, error, getJobs } = useJobsStore();
  
    useEffect(() => {
      getJobs();
    }, []);
  
    return (
      <div>
        <h1 className="flex">Welcome To Jobs Page</h1>
  
        {loading && <p>Loading jobs...</p>}
        {error && <p className="text-red-500">{error}</p>}
  
        <ul>
          {Jobs.map((job) => (
            <li key={job._id}>
              <h2>{job.title}</h2>
              <p>Type: {job.type}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  