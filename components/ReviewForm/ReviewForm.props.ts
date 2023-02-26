import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ReviewFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    product: string;
}