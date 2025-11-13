import categoryService from "@/services/category";
import { useQuery } from "@tanstack/react-query";

const useCategory = () => {
  const getAllCategories = () => {
    const { data } = useQuery({
      queryKey: ["categories"],
      queryFn: () => categoryService().getAllCategories(),
    });
    return data;
  };

  const addCategory = (category: any) => {
    const { data } = useQuery({
      queryKey: ["categories"],
      queryFn: () => categoryService().addCategory(category),
    });
    return data;
  };

  const updateCategory = (category: any) => {
    const { data } = useQuery({
      queryKey: ["categories"],
      queryFn: () => categoryService().updateCategory(category),
    });
    return data;
  };

  const deleteCategory = (id: string) => {
    const { data } = useQuery({
      queryKey: ["categories"],
      queryFn: () => categoryService().deleteCategory(id),
    });
    return data;
  };

  return {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};

export default useCategory;
