import { useEffect, useState } from "react";import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FileSubmit from '../components/seniors/FileSubmit'
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

// Utility function to detect mobile or tablet devices
const isMobileOrTablet = () => {
	return /Mobi|Android|iPad|iPhone|iPod/i.test(navigator.userAgent);
};

function SubmitRequirements() {
	const navigate = useNavigate();

	// Set initial state based on the device type
	const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobileOrTablet());

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem("userData"));
		const userId = userData?.id; // Adjust according to how your user data structure

		if (!userId) {
			// Display SweetAlert2 message
			Swal.fire({
				title: "Not Logged In",
				text: "Please log in to continue.",
				icon: "warning",
				confirmButtonText: "OK",
			}).then(() => {
				// Redirect to login page
				navigate("/login");
			});
		}
	}, [navigate]);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const userData = JSON.parse(localStorage.getItem("userData"));

	return (
		<>
			<Sidebar
				name={userData?.first_name}
				number={userData?.username}
				isOpen={isSidebarOpen}
			/>
			<Topbar
				isSidebarOpen={isSidebarOpen}
				toggleSidebar={toggleSidebar}
			/>
			<div className={`transition-all duration-300 ${isSidebarOpen ? "ml-2 lg:ml-72" : "ml-2 lg:ml-14"} pt-24 mr-2 sm:mr-8`}>
				<FileSubmit />
				<Footer/>
			</div>
		</>
	);
}

export default SubmitRequirements;
