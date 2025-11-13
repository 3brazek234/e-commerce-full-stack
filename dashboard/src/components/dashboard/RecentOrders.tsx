import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { orders } from '@/data/dummyData';
import { cn } from '@/lib/utils';

const statusColors = {
  pending: 'bg-warning/10 text-warning hover:bg-warning/20',
  processing: 'bg-chart-1/10 text-chart-1 hover:bg-chart-1/20',
  shipped: 'bg-chart-2/10 text-chart-2 hover:bg-chart-2/20',
  delivered: 'bg-success/10 text-success hover:bg-success/20',
  canceled: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
};

export function RecentOrders() {
  const recentOrders = orders.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="space-y-1">
                <p className="font-medium">{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.customerName}</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge className={cn(statusColors[order.status])}>
                  {order.status}
                </Badge>
                <p className="font-semibold">${order.total.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
