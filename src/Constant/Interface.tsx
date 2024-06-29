import { ChangeEvent } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  handleSearch?: (val: string) => void;
  handleChangeEvent?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
  externalValue?: string;
  className?: string;
  
}

export interface Song {
  id: number;
  sort?: null;
  user_created?: string;
  user_updated?: string;
  date_updated?: string;
  name?: string;
  artist?: string;
  accent?: string;
  cover?: string;
  top_track?: boolean;
  url?: string; 
  date_created?: string;
}