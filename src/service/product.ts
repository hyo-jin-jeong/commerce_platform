import { ForbiddenException, NotFoundException } from '../util/exception';

import { MarketRepository } from '../model/market';
import { ProductRepository } from '../model/product';

export class ProductService {
  private productRepository;
  private marketRepository;

  constructor(
    productRepository: ProductRepository,
    marketRepository: MarketRepository
  ) {
    this.productRepository = productRepository;
    this.marketRepository = marketRepository;
  }
  productAccessPermissionCheck = async (id: string, userId: string) => {
    const product = await this.productRepository.getProductById(id);
    console.log(product?.userId, userId);
    if (!product) {
      throw new NotFoundException();
    }
    if (product.userId !== userId) {
      throw new ForbiddenException();
    }
    return product;
  };

  createProduct = async (userId: string, data: object) => {
    const market = await this.marketRepository.getMarketByUserId(userId);
    if (!market) {
      throw new ForbiddenException();
    }
    await this.productRepository.createProduct(
      userId,
      String(market._id),
      data
    );
  };

  updateProduct = async (id: string, userId: string, data: object) => {
    await this.productAccessPermissionCheck(id, userId);
    await this.productRepository.updateProduct(id, data);
  };

  deleteProduct = async (id: string, userId: string) => {
    await this.productAccessPermissionCheck(id, userId);
    await this.productRepository.deleteProduct(id);
  };

  getProduct = async (id: string) => {
    return await this.productRepository.getProductById(id);
  };

  getProducts = async (
    search: string | undefined,
    category: string | undefined,
    nation: string | undefined,
    sort: string | undefined
  ) => {
    return await this.productRepository.getProducts(
      search,
      category,
      nation,
      sort
    );
  };
}
