import { IButtonProps } from './types';

export const Button = ({ accentColor, className = '', style, children, ...rest }: IButtonProps) => {
  return (
    <button
      className={`${rest.disabled ? 'cursor-not-allowed opacity-50' : 'hover:opacity-90'} inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold text-white shadow transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
      style={{ backgroundColor: accentColor, ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}
