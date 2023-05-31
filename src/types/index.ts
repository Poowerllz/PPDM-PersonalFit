export interface IUser {
  id?: string;
  name: string;
}

export interface IStudent {
  id: string;
  name: string;
  weight: string;
  height: string;
  image_url: string;
  created_at: string;
}

export interface ITraining {
  id: string;
  name: string;
  icon: string;
  weekDay: number;
  created_at: string;
  student_id: IStudent["id"];
}

export interface IFinishedDay {
  id: string;
  date: string;
  trainings: ITraining["id"][];
}
