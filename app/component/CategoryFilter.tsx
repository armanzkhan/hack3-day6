import React, { useState } from "react";

interface Category {
  _id: string;
  name: string;
}

interface Props {
  categories: Category[];
  onFilter: (selectedCategory: string) => void;
}

const CategoryFilter = ({categories, onFilter}: Props) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        onFilter(category)
    };


    return (
        <div className="mt-6">
      <h3 className="font-bold text-lg mb-4">Category</h3>
      <ul>
        {categories.map((category) => (
          <li key={category._id} className="mb-2">
            <button
              onClick={() => handleCategoryClick(category.name)}
              className={`px-4 py-2 rounded ${
                selectedCategory === category.name ? "bg-primary text-white" : "bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
    )
}

export default CategoryFilter