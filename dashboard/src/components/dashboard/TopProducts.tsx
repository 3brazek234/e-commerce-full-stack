import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { products } from '@/data/dummyData';
import { Package } from 'lucide-react';

export function TopProducts() {
  const topProducts = products
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.sales} sales</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${product.price}</p>
                <p className="text-xs text-muted-foreground">#{index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
