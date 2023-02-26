import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import styles from './Input.module.css';
import { InputProps } from './Input.props';

export const Input = forwardRef(({ className, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
    return <input ref={ref} className={cn(className, (styles.input))} {...props} />;
});