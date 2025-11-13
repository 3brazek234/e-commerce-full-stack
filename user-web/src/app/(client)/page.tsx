import Banner from "@/components/Banner";
import Container from "@/components/Container";
import ProductGrid from "@/components/ProductGrid";

export default async function Home() {
  return (
    <Container className='flex flex-col gap-20'>
      <Banner />
      <ProductGrid />
    </Container>
  );
}
