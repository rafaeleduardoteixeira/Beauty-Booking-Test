import { ISpinnerProps } from './types';

export const Spinner = ({ label = 'Loading...', color = '#7f7f7f' }: ISpinnerProps) => {
  return (
    <div
      className={`inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      style={{ color: color }}
      role="status"
      aria-live="polite"
    >
      <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
        {label}
      </span>
    </div>
  );
}
