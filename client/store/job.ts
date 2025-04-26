import { create } from 'zustand';
import { IJob } from '@/types/job';
import { createJob, getJobById, getJobs, updateJob, deleteJob } from '@/lib/api/jobApi';

type JobStore = {
  jobs: IJob[];
  selectedJob: IJob | null;
  fetchJobs: () => Promise<void>;
  fetchJobById: (id: string) => Promise<void>;
  addJob: (job: Omit<IJob, '_id'>) => Promise<void>;
  editJob: (id: string, job: Partial<IJob>) => Promise<void>;
  removeJob: (id: string) => Promise<void>;
};

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],
  selectedJob: null,

  fetchJobs: async () => {
    const jobs = await getJobs();
    set({ jobs });
  },

  fetchJobById: async (id) => {
    const job = await getJobById(id);
    set({ selectedJob: job });
  },

  addJob: async (job) => {
    const newJob = await createJob(job);
    set((state) => ({ jobs: [...state.jobs, newJob] }));
  },

  editJob: async (id, job) => {
    const updatedJob = await updateJob(id, job);
    set((state) => ({
      jobs: state.jobs.map((j) => (j._id === id ? updatedJob : j)),
    }));
  },

  removeJob: async (id) => {
    await deleteJob(id);
    set((state) => ({
      jobs: state.jobs.filter((j) => j._id !== id),
    }));
  },
}));
