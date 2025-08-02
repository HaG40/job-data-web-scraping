import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';

function FavoriteButton() {
  const [favorited, setFavorited] = useState(false);

  const toggleFavorite = () => {
    setFavorited(!favorited);
    // TODO: call API to add/remove favorite
  };

  return (
      <button onClick={toggleFavorite} className='cursor-pointer'>
      {favorited ? (
        <FaHeart color="red" size={20} />
      ) : (
        <FaRegHeart color="gray" size={20} />
      )}
    </button>
  )
}

export default FavoriteButton;
