import api from "@/lib/axiosInstance";

const categoryService = () => {
    const getAllCategories = async () => {
        const data = await api.get("/categories");
        return data;
    };

    const addCategory = async (category: any) => {
        const data = await api.post("/categories", category);
        return data;
    };

    const updateCategory = async (category: any) => {
        const data = await api.put("/categories", category);
        return data;
    };

    const deleteCategory = async (id: string) => {
        const data = await api.delete("/categories", { data: { id } });
        return data;    
    };

    return {
        getAllCategories,
        addCategory,
        updateCategory,
        deleteCategory,
    };
};

export default categoryService;