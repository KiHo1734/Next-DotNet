"use client"
import { useEffect } from "react";
import { useJobStore } from "@/store/job";
import { CreateCard, JobsCard } from "@/components/job-card";

export default function JobList() {
  const { jobs, fetchJobs } = useJobStore();

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="space-y-4 ">
      <div className="px-5 py-2 bg-white">
        <h1 className="text-2xl text-emerald-400">งานทั้งหมด</h1>
      </div>
      <div className="flex flex-row flex-wrap space-x-4 justify-center p-4">
        <CreateCard></CreateCard>
        {jobs.map((job) => (
          <JobsCard 
            key={job._id}
            _id={job._id} 
            title={job.title} 
            type={job.type} 
            detail={job.detail} 
            purpose={job.purpose} 
          />
        ))}
      </div>
    </div>
  );
}