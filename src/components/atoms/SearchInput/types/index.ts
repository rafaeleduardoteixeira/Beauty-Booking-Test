import { InputHTMLAttributes } from 'react';

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export interface ISearchInputProps extends SearchInputProps {
  handleSearch: (query: string) => void;
  accentColor?: string;
  initialValue?: string;
}
