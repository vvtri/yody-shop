# HTTP STATUS CODE!

<details>
  <summary>Click to expand!</summary>
  
  ## Error
  1. Auth Error
  2. Cart Error
     * **459**: Out of Stock
  3. Purchase Error
     * **489**: Out of Stock 
</details>

# ERROR MESSAGE TEMPLATE

<details>
  <summary>Click to expand!</summary>
  
  ## Error
  1. Auth Error
  2. Cart Error
     1. When add product that is out of stock to cart
        * Error msg: Sản phẩm {tên sản phẩm} chỉ còn {số lượng sản phẩm trong kho} {đơn vị} trong kho!
        * Example: Sản phẩm áo thun 1 chỉ còn 5 cái trong kho!
        * If there is no amount of product ==> Error msg: Sản phẩm áo thun 1 tạm hết hàng!
  3. Purchase Error
     1. When purchase product that is out of stock
        * Error msg: Sản phẩm {tên sản phẩm} chỉ còn {số lượng sản phẩm trong kho} {đơn vị} trong kho!
        * Example: Sản phẩm áo thun 1 chỉ còn 5 cái trong kho!
        * If there is no amount of product ==> Error msg: Sản phẩm áo thun 1 tạm hết hàng!
</details>

### Note:

1. Check purchase service for hydration entity


