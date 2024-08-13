import { useState } from "react";import api from "../../assets/api"; // Assuming api is your configured axios instance
const FileSubmit = () => {
	const [files, setFiles] = useState([]);
	const [error, setError] = useState(null);
	const [preview, setPreview] = useState(null);
	const [loading, setLoading] = useState(false);
	const userData = JSON.parse(localStorage.getItem("userData"));

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const droppedFiles = Array.from(e.dataTransfer.files);
		handleFileUpload(droppedFiles);
	};

	const handleFileChange = (e) => {
		const selectedFiles = Array.from(e.target.files);
		handleFileUpload(selectedFiles);
	};

	const handleFileUpload = (selectedFiles) => {
		setError(null);

		if (selectedFiles.length > 1) {
			setError("You can only upload one file at a time.");
			return;
		}

		const file = selectedFiles[0];

		if (!file.type.startsWith("image/")) {
			setError("Only image files are allowed.");
			return;
		}

		setFiles([file]);

		const reader = new FileReader();
		reader.onloadend = () => {
			setPreview(reader.result);
		};
		reader.readAsDataURL(file);
	};

	const handleSubmit = async () => {
		if (files.length === 0) {
			setError("Please select a file to upload.");
			return;
		}

		setLoading(true);

		const formData = new FormData();
		formData.append('seniors', userData.id);
		formData.append("requirement", files[0]);
		formData.append("status", "Not Eligible"); // Automatically add status

		try {
			const response = await api.post(`/api/pensions/create/${userData.id}/`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			console.log("File uploaded successfully:", response.data);
			// Handle success (e.g., show a success message, clear the form, etc.)
		} catch (error) {
			console.error("Error uploading file:", error);
			setError("There was an error uploading your file. Please try again.");
		} finally {
			setLoading(false);
		}
	};


	return (
		<>
			<p className="text-xl sm:text-2xl font-bold mt-8">Submit Requirements</p>
			<p className="text-sm text-gray-700 mb-2">
				Please submit requirements on time and upload images responsibly to avoid inconvenience.
			</p>

			<div
				className="flex justify-center items-center w-full h-96 p-4 border-2 border-dashed bg-gray-100 border-blue-800 rounded-lg cursor-pointer"
				onDragOver={handleDragOver}
				onDrop={handleDrop}>
				<div className="text-center">
					<input
						type="file"
						onChange={handleFileChange}
						className="hidden w-full h-full"
						id="file-upload"
					/>
					<label
						htmlFor="file-upload"
						className="block">
						<p className="text-gray-500">Drag & Drop your files here or click to upload</p>
						<p className="text-sm text-gray-400">Supported file types: .jpg, .png, etc.</p>
					</label>
				</div>

				{error && <p className="mt-4 text-red-500">{error}</p>}
			</div>

			{preview && (
				<div>
					<div className="mt-4 flex flex-col justify-center">
						<p className="text-xl sm:text-2xl font-bold mt-8 mb-2 flex">
							<span className="mr-2">Preview of</span>{" "}
							{files.length > 0 && (
								<ul className="space-y-2">
									{files.map((file, index) => (
										<li
											key={index}
											className="text-gray-600">
											{file.name}
										</li>
									))}
								</ul>
							)}
						</p>
						<img
							src={preview}
							alt="Preview"
							className="max-w-full h-auto rounded-lg border-2 border-gray-800"
						/>
					</div>

					<button
						className={`mx-auto mt-8 flex bg-cyan-400 px-32 py-2 text-white text-xl rounded-full hover:scale-125 shadow-xl hover:shadow-2xl duration-300 ${
							loading ? "opacity-50 cursor-not-allowed" : ""
						}`}
						onClick={handleSubmit}
						disabled={loading}>
						{loading ? "Submitting..." : "Submit"}
					</button>
				</div>
			)}
		</>
	);
};

export default FileSubmit;
