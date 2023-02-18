import { HhData, Htag, Tag } from '../../components';
import { TopLevelCategory } from '../../interfaces/page.interface';
import styles from './TopPageComponent.module.css';
import { TopPageComponentProps } from './TopPageComponent.props';
import CheckIcon from './check.svg';


export const TopPageComponent = ({ page, firstCategory, products }: TopPageComponentProps): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag='h1'>{page.title}</Htag>
                {products.length && <Tag color='grey' size='m'>{products.length}</Tag>}
                <span>Soon</span>
            </div>
            <div>
                {products && products.map(p => (<div key={p._id}>{p.title}</div>))}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag='h2'>Вакансии - {page.category}</Htag>
                <Tag color='red' size='m'>hh.ru</Tag>
            </div>
            {firstCategory == TopLevelCategory.Courses && <HhData {...page.hh} />}
            <div>
                <Htag tag='h2'>Преимущества</Htag>
            </div>
            <div>
                <div>
                    <CheckIcon />
                </div>
                <Htag tag='h3'>Title</Htag>
                {products && products.map(p => (<p key={p._id}>{p.advantages}</p>))}
            </div>
        </div>
    );
};