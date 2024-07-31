import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NoInternetConnection from "./components/NoInternetConnection";
import Register from "./routes/Register";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Homepage from "./routes/Homepage";
import NavBar from "./components/Navbar";
import Login from './routes/Login'
function Logout() {
	localStorage.clear();
	return <Navigate to="/" />;
}

function App() {
	return (
		<NoInternetConnection>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<>
								<NavBar />
								<Homepage />
							</>
						}
					/>
					<Route
						path="/register"
						element={
							<>
								<NavBar />
								<Register />
							</>
						}
					/>
					<Route
						path="/login"
						element={
							<>
								<NavBar />
								<Login />
							</>
						}
					/>
					<Route
						path="/home"
						element={<ProtectedRoute>{/* Components specific to the Home route */}</ProtectedRoute>}
					/>
					<Route
						path="/profile"
						element={<ProtectedRoute>{/* Components specific to the Profile route */}</ProtectedRoute>}
					/>
					<Route
						path="/rental"
						element={<ProtectedRoute>{/* Components specific to the Rental route */}</ProtectedRoute>}
					/>
					<Route
						path="/logout"
						element={<Logout />}
					/>
					<Route
						path="*"
						element={<NotFound />}
					/>
				</Routes>
			</BrowserRouter>
		</NoInternetConnection>
	);
}

export default App;
