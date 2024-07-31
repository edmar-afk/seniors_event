import { Link } from "react-router-dom";function SeniorsDashboard() {
	const userData = JSON.parse(localStorage.getItem("userData"));
	const userId = userData?.id; // Adjust according to how your user data structure
	return (
		<>
            <p>Welcome {userData.first_name}</p>
            <Link to={'/logout'}>Logout</Link>
		</>
	);
}

export default SeniorsDashboard;
