export interface iTask{
    description: string;
    done:boolean;
}
export interface iTaskList{
    "To DO":Array<iTask>,
    "In Progress":Array<iTask>,
    "Done":Array<iTask>
}