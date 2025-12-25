import { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { wishlistService } from '../services/wishlistService';
import { useNavigate } from 'react-router-dom';

interface WishlistButtonProps {
  accommodationId: number;
  size?: 'sm' | 'md' | 'lg';
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ accommodationId, size = 'md' }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  useEffect(() => {
    if (user) {
      checkWishlist();
    }
  }, [user, accommodationId]);

  const checkWishlist = async () => {
    try {
      const result = await wishlistService.checkWishlist(accommodationId);
      setIsWishlisted(result.isWishlisted);
    } catch (error) {
      console.error('Failed to check wishlist:', error);
    }
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      if (isWishlisted) {
        await wishlistService.removeFromWishlist(accommodationId);
        setIsWishlisted(false);
      } else {
        await wishlistService.addToWishlist(accommodationId);
        setIsWishlisted(true);
      }
    } catch (error) {
      console.error('Wishlist toggle error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`${sizeClasses[size]} flex items-center justify-center rounded-full bg-white shadow hover:shadow-lg transition-all disabled:opacity-50 ${
        isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
      }`}
      title={isWishlisted ? '위시리스트에서 제거' : '위시리스트에 추가'}
    >
      <FiHeart
        size={iconSizes[size]}
        className={isWishlisted ? 'fill-current' : ''}
      />
    </button>
  );
};

export default WishlistButton;
