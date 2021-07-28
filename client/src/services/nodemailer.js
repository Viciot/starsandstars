import axios from 'axios'

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
  
  const nodeMailService = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/send-star`,
  });


  export function sendStar(emailaddress, name, object ) {
    return nodeMailService
      .post("/send-star", emailaddress, name, object)
      .then(successStatus)
      .catch(internalServerError);
  }