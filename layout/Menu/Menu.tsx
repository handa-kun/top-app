import { AppContext } from '../../context/app.context';
import styles from './Menu.module.css';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { firstLevelMenu } from '../../helper/helper';


export const Menu = (): JSX.Element => {
    const { menu, firstCategory, setMenu } = useContext(AppContext);
    const router = useRouter();

    const openSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map(m => {
            if (m._id.secondCategory == secondCategory) {
                m.isOpened = !m.isOpened;
            }
            return m;
        }));
    };

    const buildFirstLelel = () => {
        return (
            <>
                {firstLevelMenu.map(m => (
                    <div key={m.route}>
                        <Link href={`/${m.route}`}>
                            <div className={cn(styles.firstLevel, {
                                [styles.firstLevelActive]: m.id == firstCategory
                            })}>
                                {m.icon}
                                <span>{m.name}</span>
                            </div>
                        </Link>
                        {m.id == firstCategory && buildSecondLelel(m)}
                    </div>
                ))}
            </>
        );
    };

    const buildSecondLelel = (menuItem: FirstLevelMenuItem) => {
        return (
            <div className={styles.secondBlock}>
                {menu.map(m => {
                    if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
                        m.isOpened = !m.isOpened;
                    }

                    return (
                        <div key={m._id.secondCategory}>
                            <div className={styles.secondLevel} onClick={() => openSecondLevel(m._id.secondCategory)}>{m._id.secondCategory}</div>
                            <div className={cn(styles.secondLevelBlock, {
                                [styles.secondLevelBlockOpened]: m.isOpened
                            })}>
                                {buildThirdLelel(m.pages, menuItem.route)}
                            </div>
                        </div>
                    );

                })}
            </div>
        );
    };

    const buildThirdLelel = (pages: PageItem[], route: string) => {
        return (
            pages.map(p => (
                <Link href={`/${route}/${p.alias}`} className={cn(styles.thirdLevel, {
                    [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
                })}>
                    {p.category}
                </Link>
            ))
        );
    };

    return (
        <div className={styles.menu}>
            {buildFirstLelel()}
        </div>
    );
};