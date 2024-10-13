import { useEffect, useState } from "react";import adminLogo from "../assets/svg/adminLogo.svg";import ElderlyWomanIcon from "@mui/icons-material/ElderlyWoman";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import UnsubscribeIcon from "@mui/icons-material/Unsubscribe";
import api from "../assets/api"; // Assuming api.get is configured for API calls

function Greet() {
	const userData = JSON.parse(localStorage.getItem("userData"));
	const [submissionCount, setSubmissionCount] = useState(0); // State to store the submission count
	const [nonSubmissionCount, setNonSubmissionCount] = useState(0); // State to store the non-submission count
	const [registeredUsersCount, setRegisteredUsersCount] = useState(0); // State to store the count of registered users excluding superusers

	// Fetch the counts using api.get
	useEffect(() => {
		const fetchSubmissionCount = async () => {
			try {
				const response = await api.get("/api/pension/submission-count/");
				setSubmissionCount(response.data.submission_count);
			} catch (error) {
				console.error("Failed to fetch submission count:", error);
			}
		};

		const fetchNonSubmissionCount = async () => {
			try {
				const response = await api.get("/api/pension/non-submission-count/");
				setNonSubmissionCount(response.data.non_submission_count);
			} catch (error) {
				console.error("Failed to fetch non-submission count:", error);
			}
		};

		const fetchRegisteredUsersCount = async () => {
			try {
				const response = await api.get("/api/users/registered-count/"); // Fetch count of users excluding superusers
				setRegisteredUsersCount(response.data.registered_users_count);
			} catch (error) {
				console.error("Failed to fetch registered users count:", error);
			}
		};

		fetchSubmissionCount();
		fetchNonSubmissionCount();
		fetchRegisteredUsersCount();
	}, []);

	return (
		<>
			<div className="w-full flex flex-row my-8 justify-between flex-wrap sm:flex-nowrap text-white">
				<div className="flex items-center p-4 bg-purple-600 rounded-2xl shadow-2xl mb-4 w-full mx-2">
					<div className="flex flex-shrink-0 items-center justify-center bg-purple-200 h-16 w-16 rounded">
						<ElderlyWomanIcon
							fontSize="large"
							className="text-white"
						/>
					</div>
					<div className="flex-grow flex flex-col ml-4">
						<span className="text-xl font-bold">{registeredUsersCount}</span>{" "}
						{/* Display count of registered users excluding superusers */}
						<div className="flex items-center justify-between">
							<span className="text-gray-200">Total Registered Seniors</span>
						</div>
					</div>
				</div>

				<div className="flex items-center p-4 bg-yellow-700 rounded-2xl shadow-2xl mb-4 w-full mx-2">
					<div className="flex flex-shrink-0 items-center justify-center bg-yellow-200 h-16 w-16 rounded">
						<UnsubscribeIcon
							fontSize="large"
							className="text-orange-600"
						/>
					</div>
					<div className="flex-grow flex flex-col ml-4">
						<span className="text-xl font-bold">{nonSubmissionCount} Today</span> {/* Display non-submission count */}
						<div className="flex items-center justify-between">
							<span className="text-gray-100">Seniors not Submitting Requirements</span>
						</div>
					</div>
				</div>

				<div className="flex items-center p-4 bg-cyan-400 rounded-2xl shadow-2xl mb-4 w-full mx-2">
					<div className="flex flex-shrink-0 items-center justify-center bg-cyan-200 h-16 w-16 rounded">
						<MarkEmailReadIcon
							fontSize="large"
							className="text-cyan-600"
						/>
					</div>
					<div className="flex-grow flex flex-col ml-4">
						<span className="text-xl font-bold">{submissionCount} Today</span> {/* Display submission count */}
						<div className="flex items-center justify-between">
							<span className="text-gray-100">Seniors Submitted Requirements</span>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-row justify-evenly flex-wrap sm:flex-nowrap items-center">
				<div className="p-3 rounded-xl bg-blue-600">
					<div className="flex flex-row justify-between items-center flex-wrap sm:flex-nowrap">
						<div className="flex flex-col text-white font-extrabold p-3 sm:p-8">
							<p className="text-lg sm:text-4xl font-serif">Hello, {userData.first_name}!</p>
							<p className="font-semibold mt-4">Mission:</p>
							<p className="font-thin">
								To lead in the formulation, implementation, and coordination of social welfare and development policies
								and programs for and with the poor, vulnerable, and disadvantaged, ensuring that they are empowered for
								an improved quality of life.
							</p>
							<p className="font-semibold mt-4">Vision:</p>
							<p className="font-thin">
								A society where the poor, vulnerable, and disadvantaged are empowered for an improved quality of life.
							</p>
						</div>
						<div className="w-full flex justify-center">
							<img
								src={adminLogo}
								alt="Admin Logo"
								className="w-72 h-72"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Greet;
