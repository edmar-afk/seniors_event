import { Link } from "react-router-dom";import SeniorsDashboard from "./SeniorsDashboard";

function SeniorsAuth() {
	const userData = JSON.parse(localStorage.getItem("userData"));
	const userId = userData?.id; // Adjust according to how your user data structure

	return (
		<>
			{userId ? (
				<SeniorsDashboard />
			) : (
				<div>
					<p>Please log in to access the dashboard.</p>
					<Link to="/login">Login</Link>
				</div>
			)}
		</>
	);
}

export default SeniorsAuth;
