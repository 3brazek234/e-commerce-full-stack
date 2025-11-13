import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { RecentOrders } from '@/components/dashboard/RecentOrders';
import { TopProducts } from '@/components/dashboard/TopProducts';
import { orders, customers } from '@/data/dummyData';

export default function Dashboard() {
  const totalSales = orders
    .filter(o => o.paymentStatus === 'paid')
    .reduce((sum, order) => sum + order.total, 0);
  
  const totalOrders = orders.length;
  const newCustomers = customers.filter(c => {
    const regDate = new Date(c.registrationDate);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return regDate > thirtyDaysAgo;
  }).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your store overview.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Sales"
          value={`$${totalSales.toFixed(2)}`}
          change="+12% vs. last month"
          changeType="positive"
          icon={DollarSign}
          iconBgColor="bg-success"
        />
        <MetricCard
          title="Total Orders"
          value={totalOrders.toString()}
          change="+8% vs. last month"
          changeType="positive"
          icon={ShoppingCart}
          iconBgColor="bg-chart-1"
        />
        <MetricCard
          title="New Customers"
          value={newCustomers.toString()}
          change="+5% vs. last month"
          changeType="positive"
          icon={Users}
          iconBgColor="bg-chart-4"
        />
        <MetricCard
          title="Revenue Growth"
          value="+12%"
          change="vs. last month"
          changeType="positive"
          icon={TrendingUp}
          iconBgColor="bg-chart-3"
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <RecentOrders />
        <TopProducts />
      </div>
    </div>
  );
}
