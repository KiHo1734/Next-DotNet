import { IJob } from '@/types/job';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const createJob = (job: Omit<IJob, '_id'>) =>
  api.post<IJob>('/api/Jobs', job).then(res => res.data);

export const getJobById = (id: string) =>
  api.get<IJob>(`/api/Jobs/${id}`).then(res => res.data);

export const getJobs = () =>
  api.get<IJob[]>('/api/Jobs').then(res => res.data);

export const updateJob = (id: string, job: Partial<IJob>) =>
  api.put<IJob>(`/api/Jobs/${id}`, job).then(res => res.data);

export const deleteJob = (id: string) =>
  api.delete(`/api/Jobs/${id}`).then(res => res.data);
