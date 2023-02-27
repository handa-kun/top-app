import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import styles from './Textarea.module.css';
import { TextareaProps } from './Textarea.props';

export const Textarea = forwardRef(({ error, className, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
    return (
        <div className={cn(className, styles.textareaWrapper)}>
            <textarea ref={ref} className={cn(styles.textarea, {
                [styles.error]: error
            })} {...props} />
            {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>
    );
});