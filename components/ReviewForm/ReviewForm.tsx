import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewFormResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helper/api';
import { useState } from 'react';


export const ReviewForm = ({ productId, isOpened, className, ...props }: ReviewFormProps): JSX.Element => {
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const { data } = await axios.post<IReviewFormResponse>(API.review.createDemo, { ...formData, productId });
            if (data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setError('Something is wrong');
            }
        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(className, styles.reviewForm)}
                {...props}
            >
                <Input
                    {...register('name', { required: { value: true, message: 'Заполните имя' } })}
                    placeholder='Имя'
                    error={errors.name}
                    tabIndex={isOpened ? 0 : -1}
                />
                <Input
                    {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
                    placeholder='Заголовок отзыва'
                    error={errors.title}
                    className={styles.title}
                    tabIndex={isOpened ? 0 : -1}
                />
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller
                        control={control}
                        name='rating'
                        rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
                        render={({ field, fieldState }) => (
                            <Rating isEditable rating={field.value} ref={field.ref} setRating={field.onChange} error={fieldState.error} />
                        )}
                    />
                </div>
                <Textarea
                    {...register('description', { required: { value: true, message: 'Заполните описание' } })}
                    placeholder='Текст отзыва'
                    error={errors.description}
                    className={styles.description}
                    tabIndex={isOpened ? 0 : -1}
                />
                <div className={styles.submit}>
                    <Button appearance='primary' tabIndex={isOpened ? 0 : -1}>Отправить</Button>
                    <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            {isSuccess && <div className={cn(styles.success, styles.panel)}>
                <div className={styles.successTitle}>Ваш отзыв отправлен</div>
                <div>Спасибо, Ваш отзыв будет опубликован после проверки.</div>
                <CloseIcon className={styles.close} onClick={() => setIsSuccess(false)} />
            </div>}
            {error && <div className={cn(styles.error, styles.panel)}>
                Что-то пошло не так, попробуйте обновить страницу.
                <CloseIcon className={styles.close} onClick={() => setError(undefined)} />
            </div>}
        </form>
    );
};