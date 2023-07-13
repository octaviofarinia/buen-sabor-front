import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Base } from '../API/BaseAPIInterface';
type StateSetter<T> = Dispatch<SetStateAction<T>>;

type BaseChangeHandler<T> = (
  variable: T,
  setVariable: StateSetter<T>
) => void;

type SelectChangeHandler<T> = (
  e: ChangeEvent<HTMLSelectElement>,
  variable: T,
  setVariable: StateSetter<T>
) => void | BaseChangeHandler<T>;

type InputChangeHandler<T> = (
  e: ChangeEvent<HTMLInputElement>,
  variable: T,
  setVariable: StateSetter<T>
) => void | BaseChangeHandler<T>;



export const handleChange: InputChangeHandler<Base | any> = (e, variable, setVariable) => {
  setVariable({
    ...variable,
    [e.target.name]: e.target.value,
  });
};
export const simpleHandleChange: InputChangeHandler<Base | any> = (e, variable, setVariable) => {
  setVariable(e.target.value);
};


export const handleImageChange: InputChangeHandler<File | null> = (e, state, setState) => {
  if (e.target.files && e.target.files.length > 0) {
    const selectedFile = e.target.files[0];
    setState(selectedFile);
  }
};

export const handleCheckboxChange: InputChangeHandler<Base | any> = (e, variable, setVariable) => {
  setVariable({
    ...variable,
    [e.target.name]: e.target.checked,
  });
};

export const handleSelectChange: SelectChangeHandler<Base | any> = (e, variable, setVariable) => {
  setVariable({
    ...variable,
    [e.target.name]: e.target.value,
  });

};
