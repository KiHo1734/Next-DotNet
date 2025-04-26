"use client";

import { IJob } from "@/types/job";
import { useRouter } from "next/navigation";

export function JobsCard ({
    _id,
    title,
    detail
} : IJob) {
    const router = useRouter();

    return (
        <div className="card bg-base-100 w-96 shadow-sm htransition-transform duration-300 hover:scale-102 hover:shadow-lg cursor-pointer" onClick={() => router.push(`/job/${_id}`)}>
            <figure>
                <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h1>{ _id }</h1>
                <h2 className="card-title line-clamp-2">{ title }</h2>
                <p className="line-clamp-2">{ detail }</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary bg-yellow-400 border-0 hover:bg-yellow-600" onClick={() => router.push(`/job/edit/${_id}`)}>Edit</button>
                    <button className="btn btn-primary bg-red-500 border-0 hover:bg-red-700">Delete</button>
                </div>
            </div>
        </div>
    )
}

export function CreateCard () {
    const router = useRouter();
    
    return (
        <div 
        className="card bg-base-100 w-96 shadow-sm transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer border-2 border-dashed border-gray-300 hover:border-primary"
        onClick={() => router.push("/job/create")}
        role="button"
        aria-label="Create new job"
      >
        <figure className="relative h-48 bg-gray-100 flex items-center justify-center">
          <div className="text-center p-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 mx-auto text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <p className="mt-2 text-gray-500">Add New Job</p>
          </div>
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-gray-700">Create New Listing</h2>
          <p className="text-gray-500">Click to add a new job opportunity</p>
        </div>
      </div>
    
    )
}