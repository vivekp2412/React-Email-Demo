



//Button Component Props Interface
export interface ButtonProps {
  title: string;
  onClickHandler?: () => void;
}
//Input Component Props Interface
export interface InputPropsType {
  type: string;
  value?: string | number | boolean;
  onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  labelText: string;
  labelFor: string;
  isRequired?: boolean;
}

export interface  Template{
  name:string,
  id:string,
  content:string,
  variables:string[]
  
}