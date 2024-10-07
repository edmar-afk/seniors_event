/* eslint-disable react/no-unescaped-entities */ import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FileSubmit from "../components/seniors/FileSubmit";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import closeBg from "../assets/svg/close.svg";
import api from "../assets/api"; // Ensure api is imported for fetching submission status

// Utility function to detect mobile or tablet devices
const isMobileOrTablet = () => {
	return /Mobi|Android|iPad|iPhone|iPod/i.test(navigator.userAgent);
};

function SubmitRequirements() {
	const navigate = useNavigate();
	const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobileOrTablet());
	const [submissionStatus, setSubmissionStatus] = useState(null); // State for submission status

	useEffect(() => {
		const fetchSubmissionStatus = async () => {
			try {
				const response = await api.get("/api/submission-status/");
				setSubmissionStatus(response.data.is_on); // Fetch submission status
			} catch (error) {
				console.error("Error fetching submission status:", error);
			}
		};
		fetchSubmissionStatus();

		const userData = JSON.parse(localStorage.getItem("userData"));
		const userId = userData?.id;

		if (!userId) {
			Swal.fire({
				title: "Not Logged In",
				text: "Please log in to continue.",
				icon: "warning",
				confirmButtonText: "OK",
			}).then(() => {
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

			{/* Conditionally render the "submission closed" message */}
			{submissionStatus ? (
				<div
					className={`transition-all duration-300 ${
						isSidebarOpen ? "ml-2 lg:ml-72" : "ml-2 lg:ml-14"
					} pt-24 mr-2 sm:mr-8`}>
					<FileSubmit />
					<Footer />
				</div>
			) : (
				<div className="fixed w-full h-full bg-white/90 z-40 flex flex-col font-bold items-center">
					<p className="text-gray-800 mt-44 text-sm sm:text-2xl text-center">
						Sorry, Submission of Requirements are <br />
						Closed
					</p>
					<img
						src={closeBg}
						alt="Submission Closed"
						className="mx-auto w-24 sm:w-72 my-12"
					/>
					<p className="text-gray-800 mb-44 text-sm sm:text-2xl">Come again next time</p>
				</div>
			)}
		</>
	);
}

export default SubmitRequirements;
