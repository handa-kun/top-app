import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import styles from './Textarea.module.css';
import { TextareaProps } from './Textarea.props';

export const Textarea = forwardRef(({ className, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
    return <textarea ref={ref} className={cn(className, (styles.textarea))} {...props} />;
});