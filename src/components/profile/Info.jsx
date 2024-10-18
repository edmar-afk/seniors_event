/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";import logo from "../../assets/img/logo.png"; 
import api from "../../assets/api"; // Custom API handler

function Info({ isSidebarOpen }) {
	const userData = JSON.parse(localStorage.getItem("userData"));
	const [profilePic, setProfilePic] = useState(logo); // Default to logo if no profile pic
	const [selectedFile, setSelectedFile] = useState(null);
	const fileInputRef = useRef(null);

	// Fetch user profile including profile pic based on user id
	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const response = await api.get(`/api/profile/${userData.id}/`); // Fetch profile by user ID
				const profileData = response.data;

				if (profileData.profile_pic) {
					setProfilePic(profileData.profile_pic); // Use profile picture if available
				} else {
					setProfilePic(logo); // Use default logo if no profile picture is set
				}
			} catch (error) {
				console.error("Error fetching user profile:", error);
				setProfilePic(logo); // Fallback to default logo on error
			}
		};

		fetchUserProfile();
	}, [userData.id]);

	// Function to trigger file input when button is clicked
	const handleProfilePicClick = () => {
		fileInputRef.current.click();
	};

	// Handle file selection
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setSelectedFile(file);
		}
	};

	// Function to upload the selected file
	const handleSave = async () => {
		if (!selectedFile) return;

		const formData = new FormData();
		formData.append("profile_pic", selectedFile);

		try {
			const response = await api.post("/api/update-profile-pic/", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			if (response.status === 200) {
				setProfilePic(URL.createObjectURL(selectedFile)); // Update local state with new profile pic
				alert("Profile picture updated successfully!");
			}
		} catch (error) {
			console.error("Error updating profile picture:", error);
			alert("Failed to update profile picture");
		}
	};

	return (
		<>
			<div
				className={`transition-all duration-300 ${
					isSidebarOpen ? "ml-2 lg:ml-72" : "ml-2 lg:ml-14"
				} pt-24 px-4 mx-auto sm:px-7 md:px-6`}>
				<div className="h-full bg-gray-200 p-8">
					<div className="bg-white rounded-lg shadow-xl pb-8">
						<div className="w-full">
							<img
								src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
								className="w-full h-full rounded-tl-lg rounded-tr-lg"
							/>
						</div>
						<div className="flex flex-col items-center -mt-20">
							<img
								src={profilePic || logo} // Display profilePic or fallback to logo if null
								className="w-40 h-40 border-4 border-white rounded-full"
								alt="Profile"
							/>
							<div className="flex items-center space-x-2 mt-2">
								<p className="text-2xl">{userData.first_name}</p>
								<span
									className="bg-blue-500 rounded-full p-1"
									title="Verified">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="text-gray-100 h-2.5 w-2.5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="4"
											d="M5 13l4 4L19 7"></path>
									</svg>
								</span>
							</div>
							<p className="text-gray-700">{userData.username}</p>
							<p className="text-sm text-gray-500">{userData.last_name}</p>
						</div>
						<div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
							<div className="flex items-center space-x-4 mt-2">
								<button
									onClick={handleProfilePicClick}
									className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										viewBox="0 0 20 20"
										fill="currentColor">
										<path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
									</svg>
									<span>Change Profile Picture</span>
								</button>
								<input
									type="file"
									ref={fileInputRef}
									onChange={handleFileChange}
									style={{ display: "none" }}
									accept="image/*"
								/>
								{selectedFile && (
									<button
										onClick={handleSave}
										className="bg-green-600 hover:bg-green-700 text-gray-100 px-4 py-2 rounded text-sm transition duration-100">
										Save
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Info;
