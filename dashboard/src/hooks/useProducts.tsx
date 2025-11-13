import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/services/products";

const useProducts = () => {
  const getAllProducts = () => {
    const { data } = useQuery({
      queryKey: ["products"],
      queryFn: () => productsService().getAllProducts(),
    });
    return data;
  };

  const addProduct = (product: any) => {
    const { data } = useQuery({
      queryKey: ["products"],
      queryFn: () => productsService().addProduct(product),
    });
    return data;
  };

  const updateProduct = (product: any) => {
    const { data } = useQuery({
      queryKey: ["products"],
      queryFn: () => productsService().updateProduct(product),
    });
    return data;
  };

  const deleteProduct = (id: string) => {
    const { data } = useQuery({
      queryKey: ["products"],
      queryFn: () => productsService().deleteProduct(id),
    });
    return data;
  };

  return {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProducts;
