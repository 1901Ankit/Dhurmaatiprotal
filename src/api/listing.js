import securedApi from "./config";
export const listingController = {
  getAllProducts: async () => {
    try {
      let result = await securedApi.securedApi.get(`/api/get-all-products`);
      return result;
    } catch (error) {
      throw error;
    }
  },
  getAlllOrder: async () => {
    try {
      let result = await securedApi.securedApi.get(`/api/get-all-orders`);
      return result;
    } catch (error) {
      throw error;
    }
  },
  editproducts: async (data) => {
    try {
      let result = await securedApi.securedApi.put(
        `/api/edit-products-admin`,
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  viewstory: async (data) => {
    try {
      // console.log("NNNNNNNNN", data)
      let result = await securedApi.AllCanFarmSecureApi.post(`/api/get-farms-contact_no`, {
        contact_no: data,
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
};
