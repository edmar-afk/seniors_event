import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NoInternetConnection from "./components/NoInternetConnection";
import Register from "./routes/Register";
import NotFound from "./components/NotFound";
import Homepage from "./routes/Homepage";
import NavBar from "./components/Navbar";
import Login from "./routes/Login";
import SeniorsDashboard from "./routes/SeniorsDashboard";
import AdminDashboard from "./routes/AdminDashboard";
import SeniorsList from "./routes/SeniorsList";
import Submission from './routes/Submission'
import Scanner from "./routes/Scanner";
import SubmitRequirements from "./routes/SubmitRequirements";
import PensionStatus from "./routes/PensionStatus";
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
						path="/seniors-dashboard"
						element={<SeniorsDashboard />}
					/>
					<Route
						path="/admin-dashboard"
						element={<AdminDashboard />}
					/>
					<Route
						path="/seniors-list"
						element={<SeniorsList />}
					/>
					<Route
						path="/submission"
						element={<Submission />}
					/>
					<Route
						path="/file-submit"
						element={<SubmitRequirements />}
					/>
					<Route
						path="/pension-status"
						element={<PensionStatus />}
					/>
					<Route
						path="/scanner"
						element={<Scanner />}
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
