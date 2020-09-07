import React, { useMemo } from "react";
import { connect } from "react-redux";
import { ReactComponent as HeartSolid } from "../../assets/heart-solid.svg";
import { ReactComponent as HeartRegular } from "../../assets/heart-regular.svg";
import s from "./WishlistButton.module.css";
import {
  addToWishlistAction,
  removeFromWishlistAction,
} from "../../store/actions/wishlistActions";

const WishlistButton = ({
  product,
  addToWishlist,
  removeFromWishlist,
  wishlistProducts,
  className,
  ...rest
}) => {
  const { _id } = product;
  const isInWishlist = useMemo(
    () => localStorage.getItem("_wishlist")?.includes(_id),
    [_id, wishlistProducts]
  );

  const switchWishlist = () => {
    return isInWishlist ? removeFromWishlist(product) : addToWishlist(product);
  };
  return isInWishlist ? (
    <HeartSolid
      onClick={switchWishlist}
      className={`${s.icon} ${className}`}
      {...rest}
    />
  ) : (
    <HeartRegular
      onClick={switchWishlist}
      className={`${s.icon} ${className}`}
      {...rest}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    wishlistProducts: state.wishlist.all,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToWishlist: (product) => dispatch(addToWishlistAction(product)),
    removeFromWishlist: (product) =>
      dispatch(removeFromWishlistAction(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WishlistButton);
