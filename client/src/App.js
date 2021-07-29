//Setup
import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import NormalRoute from './routing-components/NormalRoute';
import ProtectedRoute from './routing-components/ProtectedRoute';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


//Helpers
import * as CONSTS from './utils/consts';
import { getLoggedIn, logout } from './services/auth';
import axios from "axios";

//UI
import Navbar from './components/Navbar/Navbar';

//Pages
import HomePage from './pages/HomePage';
import LogIn from './pages/LogIn';
import ProtectedPage from './pages/ProtectedPage';
import Signup from './pages/Signup';
import DetailsPageHeader from "./pages/DetailsPageHeader"
import Card from "./pages/Card"
import MyConstellation from './pages/MyConstellation';


function App() {
	const [user, setUser] = useState(null);
  	const [dailyPic, setDailyPic] = useState({});
	const [latestPicsList, setLatestPicsList] = useState([]);
	const [selectedPic, setSelectedPic] = useState({});
   
	//ponemos la foto del dia
  useEffect(()=>{
    axios.get("https://api.nasa.gov/planetary/apod?api_key=4nNodO7eptWEC8F8NiG9XcA3x5A4AYqADrniZGFu")
    .then(res=>{
        setDailyPic(res.data)
    })
}, [])


useEffect(()=>{
    axios.get("https://api.nasa.gov/planetary/apod?api_key=4nNodO7eptWEC8F8NiG9XcA3x5A4AYqADrniZGFu&count=50")
    .then(res=>{
        setLatestPicsList(res.data)
    })
}, [])

	useEffect(() => {
		const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
		if (!accessToken) {
			setUser(null);
		}
		getLoggedIn(accessToken).then((res) => {
			//console.log(res);
			if (!res.data) {
				console.log('RES IN CASE OF FAILURE', res);
				setUser(null);
			} else {
				setUser(res.data.user);
			}
		});
	}, []);


	const handleLogout = () => {
		const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
		if (!accessToken) {
			setUser(null);
		}
		logout(accessToken).then((res) => {
			if (!res.status) {
				console.error('💡 SOMETHING HAPPENED THAT HAS TO DEALT WITH', res);
			}
      
			localStorage.removeItem(CONSTS.ACCESS_TOKEN);
			setUser(null);
		});
	};


	const authenticate = (user) => {
		setUser(user);
	};


	return (
		<div className='App'>
			<Navbar handleLogout={handleLogout} user={user} />
			<ToastContainer />	​       
			<Switch>
	
				{/* <NormalRoute exact path={'/latest-pics/'} render={(props)=><CardsList {...props} setSelectedPic={setSelectedPic} />}/> */}
				<ProtectedRoute
					exact
					path={'/myconstellation'}
					component={MyConstellation}
					user={user}
					setSelectedPic={setSelectedPic}
					selectedPic={selectedPic}
					
				/>
			
				<Route exact path={'/details'} render={(props)=><Card {...props} data={selectedPic} user={user} />}/> 
				<NormalRoute exact path={'/daily-details'} component={DetailsPageHeader} data={dailyPic} />
				<NormalRoute exact path={'/'}
				   component={HomePage}
				   dailyPic={dailyPic}
				   setSelectedPic={setSelectedPic}
				   latestPicsList={latestPicsList}
				   user={user}
				/>

				<NormalRoute
					exact
					path={'/auth/signup'}
					authenticate={authenticate}
					component={Signup}
				/>

				<NormalRoute
					exact
					path={'/auth/login'}
					authenticate={authenticate}
					component={LogIn}
				/>

				<ProtectedRoute
					exact
					path={'/protected'}
					component={ProtectedPage}
					user={user}
				/>
			</Switch>
		</div>
	);
}

export default App;