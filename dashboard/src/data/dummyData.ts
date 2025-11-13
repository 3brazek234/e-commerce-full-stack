// Dummy data for the e-commerce admin dashboard

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  status: 'in-stock' | 'out-of-stock';
  image: string;
  sales: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled';
  items: OrderItem[];
  total: number;
  shippingAddress: Address;
  paymentStatus: 'paid' | 'pending' | 'failed';
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  registrationDate: string;
  avatar?: string;
}

export const products: Product[] = [
  {
    id: 'P001',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-canceling headphones with 30-hour battery life',
    category: 'Electronics',
    price: 149.99,
    stock: 45,
    status: 'in-stock',
    image: '/placeholder.svg',
    sales: 234
  },
  {
    id: 'P002',
    name: 'Smart Fitness Watch',
    description: 'Track your health and fitness with this advanced smartwatch',
    category: 'Electronics',
    price: 299.99,
    stock: 0,
    status: 'out-of-stock',
    image: '/placeholder.svg',
    sales: 189
  },
  {
    id: 'P003',
    name: 'Premium Yoga Mat',
    description: 'Eco-friendly, non-slip yoga mat with carry strap',
    category: 'Sports',
    price: 39.99,
    stock: 120,
    status: 'in-stock',
    image: '/placeholder.svg',
    sales: 456
  },
  {
    id: 'P004',
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated water bottle keeps drinks cold for 24 hours',
    category: 'Sports',
    price: 24.99,
    stock: 78,
    status: 'in-stock',
    image: '/placeholder.svg',
    sales: 567
  },
  {
    id: 'P005',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable, breathable t-shirt made from organic cotton',
    category: 'Clothing',
    price: 29.99,
    stock: 200,
    status: 'in-stock',
    image: '/placeholder.svg',
    sales: 823
  },
  {
    id: 'P006',
    name: 'Running Shoes Pro',
    description: 'Lightweight running shoes with advanced cushioning',
    category: 'Sports',
    price: 129.99,
    stock: 32,
    status: 'in-stock',
    image: '/placeholder.svg',
    sales: 345
  },
  {
    id: 'P007',
    name: 'Laptop Backpack',
    description: 'Spacious backpack with padded laptop compartment',
    category: 'Accessories',
    price: 59.99,
    stock: 5,
    status: 'in-stock',
    image: '/placeholder.svg',
    sales: 234
  },
  {
    id: 'P008',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking',
    category: 'Electronics',
    price: 34.99,
    stock: 150,
    status: 'in-stock',
    image: '/placeholder.svg',
    sales: 678
  },
  {
    id: 'P009',
    name: 'Coffee Maker Deluxe',
    description: 'Programmable coffee maker with thermal carafe',
    category: 'Home',
    price: 89.99,
    stock: 0,
    status: 'out-of-stock',
    image: '/placeholder.svg',
    sales: 123
  },
  {
    id: 'P010',
    name: 'Desk Lamp LED',
    description: 'Adjustable LED desk lamp with USB charging port',
    category: 'Home',
    price: 44.99,
    stock: 67,
    status: 'in-stock',
    image: '/placeholder.svg',
    sales: 289
  }
];

export const orders: Order[] = [
  {
    id: 'ORD001',
    customerId: 'C001',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    orderDate: '2024-01-15',
    status: 'delivered',
    items: [
      { productId: 'P001', productName: 'Wireless Bluetooth Headphones', quantity: 1, price: 149.99 },
      { productId: 'P008', productName: 'Wireless Mouse', quantity: 2, price: 34.99 }
    ],
    total: 219.97,
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    paymentStatus: 'paid'
  },
  {
    id: 'ORD002',
    customerId: 'C002',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@email.com',
    orderDate: '2024-01-16',
    status: 'shipped',
    items: [
      { productId: 'P003', productName: 'Premium Yoga Mat', quantity: 1, price: 39.99 },
      { productId: 'P004', productName: 'Stainless Steel Water Bottle', quantity: 1, price: 24.99 }
    ],
    total: 64.98,
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA'
    },
    paymentStatus: 'paid'
  },
  {
    id: 'ORD003',
    customerId: 'C003',
    customerName: 'Michael Brown',
    customerEmail: 'mbrown@email.com',
    orderDate: '2024-01-17',
    status: 'processing',
    items: [
      { productId: 'P005', productName: 'Organic Cotton T-Shirt', quantity: 3, price: 29.99 }
    ],
    total: 89.97,
    shippingAddress: {
      street: '789 Pine Rd',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    },
    paymentStatus: 'paid'
  },
  {
    id: 'ORD004',
    customerId: 'C004',
    customerName: 'Emily Davis',
    customerEmail: 'emily.d@email.com',
    orderDate: '2024-01-18',
    status: 'pending',
    items: [
      { productId: 'P006', productName: 'Running Shoes Pro', quantity: 1, price: 129.99 },
      { productId: 'P007', productName: 'Laptop Backpack', quantity: 1, price: 59.99 }
    ],
    total: 189.98,
    shippingAddress: {
      street: '321 Elm St',
      city: 'Houston',
      state: 'TX',
      zipCode: '77001',
      country: 'USA'
    },
    paymentStatus: 'pending'
  },
  {
    id: 'ORD005',
    customerId: 'C005',
    customerName: 'David Wilson',
    customerEmail: 'dwilson@email.com',
    orderDate: '2024-01-19',
    status: 'canceled',
    items: [
      { productId: 'P002', productName: 'Smart Fitness Watch', quantity: 1, price: 299.99 }
    ],
    total: 299.99,
    shippingAddress: {
      street: '654 Maple Dr',
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001',
      country: 'USA'
    },
    paymentStatus: 'failed'
  },
  {
    id: 'ORD006',
    customerId: 'C001',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    orderDate: '2024-01-20',
    status: 'delivered',
    items: [
      { productId: 'P010', productName: 'Desk Lamp LED', quantity: 1, price: 44.99 }
    ],
    total: 44.99,
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    paymentStatus: 'paid'
  }
];

export const customers: Customer[] = [
  {
    id: 'C001',
    name: 'John Smith',
    email: 'john.smith@email.com',
    totalOrders: 2,
    totalSpent: 264.96,
    registrationDate: '2023-06-15'
  },
  {
    id: 'C002',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    totalOrders: 1,
    totalSpent: 64.98,
    registrationDate: '2023-08-22'
  },
  {
    id: 'C003',
    name: 'Michael Brown',
    email: 'mbrown@email.com',
    totalOrders: 1,
    totalSpent: 89.97,
    registrationDate: '2023-09-10'
  },
  {
    id: 'C004',
    name: 'Emily Davis',
    email: 'emily.d@email.com',
    totalOrders: 1,
    totalSpent: 189.98,
    registrationDate: '2023-10-05'
  },
  {
    id: 'C005',
    name: 'David Wilson',
    email: 'dwilson@email.com',
    totalOrders: 0,
    totalSpent: 0,
    registrationDate: '2023-11-18'
  },
  {
    id: 'C006',
    name: 'Jennifer Martinez',
    email: 'jmartinez@email.com',
    totalOrders: 5,
    totalSpent: 1245.75,
    registrationDate: '2023-05-20'
  },
  {
    id: 'C007',
    name: 'Robert Taylor',
    email: 'rtaylor@email.com',
    totalOrders: 3,
    totalSpent: 567.45,
    registrationDate: '2023-07-12'
  },
  {
    id: 'C008',
    name: 'Lisa Anderson',
    email: 'landerson@email.com',
    totalOrders: 4,
    totalSpent: 892.30,
    registrationDate: '2023-04-08'
  }
];

export const salesData = [
  { date: 'Mon', sales: 1200 },
  { date: 'Tue', sales: 1800 },
  { date: 'Wed', sales: 1500 },
  { date: 'Thu', sales: 2200 },
  { date: 'Fri', sales: 2800 },
  { date: 'Sat', sales: 3200 },
  { date: 'Sun', sales: 2600 }
];

export const categories = [
  'Electronics',
  'Sports',
  'Clothing',
  'Accessories',
  'Home',
  'Beauty',
  'Books',
  'Toys'
];
