import { AppContext } from '../../context/app.context';
import styles from './Menu.module.css';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { firstLevelMenu } from '../../helper/helper';
import { motion } from 'framer-motion';

export const Menu = (): JSX.Element => {
    const { menu, firstCategory, setMenu } = useContext(AppContext);
    const router = useRouter();

    const variants = {
        visible: {
            marginBottom: 20,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        },
        hidden: { marginBottom: 0 }
    };

    const variantsChildren = {
        visible: {
            opacity: 1,
            height: 29,
        },
        hidden: { opacity: 0, height: 0 }
    };

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
                            <motion.div
                                layout
                                variants={variants}
                                initial={m.isOpened ? 'visible' : 'hidden'}
                                animate={m.isOpened ? 'visible' : 'hidden'}
                                className={cn(styles.secondLevelBlock)}
                            >
                                {buildThirdLelel(m.pages, menuItem.route)}
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const buildThirdLelel = (pages: PageItem[], route: string) => {
        return (
            pages.map(p => (
                <motion.div key={p._id} variants={variantsChildren}>
                    <Link href={`/${route}/${p.alias}`} className={cn(styles.thirdLevel, {
                        [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
                    })}>
                        {p.category}
                    </Link>
                </motion.div>
            ))
        );
    };
    return (
        <div className={styles.menu}>
            {buildFirstLelel()}
        </div>
    );
};