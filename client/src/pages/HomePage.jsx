import React from "react"
import Header from "../components/Header"
import "../App.css";
import CardsList from "../components/CardsList";
import AddSuggestion from "../components/AddSuggestion";
import Footer from "../components/Footer/Footer";


function HomePage(props) {
  const {dailyPic, setSelectedPic, latestPicsList, user} = props
  return (
    <>
      <div className='header-pic'>
        <Header data={dailyPic} user={user}/>
      </div>
      <div className ='gallery-container'>
        <CardsList data={latestPicsList} setSelectedPic={setSelectedPic} user={user}/>
      </div>
      {user && <AddSuggestion user={user}/>}
      <Footer/>
      
    </>
  );
}

export default HomePage;
  