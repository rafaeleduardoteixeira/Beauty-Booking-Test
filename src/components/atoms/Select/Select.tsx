'use client';

import { ISelectProps } from './types';

export const Select = ({
  options,
  label,
  placeholder = 'Select...',
  loading = false,
  disabled,
  ...rest
}: ISelectProps) => {
  const selectDisabled = disabled || loading;

  return (
    <label className="flex w-full flex-col gap-1 text-sm text-slate-600">
      {label ? <span>{label}{rest.required ? <span className="text-red-500">*</span> : null}</span> : null}
      <select
        className={`w-full rounded-md border border-slate-300 px-3 py-2 text-slate-500 disabled:cursor-not-allowed disabled:bg-slate-100 `}
        disabled={selectDisabled}
        {...rest}
      >
        {loading ? (
          <option>{`Loading ${label ?? ''}`.trim()}</option>
        ) : (
          <>
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </>
        )}
      </select>
    </label>
  );
}
