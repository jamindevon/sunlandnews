'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories, getPostsByCategory } from '../../services/wordpressService';

export default function CategoryPosts({ params }) {
  const { slug } = params;
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 9;

  useEffect(() => {
    const fetchCategoryAndPosts = async () => {
      setLoading(true);
      
      // Find category by slug
      const categories = await getCategories();
      const categoryData = categories.find(cat => cat.slug === slug);
      
      if (categoryData) {
        setCategory(categoryData);
        
        // Get posts for this category
        const response = await getPostsByCategory(categoryData.id, currentPage, postsPerPage);
        setPosts(response.posts || []);
        setTotalPages(response.totalPages);
        setTotalPosts(response.totalPosts);
      }
      
      setLoading(false);
    };

    fetchCategoryAndPosts();
  }, [slug, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i
              ? 'bg-primary text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex flex-wrap justify-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          &laquo; Previous
        </button>
        {pages}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Next &raquo;
        </button>
      </div>
    );
  };

  return (
    <div className="mx-auto">
      <Link href="/stories" className="inline-flex items-center mb-6 text-gray-600 hover:text-primary">
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to all stories
      </Link>
      
      <div className="border-b border-gray-200 pb-4 mb-8">
        <h1 className="text-2xl font-bold">
          {category ? category.name : 'Loading category...'}
        </h1>
        {category && category.description && (
          <p className="text-gray-600 mt-2">{category.description}</p>
        )}
        {totalPosts > 0 && (
          <p className="text-gray-500 text-sm mt-2">{totalPosts} posts in this category</p>
        )}
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-500 p-10 bg-gray-100 rounded-lg">
          No posts found in this category.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <div key={post.id} className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                {post._embedded && 
                 post._embedded['wp:featuredmedia'] && 
                 post._embedded['wp:featuredmedia'][0] &&
                 post._embedded['wp:featuredmedia'][0].source_url ? (
                  <Link href={`/post/${post.id}`}>
                    <div className="relative" style={{height: "220px"}}>
                      <img 
                        src={post._embedded['wp:featuredmedia'][0].source_url} 
                        alt={post.title?.rendered || 'Post image'} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        onError={(e) => {
                          console.error('Category image failed to load:', e);
                          e.target.src = '/images/no-image-placeholder.png';
                          e.target.alt = 'Image not available';
                        }}
                      />
                    </div>
                  </Link>
                ) : (
                  <Link href={`/post/${post.id}`}>
                    <div className="w-full h-[220px] bg-gray-100 flex items-center justify-center">
                      <div className="text-center p-4">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    </div>
                  </Link>
                )}
                <div className="p-5">
                  <div className="text-xs text-gray-500 mb-2">{formatDate(post.date)}</div>
                  <Link href={`/post/${post.id}`}>
                    <h2 
                      className="text-xl font-semibold mb-2 hover:text-primary"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
                    />
                  </Link>
                  <div 
                    className="text-gray-600 mb-4 text-sm overflow-hidden text-ellipsis line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} 
                  />
                  <Link 
                    href={`/post/${post.id}`} 
                    className="text-primary font-medium hover:underline text-sm inline-flex items-center"
                  >
                    Read full story
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && renderPagination()}
        </>
      )}
    </div>
  );
} 