import Banner from "@/components/Banner";
import Container from "@/components/Container";
import ProductGrid from "@/components/ProductGrid";
import { getCategories } from "@/services/categories";

export default async function Home() {
  const response = await getCategories();
  console.log('Categories response:', response.data);
  if (response.status !== 'success' || !response.data?.categories) {
    return (
      <Container>
        <div className="text-red-500 text-center py-10">
         Error loading categories.
        </div>
      </Container>
    );
  }

  const categoriesList = response.data;

  return (
    <Container className='flex flex-col gap-20'>
      <Banner />

      <ProductGrid categories={categoriesList.categories} /> 
    </Container>
  );
}