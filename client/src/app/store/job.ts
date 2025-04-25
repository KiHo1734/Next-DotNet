import { create } from 'zustand';
import axios from 'axios';
import { JobStore, Job } from '../types/job';

const useJobsStore = create<JobStore>()((set) => ({
  Jobs: [],
  JobById: {} as Job,
  loading: false,
  error: null,

  getJobs: async () => {
    set({ loading: true, error: null });
    try {
      const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`);
      set({ Jobs: result.data.Jobs });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch jobs' });
    } finally {
      set({ loading: false });
    }
  },

  getJobById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`);
      set({ JobById: result.data.Job });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch job by ID' });
    } finally {
      set({ loading: false });
    }
  },

  addJob: async (job: Job) => {
    set({ loading: true, error: null });
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`, job);
      const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`);
      set({ Jobs: result.data.Jobs });
    } catch (err: any) {
      set({ error: err.message || 'Failed to add job' });
    } finally {
      set({ loading: false });
    }
  },

  editJob: async (newJob: Job, id: string) => {
    set({ loading: true, error: null });
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`, newJob);
      const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`);
      set({ Jobs: result.data.Jobs });
    } catch (err: any) {
      set({ error: err.message || 'Failed to edit job' });
    } finally {
      set({ loading: false });
    }
  },

  deleteJob: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`);
      const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`);
      set({ Jobs: result.data.Jobs });
    } catch (err: any) {
      set({ error: err.message || 'Failed to delete job' });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useJobsStore;
