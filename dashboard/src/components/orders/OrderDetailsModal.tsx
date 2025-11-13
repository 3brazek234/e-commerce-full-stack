import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Order } from '@/data/dummyData';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface OrderDetailsModalProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusColors = {
  pending: 'bg-warning/10 text-warning hover:bg-warning/20',
  processing: 'bg-chart-1/10 text-chart-1 hover:bg-chart-1/20',
  shipped: 'bg-chart-2/10 text-chart-2 hover:bg-chart-2/20',
  delivered: 'bg-success/10 text-success hover:bg-success/20',
  canceled: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
};

export function OrderDetailsModal({ order, open, onOpenChange }: OrderDetailsModalProps) {
  const { toast } = useToast();

  if (!order) return null;

  const handleStatusChange = (newStatus: string) => {
    toast({
      title: 'Status Updated',
      description: `Order status changed to ${newStatus}`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details - {order.id}</DialogTitle>
          <DialogDescription>
            Order placed on {new Date(order.orderDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Section */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Order Status</p>
              <Badge className={cn('mt-1', statusColors[order.status])}>
                {order.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Status</p>
              <Badge className={cn('mt-1', 
                order.paymentStatus === 'paid' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
              )}>
                {order.paymentStatus}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Customer Info */}
          <div>
            <h3 className="font-semibold mb-3">Customer Information</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-muted-foreground">Name:</span> {order.customerName}</p>
              <p><span className="text-muted-foreground">Email:</span> {order.customerEmail}</p>
            </div>
          </div>

          <Separator />

          {/* Shipping Address */}
          <div>
            <h3 className="font-semibold mb-3">Shipping Address</h3>
            <div className="text-sm">
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          <Separator />

          {/* Order Items */}
          <div>
            <h3 className="font-semibold mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-start p-3 bg-muted rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Total */}
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total Amount</span>
            <span>${order.total.toFixed(2)}</span>
          </div>

          {/* Actions */}
          {order.status !== 'delivered' && order.status !== 'canceled' && (
            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={() => handleStatusChange('shipped')}
                disabled={order.status === 'shipped'}
              >
                Mark as Shipped
              </Button>
              <Button
                className="flex-1"
                variant="outline"
                onClick={() => handleStatusChange('delivered')}
                disabled={order.status !== 'shipped'}
              >
                Mark as Delivered
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
