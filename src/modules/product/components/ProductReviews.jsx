import { useState } from 'react';
import { FiStar, FiThumbsUp, FiUser } from 'react-icons/fi';

const ProductReviews = ({ reviews, rating, reviewCount, onSubmitReview }) => {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');

  if (!reviews || reviews.length === 0) {
    return (
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Customer Reviews
        </h3>
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No reviews yet</p>
          <button
            onClick={() => setShowWriteReview(true)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            Be the first to review
          </button>
        </div>
        {showWriteReview && (
          <WriteReviewForm
            onSubmit={onSubmitReview}
            onCancel={() => setShowWriteReview(false)}
          />
        )}
      </div>
    );
  }

  // Calculate rating distribution
  const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
    const stars = 5 - i;
    const count = reviews.filter(review => review.rating === stars).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { stars, count, percentage };
  });

  // Filter and sort reviews
  let filteredReviews = [...reviews];

  if (filterBy !== 'all') {
    const filterRating = parseInt(filterBy);
    filteredReviews = filteredReviews.filter(review => review.rating === filterRating);
  }

  filteredReviews.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const renderStars = (rating, size = 'w-4 h-4') => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`${size} ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Customer Reviews
          </h3>
          <button
            onClick={() => setShowWriteReview(true)}
            className="px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            Write a Review
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Rating Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Overall Rating */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-3xl font-bold text-gray-900">{rating}</span>
              <div className="flex items-center space-x-1">
                {renderStars(rating)}
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Based on {reviewCount} reviews
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ stars, count, percentage }) => (
              <div key={stars} className="flex items-center space-x-2 text-sm">
                <span className="w-8 text-right">{stars}</span>
                <FiStar className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-gray-600">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <div className="flex items-center space-x-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mr-2">
                Filter:
              </label>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All ratings</option>
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mr-2">
                Sort:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="highest">Highest rated</option>
                <option value="lowest">Lowest rated</option>
                <option value="helpful">Most helpful</option>
              </select>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            Showing {filteredReviews.length} of {reviews.length} reviews
          </p>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <FiUser className="w-5 h-5 text-gray-500" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {review.userName}
                        {review.verified && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Verified Purchase
                          </span>
                        )}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(review.date)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {review.title && (
                    <h5 className="font-medium text-gray-900 mb-2">
                      {review.title}
                    </h5>
                  )}

                  <p className="text-gray-700 mb-3 leading-relaxed">
                    {review.comment}
                  </p>

                  <div className="flex items-center space-x-4 text-sm">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                      <FiThumbsUp className="w-3 h-3" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Write Review Form */}
        {showWriteReview && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <WriteReviewForm
              onSubmit={onSubmitReview}
              onCancel={() => setShowWriteReview(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Write Review Form Component
const WriteReviewForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    comment: '',
    userName: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.rating === 0) {
      alert('Please select a rating');
      return;
    }
    if (!formData.comment.trim()) {
      alert('Please write a review');
      return;
    }
    onSubmit?.(formData);
    onCancel();
  };

  const renderStarRating = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => setFormData(prev => ({ ...prev, rating: i + 1 }))}
        className={`w-6 h-6 ${i < formData.rating ? 'text-yellow-400' : 'text-gray-300'
          } hover:text-yellow-400 transition-colors duration-200`}
      >
        <FiStar className="w-full h-full fill-current" />
      </button>
    ));
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">
        Write a Review
      </h4>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating *
          </label>
          <div className="flex items-center space-x-1">
            {renderStarRating()}
            <span className="ml-2 text-sm text-gray-600">
              {formData.rating > 0 ? `${formData.rating} out of 5 stars` : 'Select a rating'}
            </span>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            value={formData.userName}
            onChange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter your name"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Review Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Summarize your review"
          />
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Review *
          </label>
          <textarea
            value={formData.comment}
            onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Share your thoughts about this product..."
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-3 pt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            Submit Review
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductReviews;
