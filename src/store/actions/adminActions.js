import {
  createCategory,
  fetchUsers,
  createVendor,
  fetchVendors,
  fetchAttributes,
  deleteAttribute,
  deleteCategory,
  createAttribute,
  patchAttribute,
  createNews,
  uploadImageToNews,
  deleteNews,
  deleteVendor,
  deleteUser,
  patchVendor,
  fetchUserData,
  fetchUserById,
  postProduct,
  postProductGallery,
  deleteProduct,
  patchNews,
  patchProduct,
  fetchOrders,
  fetchSingleProduct,
  deleteOrder,
  fetchExactProducts,
} from "../api/api";
import { getToken, getAdminToken } from "../../utils/utils";
import {
  SET_USERS,
  RESET_FILTERED_USERS,
  SET_FILTERED_USERS,
  ADD_CATEGORY,
  SET_ATTRIBUTES,
  DELETE_ATTRIBUTE,
  DELETE_CATEGORY,
  ADD_ATTRIBUTE,
  DELETE_NEWS,
  SET_VENDORS,
  DELETE_USER,
  SET_LOADING,
  ADD_PRODUCT,
  SET_ORDERS,
  DELETE_PRODUCT,
  SET_ORDERS_PRODUCTS,
} from "./actionTypes";

export const createCategoryAction = (category) => {
  return async (dispatch) => {
    const token = getAdminToken();
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await createCategory(
      { ...category, desc: "", gallery: [""] },
      token
    );
    dispatch({ type: SET_LOADING, isLoading: false });
    if (response.status === 200) {
      dispatch({ type: ADD_CATEGORY, category: response.data });
    }
    return response.status === 200;
  };
};

export const deleteCategoryAction = (id) => {
  return async (dispatch) => {
    const token = getAdminToken();
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await deleteCategory(id, token);
    dispatch({ type: SET_LOADING, isLoading: false });
    if (response.status === 200) {
      dispatch({ type: DELETE_CATEGORY, id });
    }
    return response.status === 200;
  };
};

export const createNewsAction = (body, gallery) => {
  return async (dispatch) => {
    const token = getAdminToken();
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await createNews(body, token);
    dispatch({ type: SET_LOADING, isLoading: false });
    if (!gallery || !response?.data) {
      return false;
    }
    if (response.status === 200) {
      const imageResponse = await uploadImageToNews(
        gallery,
        response.data,
        token
      );

      return true;
    }
  };
};

export const deleteNewsAction = (id) => {
  return async (dispatch) => {
    const token = getAdminToken();
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await deleteNews(id, token);
    dispatch({ type: SET_LOADING, isLoading: false });
    if (response.status === 200) {
      dispatch({
        type: DELETE_NEWS,
        id,
      });
    }
    return response.status === 200;
  };
};

export const editNewsAction = (news, id, imageFormData) => {
  return async (dispatch) => {
    const token = getAdminToken();
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await patchNews(news, id, token);
    if (response.status === 200) {
      const imageResponse = await uploadImageToNews(
        imageFormData,
        response.data,
        token
      );
    }
    dispatch({ type: SET_LOADING, isLoading: false });
    return response.status === 200;
  };
};

export const createVendorAction = (vendor) => {
  return async (dispatch) => {
    const token = getAdminToken();
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await createVendor(vendor, token);
    dispatch({ type: SET_LOADING, isLoading: false });
    return response.status === 200;
  };
};

export const deleteVendorAction = (vendor) => {
  return async (dispatch) => {
    const token = getAdminToken();
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await deleteVendor(vendor._id, token);
    dispatch({ type: SET_LOADING, isLoading: false });
    return response.status === 200;
  };
};

export const editVendorAction = (vendor) => {
  return async (dispatch) => {
    const token = getAdminToken();
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await patchVendor(vendor, vendor._id, token);
    dispatch({ type: SET_LOADING, isLoading: false });
    return response.status === 200;
  };
};

export const getAttributesAction = () => {
  return async (dispatch) => {
    const token = getAdminToken();
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await fetchAttributes(token);
    dispatch({ type: SET_LOADING, isLoading: false });
    if (response.status === 200) {
      dispatch({
        type: SET_ATTRIBUTES,
        attributes: response.data,
      });
    }
    return response.status === 200;
  };
};

export const deleteAttributeAction = (id) => {
  return async (dispatch) => {
    const token = getAdminToken();
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await deleteAttribute(id, token);
    dispatch({ type: SET_LOADING, isLoading: false });
    if (response.status === 200) {
      dispatch({
        type: DELETE_ATTRIBUTE,
        id,
      });
    }
    return response.status === 200;
  };
};

export const createAttributeAction = (attribute) => {
  return async (dispatch) => {
    const token = getAdminToken();
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await createAttribute(attribute, token);
    dispatch({ type: SET_LOADING, isLoading: false });
    if (response.status === 200) {
      dispatch({
        type: ADD_ATTRIBUTE,
        attribute: response.data,
      });
    }
    return response.status === 200;
  };
};

export const editAttributeAction = (attribute) => {
  return async (dispatch) => {
    const token = getAdminToken();
    dispatch({ type: SET_LOADING, isLoading: true });

    const response = await patchAttribute(attribute, token);
    dispatch({ type: SET_LOADING, isLoading: false });
    return response.status === 200;
  };
};

export const getUsersAction = () => {
  return async (dispatch) => {
    const token = getAdminToken();
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await fetchUsers(token);
    dispatch({ type: SET_LOADING, isLoading: false });
    if (response.status === 200) {
      dispatch({
        type: SET_USERS,
        users: response.data,
      });
    }
  };
};

export const deleteUserAction = (id) => {
  return async (dispatch) => {
    const token = getAdminToken();
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await deleteUser(id, token);
    dispatch({ type: SET_LOADING, isLoading: false });

    if (response.status === 200) {
      dispatch({
        type: DELETE_USER,
        id,
      });
    }
  };
};

export const getVendorsAction = () => {
  return async (dispatch) => {
    const token = getAdminToken();
    const response = await fetchVendors(token);
    if (response.status === 200) {
      dispatch({
        type: SET_VENDORS,
        vendors: response.data,
      });
    }
  };
};

export const filterUsersAction = (searchValue, users) => {
  if (!searchValue) {
    return {
      type: RESET_FILTERED_USERS,
    };
  }
  const filteredUsers = users.filter(
    ({ fName = "", lName = "", phone = "" }) => {
      return (
        fName.toLowerCase().startsWith(searchValue) ||
        lName.toLowerCase().startsWith(searchValue) ||
        `${phone}`.toLowerCase().startsWith(searchValue)
      );
    }
  );
  return {
    type: SET_FILTERED_USERS,
    users: filteredUsers,
  };
};

export const createProductAction = (product, gallery, thumbnail) => {
  return async (dispatch) => {
    const token = getAdminToken();
    dispatch({ type: SET_LOADING, isLoading: true });
    const productRes = await postProduct(product, token);
    if (productRes?.data) {
      let productGallery = productRes.gallery;
      if (gallery) {
        const galleryResponse = await postProductGallery(
          gallery,
          productRes.data._id,
          token
        );
        if (galleryResponse?.data) {
          productGallery = galleryResponse.data;
        }
      }
      if (thumbnail) {
        const thumbnailResponse = await postProductGallery(
          thumbnail,
          productRes.data._id,
          token,
          true
        );
      }
      dispatch({
        type: ADD_PRODUCT,
        product: { ...productRes.data, gallery: productGallery },
      });
    }
    dispatch({ type: SET_LOADING, isLoading: false });
    return productRes.status === 200;
  };
};

export const editProductAction = (product, gallery, id) => {
  return async (dispatch) => {
    const token = getAdminToken();
    dispatch({ type: SET_LOADING, isLoading: true });
    const productRes = await patchProduct(product, id, token);

    if (productRes.status === 200) {
      let productGallery = productRes.gallery;
      if (gallery) {
        const galleryResponse = await postProductGallery(
          gallery,
          productRes.data._id,
          token
        );
        if (galleryResponse?.data) {
          productGallery = galleryResponse.data;
        }
        dispatch({
          type: ADD_PRODUCT,
          product: { ...productRes.data, gallery: productGallery },
        });
        dispatch({ type: SET_LOADING, isLoading: false });
        return galleryResponse.status === 200;
      }
    }
    dispatch({
      type: ADD_PRODUCT,
      product: { ...productRes.data, gallery: [] },
    });
    dispatch({ type: SET_LOADING, isLoading: false });
    return productRes.status === 200;
  };
};

export const deleteProductAction = (id) => {
  return async (dispatch) => {
    const token = getAdminToken();
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await deleteProduct(id, token);
    dispatch({ type: SET_LOADING, isLoading: false });
    if (response.status === 200) {
      dispatch({ type: DELETE_PRODUCT, id: response.data._id });
    }
  };
};

export const getOrdersAction = () => {
  return async (dispatch) => {
    const token = getAdminToken();
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await fetchOrders(token);
    dispatch({ type: SET_LOADING, isLoading: false });
    if (response.status === 200) {
      dispatch({ type: SET_ORDERS, orders: response.data });
    }
  };
};

export const getOrderProductsAction = (order) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, isLoading: true });
    const productsIds = order.products.map(({ id }) => id).join(",");

    const products = await fetchExactProducts(productsIds);
    dispatch({ type: SET_LOADING, isLoading: false });
    dispatch({ type: SET_ORDERS_PRODUCTS, products, orderId: order._id });
  };
};

export const deleteOrderAction = (id) => {
  return async (dispatch) => {
    const token = getAdminToken();
    dispatch({ type: SET_LOADING, isLoading: true });
    const response = await deleteOrder(token);
    dispatch({ type: SET_LOADING, isLoading: false });
    return response.status === 200;
  };
};
