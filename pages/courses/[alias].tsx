import { GetStaticPropsContext, GetStaticProps, GetStaticPaths } from 'next';
import { withLayout } from '../../layout/Layout';
import axios from 'axios';
import { TopPageModel } from '../../interfaces/page.interface';
import { MenuItem } from '../../interfaces/menu.interfaces';
import { ParsedUrlQuery } from 'querystring';
import { ProductModel } from '../../interfaces/products.interfaces';
const firstCategory = 0;


function Cource({ menu, page, products }: CourceProps): JSX.Element {

    return (
        <>
            {products && products.length}
        </>
    );
}

export default withLayout(Cource);

export const getStaticPaths: GetStaticPaths = async () => {
    const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory
    });
    return {
        paths: menu.flatMap(m => m.pages.map(p => '/courses/' + p.alias)),
        fallback: true
    };
};

export const getStaticProps: GetStaticProps<CourceProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return {
            notFound: true
        };
    }
    const { data: page } = await axios.get<TopPageModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias);
    const { data: products } = await axios.post<ProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/products/find', {
        category: page.category,
        limit: 10
    });

    return {
        props: {
            menu,
            firstCategory,
            page,
            products
        }
    };
};

interface CourceProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
    page: TopPageModel[];
    products: ProductModel[];
}