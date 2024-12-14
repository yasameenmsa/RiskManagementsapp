import { forwardRef } from 'react';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ children, className = '', onSubmit, ...props }, ref) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(e);
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={className}
        {...props}
      >
        {children}
      </form>
    );
  }
);

Form.displayName = 'Form';

export default Form;