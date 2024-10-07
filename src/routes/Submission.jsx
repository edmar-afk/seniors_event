import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import PensionList from "../components/dswd/PensionList";

import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ContentPasteOffIcon from "@mui/icons-material/ContentPasteOff";
import api from "../assets/api";

// Utility function to detect mobile or tablet devices
const isMobileOrTablet = () => {
	return /Mobi|Android|iPad|iPhone|iPod/i.test(navigator.userAgent);
};

function SeniorsList() {
	const navigate = useNavigate();

	// Set initial state based on the device type
	const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobileOrTablet());
	const [submissionStatus, setSubmissionStatus] = useState(null); // State for submission status

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
		} else {
			// Fetch the submission status
			fetchSubmissionStatus();
		}
	}, [navigate]);

	// Function to fetch submission status
	const fetchSubmissionStatus = async () => {
		try {
			const response = await api.get("/api/submission-status/"); // Adjust the API endpoint as needed
			setSubmissionStatus(response.data.is_on); // Assuming response contains { is_on: true/false }
		} catch (error) {
			console.error("Error fetching submission status:", error);
		}
	};

	// Function to toggle submission status
	const toggleSubmissionStatus = async () => {
		try {
			const response = await api.post("/api/submission-status/"); // Adjust the endpoint for toggling
			setSubmissionStatus(response.data.is_on); // Update state with new status
			Swal.fire({
				title: "Status Updated",
				text: `Submission has been turned ${response.data.is_on ? "on" : "off"}.`,
				icon: "success",
				confirmButtonText: "OK",
			});
		} catch (error) {
			console.error("Error toggling submission status:", error);
			Swal.fire({
				title: "Error",
				text: "Could not update submission status.",
				icon: "error",
				confirmButtonText: "OK",
			});
		}
	};

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
			
			<div
				className={`transition-all duration-300 ${
					isSidebarOpen ? "ml-2 lg:ml-72" : "ml-2 lg:ml-14"
				} pt-24 px-4 mx-auto sm:px-7 md:px-6`}>
				<div className="flex flex-row justify-between items-center">
					<div>
						<p className="text-2xl font-bold">Seniors Submission Table</p>
						<p className="mb-2 text-sm text-gray-600">
							Always check the status of your seniors to ensure they can receive their pension. <br /> Use the filter to
							manage them effectively.
						</p>
					</div>

					<div
						onClick={toggleSubmissionStatus} // Make the div clickable to toggle status
						className={`cursor-pointer py-2 px-4 rounded-xl font-bold text-sm ${
							submissionStatus ? "bg-blue-700 text-white" : "bg-red-500 text-white"
						}`}>
						{submissionStatus ? (
							<>
								<ContentPasteIcon />
								Submission Turned On
							</>
						) : (
							<>
								<ContentPasteOffIcon />
								Submission Turned Off
							</>
						)}
					</div>
				</div>
				<PensionList isOn={submissionStatus} />

				<Footer />
			</div>
		</>
	);
}

export default SeniorsList;
