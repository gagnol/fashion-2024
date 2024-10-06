'use client';
import { useState, useEffect } from 'react';
import ProductTable from './productTable';
import Categories from './categories';
import SearchBox from './search';
import { Toaster } from 'react-hot-toast';

interface ProductClientProps {
  products: any[];
}

const ProductClient: React.FC<ProductClientProps> = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products); // State for filtered products
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [query, setQuery] = useState<string>(''); // State for search query

  useEffect(() => {
    let filtered = products;
    // Filter by search query
    if (query) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by selected category
    if (selectedCategory) {
      filtered = filtered.filter((product) =>
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [query, selectedCategory, products, ]);
  
  return (
    <div>
      <Toaster/>
      <div className="join flex">
        <Categories onCategorySelect={setSelectedCategory} />
        <SearchBox defaultQuery={query} onSearch={setQuery} />
      </div>
      <p>Total products: {filteredProducts.length}</p>
      <div className="overflow-x-auto">
      <ProductTable products={filteredProducts} />
      </div>
    </div>
  );
};

export default ProductClient;
