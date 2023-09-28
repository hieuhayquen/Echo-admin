import { Fragment, useEffect, React} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { getAllSongs } from "./redux/songsSlice/apiCalls";
import { getAllUsers } from "./redux/usersSlice/apiCalls";
import { getAllPlaylists } from "./redux/playlistSlice/apiCalls";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Songs from "./pages/Songs";
import SongForm from "./components/Forms/SongForm";
import UserForm from "./components/Forms/UserForm";

function App() {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	useEffect(() => {
		let token = null;
		const root = JSON.parse(window.localStorage.getItem("persist:root"));

		if (root) {
			const { auth } = root;
			const { user } = JSON.parse(auth);
			if (user) token = user.token;
		}

		if (user && token) {
			getAllSongs(dispatch);
			getAllUsers(dispatch);
			getAllPlaylists(dispatch);
		}
	}, [dispatch, user]);

	return (
		<Fragment>
			{user && user.isAdmin && (	
				<Fragment>
					<Navbar/>
					<Sidebar/>
					<Routes>
						<Route path="/" element={<div className="main"><Dashboard/></div>} />
						<Route path="/songs/:id" element={<div className="main"><SongForm/></div>} />
						<Route path="/users/:id" element={<div className="main"><UserForm/></div>} />
						<Route path="/users" element={<div className="main"><Users/></div>} />
						<Route path="/songs" element={<div className="main"><Songs/></div>} />
					</Routes>
				</Fragment>
			)}
			{!user && 
				<Routes>
					<Route path="/login" element={<Login/>} />
				</Routes>
			}  
		</Fragment>
	);
}

export default App;
