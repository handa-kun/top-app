import { TopLevelCategory, TopPageModel } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/products.interface';

export interface TopPageComponentProps {
    firstCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModel[];
}