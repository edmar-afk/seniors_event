import { useState } from "react";
import QrScanner from "react-qr-scanner";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";


const QRScanner = () => {
	const [data, setData] = useState({ name: "", status: "" });
	const [isScanning, setIsScanning] = useState(true);

	const handleScan = (result) => {
		if (result) {
			const qrData = result.text;
			const [usernameLine, statusLine] = qrData.split("\n");

			const name = usernameLine.split(": ")[1];
			const status = statusLine.split(": ")[1];

			setData({
				name: name || "Name not found",
				status: status || "Status not found",
			});

			setIsScanning(false);
		}
	};

	const handleError = (err) => {
		console.error(err);
	};

	const previewStyle = {
		height: 240,
		width: 320,
	};

	return (
		<div className="min-h-screen bg-gray-100 p-4 rounded-xl">
			<h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">QR Code Scanner</h1>
			<div className="flex flex-col items-center justify-between">
				{isScanning && (
					<div className="bg-white p-4 rounded-md shadow-2xl">
						<QrScanner
							delay={300}
							style={previewStyle}
							onError={handleError}
							onScan={handleScan}
							className="w-full h-full rounded-md"
						/>
					</div>
				)}
				<div className="mt-8 flex flex-row justify-evenly w-full">
					<div className="py-8 px-8 mb-2 w-full max-w-[380px] bg-blue-700 mx-2 text-white rounded-xl shadow-2xl flex items-center space-y-0 space-x-6">
						<AccountCircleOutlinedIcon sx={{ width: 50, height: 50 }} />
						<div className="text-left space-y-2">
							<div className="space-y-0.5">
								<p className="text-lg font-semibold">{data.name || "Name not found"}</p>
								<p className="text-white font-medium">Pob. Guipos, Zamboanga del Sur</p>
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
			</div>
		</div>
	);
};

export default QRScanner;
