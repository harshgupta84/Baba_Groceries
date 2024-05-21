import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";
import { FaTrash, FaEdit, FaShoppingCart, FaEye } from "react-icons/fa"; // Import icons from react-icons library

function BtnRender({ product, deleteProduct }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;

  return (
    <div className="row_btn">
      {isAdmin ? (
        <>
          <Link
            id="btn_buy"
            to="#!"
            onClick={() => deleteProduct(product._id, product.images.public_id)}
          >
            Delete <FaTrash /> {/* Delete Icon */}
          </Link>
          <Link id="btn_view" to={`/edit_product/${product._id}`}>
            Edit <FaEdit /> {/* Edit Icon */}
          </Link>
        </>
      ) : (
        <>
          <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
            Buy <FaShoppingCart /> {/* Shopping Cart Icon */}
          </Link>
          <Link id="btn_view" to={`/detail/${product._id}`}>
            View <FaEye /> {/* Eye/View Icon */}
          </Link>
        </>
      )}
    </div>
  );
}

export default BtnRender;
