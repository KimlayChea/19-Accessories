export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags?: string[];
  featured?: boolean;
  discount?: number;
  inStock: boolean;
  stock: number;
  created_at: string;
}

export const products: Product[] = [
  //   {
  //     id: "1",
  //     title: "Stylish Summer Dress",
  //     description:
  //       "Lightweight and comfortable summer dress, perfect for beach days and casual outings.",
  //     price: 49.99,
  //     image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
  //     category: "Women",
  //     tags: ["Summer", "Dress", "Casual"],
  //     featured: true,
  //     inStock: true,
  //     stock: 15,
  //   },
  //   {
  //     id: "2",
  //     title: "Classic Leather Jacket",
  //     description:
  //       "High-quality leather jacket with a timeless design that never goes out of style.",
  //     price: 199.99,
  //     image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
  //     category: "Men",
  //     tags: ["Jacket", "Leather", "Classic"],
  //     featured: true,
  //     discount: 10,
  //     inStock: true,
  //     stock: 8,
  //   },
  //   {
  //     id: "3",
  //     title: "Casual Sneakers",
  //     description:
  //       "Comfortable and stylish sneakers for everyday wear, available in multiple colors.",
  //     price: 79.99,
  //     image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  //     category: "Shoes",
  //     tags: ["Sneakers", "Casual", "Comfortable"],
  //     featured: true,
  //     inStock: true,
  //     stock: 23,
  //   },
  //   {
  //     id: "4",
  //     title: "Elegant Watch",
  //     description:
  //       "Sophisticated timepiece with a stainless steel band and water-resistant features.",
  //     price: 149.99,
  //     image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
  //     category: "Accessories",
  //     tags: ["Watch", "Elegant", "Stainless Steel"],
  //     featured: true,
  //     inStock: true,
  //     stock: 12,
  //   },
  //   {
  //     id: "5",
  //     title: "Designer Handbag",
  //     description:
  //       "Luxurious handbag with ample storage space and a sleek, modern design.",
  //     price: 129.99,
  //     image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
  //     category: "Accessories",
  //     tags: ["Handbag", "Designer", "Luxury"],
  //     featured: true,
  //     inStock: true,
  //     stock: 7,
  //   },
  //   {
  //     id: "6",
  //     title: "Slim Fit Jeans",
  //     description:
  //       "Comfortable slim fit jeans made from premium denim, perfect for any casual occasion.",
  //     price: 69.99,
  //     image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
  //     category: "Men",
  //     tags: ["Jeans", "Slim Fit", "Denim"],
  //     featured: true,
  //     inStock: true,
  //     stock: 18,
  //   },
  // ];
  // // Categories with their images
  // export const categories = [
  //   {
  //     id: "1",
  //     name: "Women",
  //     image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
  //     itemCount: 156,
  //   },
  //   {
  //     id: "2",
  //     name: "Men",
  //     image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891",
  //     itemCount: 143,
  //   },
  //   {
  //     id: "3",
  //     name: "Shoes",
  //     image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
  //     itemCount: 65,
  //   },
  //   {
  //     id: "4",
  //     name: "Accessories",
  //     image: "https://images.unsplash.com/photo-1523207911345-32501502db22",
  //     itemCount: 89,
  //   },
];
