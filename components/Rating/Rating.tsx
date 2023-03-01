import cn from 'classnames';
import StarIcon from './star.svg';
import { ForwardedRef, forwardRef, KeyboardEvent, useEffect, useState } from 'react';
import styles from './Rating.module.css';
import { RatingProps } from './Rating.props';

export const Rating = forwardRef(({ isEditable = false, error, rating, setRating, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

    useEffect(() => {
        constructRating(rating);
    }, [rating],);

    const constructRating = (currentRating: number) => {
        const updateArray = ratingArray.map((r: JSX.Element, i: number) => {
            return (
                <StarIcon
                    className={cn(styles.start, {
                        [styles.filled]: i < currentRating,
                        [styles.editable]: isEditable,
                    })}
                    onMouseEnter={() => changeDisplay(i + 1)}
                    onClick={() => onClick(i + 1)}
                    tabIndex={isEditable ? 0 : -1}
                    onKeyDown={(e: KeyboardEvent<SVGElement>) => isEditable && handleSpace(e, i + 1)}
                />
            );
        });
        setRatingArray(updateArray);
    };

    const changeDisplay = (i: number) => {
        if (!isEditable) {
            return;
        }
        constructRating(i);
    };

    const onClick = (i: number) => {
        if (!isEditable || !setRating) {
            return;
        }
        setRating(i);
    };

    const handleSpace = (e: KeyboardEvent<SVGElement>, i: number) => {
        if (e.code != 'Space' || !setRating) {
            return;
        }
        e.preventDefault();
        setRating(i);
    };

    return (
        <div {...props}
            ref={ref}
            onMouseLeave={() => changeDisplay(rating)}
            className={cn(styles.ratingWrapper, {
                [styles.error]: error
            })}>
            {ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
            {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>
    );
});