import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";

function DetailProduct() {
  const { id } = useParams();
  const { productsAPI, userAPI } = useContext(GlobalState);
  const [products] = productsAPI.products;
  const addCart = userAPI.addCart;
  const [detailProduct, setDetailProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const product = products.find((product) => product._id === id);
      setDetailProduct(product || {});
    }
  }, [id, products]);

  if (!detailProduct) return null;

  return (
    <>
      <div className="detail">
        <img src={detailProduct.images?.url} alt={detailProduct.title} />
        <div className="box-detail">
          <div className="row">
            <h2>{detailProduct.title}</h2>
            <h6>#id: {detailProduct.product_id}</h6>
          </div>
          <span>₹ {detailProduct.price}</span>

          <div className="section-heading">
            <h3>Description</h3>
            <p>{detailProduct.description}</p>
          </div>

          <div className="section-heading">
            <h3>Product Content</h3>
            <p>{detailProduct.content}</p>
          </div>

          <p>Ordered: {detailProduct.sold}</p>
          
          <Link
            to="/cart"
            className="cart"
            onClick={() => addCart(detailProduct)}
          >
            Buy Now
          </Link>
        </div>
      </div>

      <div>
        <h2>Related Products</h2>
        <div className="products">
          {products
            .filter(product => product.category === detailProduct.category)
            .map(product => (
              <ProductItem key={product._id} product={product} />
            ))}
        </div>
      </div>
    </>
  );
}

export default DetailProduct;
