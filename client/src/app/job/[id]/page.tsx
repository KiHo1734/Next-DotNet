"use client"
import { useEffect } from "react";
import { useJobStore } from "@/store/job";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function JobDetail() {
  const param = useParams<{ id: string }>();
  const { fetchJobById, selectedJob } = useJobStore();

  useEffect(() => {
    if (!param?.id) return;
    fetchJobById(param.id);
  }, [param?.id]);
  
  if (!selectedJob) {
    return <div>ไม่พบข้อมูลงานนี้</div>;
  }
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{selectedJob.title}</h1>
      <p className="mb-2">{selectedJob.detail}</p>
      <p className="text-gray-600">{selectedJob.type}</p>
      <p className="">{selectedJob.purpose}</p>
      <Link href="/job">
        <button className="btn btn-primary">Back</button>
      </Link>
    </div>
  );  
}