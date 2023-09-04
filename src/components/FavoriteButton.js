import { useEffect, useState,useContext } from "react";
import userService from '../services/user.services';
import { AuthContext } from '../context/auth.context';

const FavoriteButton = ({ idactivity }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const authContext = useContext(AuthContext);
    const { user } = authContext;

    useEffect(() => {
        userService.getUsersFavorites(user._id)
          .then((response) => {
            console.log(response.data);
            const userFavorites = response.data;
            const isFavorite = userFavorites.includes(idactivity);
            setIsFavorite(isFavorite);
          })
          .catch((error) => {
            console.error(error);
          });
      }, [user._id, idactivity]);

    const handleFavoriteButton = () => {
        try {
          if (isFavorite) {
            userService.removeFavoriteActivity(idactivity)
              .then(() => setIsFavorite(false))
              .catch((err) => console.error(err));
          } else {
            userService.addFavoriteActivity(idactivity)
              .then(() => setIsFavorite(true))
              .catch((err) => console.error(err));
          }
        } catch (err) {
          console.error(err);
        }
      };
     
    return (
        <div>
            <button onClick={handleFavoriteButton}>
                        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
        </div>
    )
}

export default FavoriteButton;