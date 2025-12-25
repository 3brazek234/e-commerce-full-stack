export async function getCategories() {
  const res = await fetch('http://localhost:8000/api/categories', {
    next: { revalidate: 3600 } 
  });

  if (!res.ok) throw new Error('Failed to fetch categories');

  return res.json();
}