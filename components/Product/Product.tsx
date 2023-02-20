import cn from 'classnames';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import styles from './Product.module.css';
import { ProductProps } from './Product.props';

export const Product = ({ product, className, ...props }: ProductProps): JSX.Element => {
    return (
        <Card className={styles.product}>
            <div className={styles.logo}><img src={process.env.NEXT_PUBLIC_DOMAIN + product.image} alt={product.title} /></div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>{product.price}</div>
            <div className={styles.credit}>{product.credit}</div>
            <div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating} /></div>
            <div className={styles.tags}>{product.categories.map(c => <Tag key={c} color='ghost'>{c}</Tag>)}</div>
            <div className={styles.priceTitle}>цена</div>
            <div className={styles.creditTitle}>в кредит</div>
            <div className={styles.rateTitle}>отзывов</div>
            <div className={styles.hr}><hr className={styles.hr} /></div>
            <div className={styles.description}>{product.description}</div>
            <div className={styles.feature}>feature</div>
            <div className={styles.advBlock}>
                <div className={styles.advantages}>
                    <div>Advantages</div>
                    <div>{product.advantages}</div>
                </div>
                <div className={styles.disadvantages}>
                    <div>Disadvantages</div>
                    <div>{product.disadvantages}</div>
                </div>
            </div>
            <div className={styles.hr}><hr className={styles.hr} /></div>
            <div className={styles.actions}>
                <Button appearance='primary'>Узнать подробнее</Button>
                <Button appearance='ghost' arrow='right'>Читать отзывов</Button>
            </div>
        </Card>
    );
};