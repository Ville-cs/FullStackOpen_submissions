export interface HeaderProps {
  courseName: string;
}

export interface TotalProps {
  total: number;
}

export interface CoursePart {
  name: string;
  exerciseCount: number;
}

export interface ContentProps {
  courseParts: CoursePart[];
}
