import { useState } from "react";import QrScanner from "react-qr-scanner";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";

const QRScanner = () => {
	const [data, setData] = useState({ name: "", address: "", status: "", transactionId: "" });
	const [scanMessage, setScanMessage] = useState("Place the QR to camera clearly");

	const handleScan = (result) => {
		if (result) {
			const qrData = result.text;
			console.log("QR Data:", qrData); // Log to verify the scanned text

			// Try to match expected data lines without labels
			const lines = qrData.split("\n");
			const userId = lines[0] || "ID not found";
			const firstName = lines[1] || "Name not found";
			const address = lines[2] || "Address not found"; // Extract address
			const status = lines[3] || "Status not found";
			const transactionId = lines[4] || "Transaction ID not found";

			// Log parsed data for debugging
			console.log("Parsed Data:", { userId, firstName, address, status, transactionId });

			setData({
				name: firstName,
				address: address,
				status: status,
				transactionId: transactionId,
			});

			setScanMessage(""); // Clear the message after a successful scan
		}
	};

	const handleError = (err) => {
		console.error(err);
	};

	const handleReset = () => {
		setData({ name: "", address: "", status: "", transactionId: "" }); // Clear the previous data
		setScanMessage("Place the QR to camera clearly"); // Reset the message
	};

	const previewStyle = {
		height: 240,
		width: 320,
	};

	return (
		<div className="min-h-screen bg-gray-100 p-4 rounded-xl">
			<h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">QR Code Scanner</h1>
			<div className="flex flex-col items-center justify-between">
				<div className="bg-white p-4 rounded-md shadow-2xl">
					<QrScanner
						delay={300}
						style={previewStyle}
						onError={handleError}
						onScan={handleScan}
						className="w-full h-full rounded-md"
						constraints={{ facingMode: "environment" }} // Use back-facing camera
					/>
					<p className="mt-4 text-center text-gray-600">{scanMessage}</p>
				</div>

				{/* Display data only after successful scan */}
				{data.name && (
					<div className="mt-8 flex flex-row justify-evenly w-full">
						<div className="py-8 px-8 mb-2 w-full max-w-[380px] bg-blue-700 mx-2 text-white rounded-xl shadow-2xl flex items-center space-y-0 space-x-6">
							<AccountCircleOutlinedIcon sx={{ width: 50, height: 50 }} />
							<div className="text-left space-y-2">
								<div className="space-y-0.5">
									<p className="text-lg font-semibold">{data.name || "Name not found"}</p>
									<p className="text-white font-medium">{data.address || "No Address found"}</p>
								</div>
							</div>
						</div>

						<div className="py-8 px-8 mb-2 w-full max-w-[380px] bg-green-500 mx-2 text-white rounded-xl shadow-2xl flex items-center space-y-0 space-x-6">
							<DoneAllOutlinedIcon sx={{ width: 50, height: 50 }} />
							<div className="space-y-2 text-left">
								<div className="space-y-0.5">
									<p className="text-lg font-semibold">{data.status || "Status not found"}</p>
									<p className="text-slate-500 font-medium">For Pension release</p>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Transaction ID Section */}
				{data.transactionId && ( // Only show this if transaction ID is found
					<div className="mt-8 py-4 px-8 w-full max-w-[380px] bg-yellow-400 mx-2 text-black rounded-xl shadow-2xl text-center">
						<p className="text-lg font-semibold">Transaction ID</p>
						<p className="text-xl font-bold">{data.transactionId || "Transaction ID not found"}</p>
					</div>
				)}

				{/* Reset Button */}
				{data.name && (
					<button
						className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md"
						onClick={handleReset}>
						Scan Another QR Code
					</button>
				)}
			</div>
		</div>
	);
};

export default QRScanner;
