import axios from "axios";

function internalServerError(err) {
  return {
   status: false,
   errorMessage: "Internal server error. Please check your server",
 };
}

function successStatus(res) {
 return {
   status: true,
   data: res.data,
 };
}

const favoritesService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/favorites`,
});

export function constellation(Id, favorite) {
    return favoritesService
      .put(`/${Id}`, favorite)
      .then(successStatus)
      .catch(internalServerError);
  
}

export function arrayOfFavorites(Id){
  return favoritesService
     .get(`/${Id}`)
     .then(successStatus)
     .catch(internalServerError);
 }

export function deleteFavorite(userId, fecha){
  return favoritesService
    .delete(`/${userId}/${fecha}`)
    .then(successStatus)
    .catch(internalServerError);
}
 



