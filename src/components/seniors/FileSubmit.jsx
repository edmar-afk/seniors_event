import { useEffect, useState } from "react";import Swal from "sweetalert2";
import api from "../../assets/api";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

const FileSubmit = () => {
	const [files, setFiles] = useState({ requirement: null, requirement1: null, requirement2: null });
	const [previews, setPreviews] = useState({ requirement: null, requirement1: null, requirement2: null });
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const userData = JSON.parse(localStorage.getItem("userData"));
	const [submissionStatus, setSubmissionStatus] = useState(null); // State for submission status

	useEffect(() => {
		const fetchSubmissionStatus = async () => {
			try {
				const response = await api.get("/api/submission-status/"); // Adjust the API endpoint as needed
				setSubmissionStatus(response.data.is_on); // Assuming response contains { is_on: true/false }
			} catch (error) {
				console.error("Error fetching submission status:", error);
			}
		};
		fetchSubmissionStatus();
	}, []); // Added dependency array to prevent infinite re-fetching

	const handleFileChange = (e, fieldName) => {
		const file = e.target.files[0];
		if (!file.type.startsWith("image/")) {
			setError("Only image files are allowed.");
			return;
		}

		setFiles({ ...files, [fieldName]: file });

		const reader = new FileReader();
		reader.onloadend = () => {
			setPreviews({ ...previews, [fieldName]: reader.result });
		};
		reader.readAsDataURL(file);
	};

	const handleSubmit = async () => {
		if (!files.requirement || !files.requirement1 || !files.requirement2) {
			setError("Please select all three files to upload.");
			return;
		}

		setLoading(true);

		const formData = new FormData();
		formData.append("seniors", userData.id);
		formData.append("requirement", files.requirement);
		formData.append("requirement1", files.requirement1);
		formData.append("requirement2", files.requirement2);
		formData.append("status", "Not Eligible");

		try {
			await api.post(`/api/pensions/create/${userData.id}/`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			Swal.fire({
				icon: "success",
				title: "Successfully Uploaded!",
				text: "You will be redirected shortly.",
				timer: 3000,
				timerProgressBar: true,
				showConfirmButton: false,
				backdrop: false,
			}).then(() => {
				window.location.href = "/pension-status";
			});
		} catch (error) {
			console.error("Error uploading file:", error);
			setError("There was an error uploading your file. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const renderFileInput = (name, label) => (
		<div className="my-12">
			<div
				className={`flex justify-center items-center w-96 h-96 p-4 border-2 border-dashed bg-gray-100 border-blue-800 rounded-lg cursor-pointer ${
					!submissionStatus ? "opacity-50 cursor-not-allowed" : ""
				}`}
				onClick={() => submissionStatus && document.getElementById(name).click()} // Enable interaction when submissionStatus is true
			>
				{previews[name] ? (
					<img
						src={previews[name]}
						alt="Preview"
						className="w-full h-full object-contain"
					/>
				) : (
					<p className="text-gray-500">Click to upload</p>
				)}
				<input
					type="file"
					id={name}
					className="hidden"
					onChange={(e) => handleFileChange(e, name)}
					disabled={!submissionStatus} // Enable file input when submissionStatus is true
				/>
			</div>
			<label className="block text-xl text-center mt-4 font-bold mb-4">{label}</label>
		</div>
	);

	return (
		<>
			<p className="text-xl sm:text-2xl font-bold mt-8">Submit Requirements</p>
			<p className="text-sm text-gray-700 mb-2">Please submit all requirements on time.</p>
			<p className="bg-red-50 text-red-600 py-3 w-fit px-4 rounded-full font-bold shadow-md">
				<ReportGmailerrorredIcon />
				Warning: Uploading incorrect or invalid image files may result in the rejection of your submission and further
				delay in the release of your pension.
			</p>
			<div className="flex flex-row justify-evenly w-full flex-wrap">
				{renderFileInput("requirement", "Picture of Grantee with Calendar")}
				{renderFileInput("requirement1", "Senior ID")}
				{renderFileInput("requirement2", "Authorization Letter")}
			</div>
			{error && <p className="mt-4 text-red-500">{error}</p>}

			<button
				className={`mx-auto mt-8 flex ${
					!submissionStatus ? "bg-red-500" : "bg-cyan-400"
				} px-32 py-2 text-white text-xl rounded-full shadow-xl duration-300 ${
					!submissionStatus ? "cursor-not-allowed opacity-50" : "hover:scale-125 hover:shadow-2xl"
				}`}
				onClick={handleSubmit}
				disabled={loading || !submissionStatus} // Disable when loading or submissionStatus is false
			>
				{loading ? "Submitting..." : !submissionStatus ? "Submission Locked" : "Submit"}
			</button>
		</>
	);
};

export default FileSubmit;
