import type { InputHTMLAttributes } from 'react';
import { IInputProps } from './types';


export function Input({ label, error, className = '', ...rest }: IInputProps) {
  return (
    <label className="flex flex-col gap-1 text-sm text-slate-600">
      {label ? <span>{label}{rest.required ? <span className="text-red-500">*</span> : null}</span> : null}
      <input
        className={`rounded-md border px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none ${
          error ? 'border-red-400' : 'border-slate-300'
        } ${className}`}
        {...rest}
      />
      {error ? <span className="text-xs text-red-500">{error}</span> : null}
    </label>
  );
}
