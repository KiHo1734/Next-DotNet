    export interface Job {
        _id: string,
        title: string,
        type: string,
        detail: string,
        purpose: string
    }

    export interface ListJobProps {
        Jobs: Job[] | undefined
    }
    export interface JobStore {
        Jobs: Job[]
        JobById: Job
        loading: boolean
        error: string | null
        getJobs: () => Promise<void>
        getJobById: (id: string) => Promise<void>
        addJob: (Job: Job) => Promise<void>
        editJob: (newJob: Job, id: string) => Promise<void>
        deleteJob: (id: string) => Promise<void>
    }
    

    export interface JobForm {
        register : Job,
        value : string
    }
