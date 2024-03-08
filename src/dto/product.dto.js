export default class ProductDTO {
    constructor(product) {
        this.title = product.title;
        this.description = product.description;
        this.price = product.price;
        this.thumbnail = product.thumbnail;
        this.code = product.code;
        this.stock = product.stock;
    }
}
