import api from "@/lib/axiosInstance";

export const productsService = () => {
  const getAllProducts = async () => {
    const data = await api.get("/products");
    return data;
  };
  const uploadImage = async (image: any) => {
    const data = await api.post("/upload-image", image);
    return data;
  };
  const addProduct = async (product: any) => {
    const data = await api.post("/products", product);
    return data;
  };

  const updateProduct = async (product: any) => {
    const data = await api.put("/products", product);
    return data;
  };

  const deleteProduct = async (id: string) => {
    const data = await api.delete("/products", { data: { id } });
    return data;
  };

  return {
    getAllProducts,
    uploadImage,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
