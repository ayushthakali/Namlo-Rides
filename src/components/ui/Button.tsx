import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  loading?: boolean;
  full?:    boolean;
}

const variants = {
  primary:   'bg-sky-600 hover:bg-sky-700 text-white',
  secondary: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300',
  danger:    'bg-red-500 hover:bg-red-600 text-white',
  ghost:     'hover:bg-slate-100 text-slate-600',
};

export const Button: React.FC<Props> = ({
  variant = 'primary', loading, full, disabled, children, className = '', ...rest
}) => (
  <button
    disabled={disabled || loading}
    className={[
      'inline-flex items-center justify-center gap-2 px-4 py-2',
      'text-sm font-medium rounded-lg transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      variants[variant],
      full ? 'w-full' : '',
      className,
    ].join(' ')}
    {...rest}
  >
    {loading && (
      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/>
        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75"/>
      </svg>
    )}
    {children}
  </button>
);