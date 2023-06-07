import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { T } from '../components/ABM/API/APIHandler';
type StateSetter<T> = Dispatch<SetStateAction<T>>;

type ChangeHandler<T> = (
  e: ChangeEvent<HTMLInputElement>,
  variable: T,
  setVariable: StateSetter<T>
) => void;

export const handleChange: ChangeHandler<T | any> = (e, variable, setVariable) => {
  setVariable({
    ...variable,
    [e.target.name]: e.target.value,
  });
};

export const handleImageChange: ChangeHandler<File | null> = (e, state, setState) => {
  if (e.target.files && e.target.files.length > 0) {
    const selectedFile = e.target.files[0];
    setState(selectedFile);
  }
};
