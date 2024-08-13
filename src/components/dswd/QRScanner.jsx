import { useState } from "react";import QrScanner from "react-qr-scanner";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";

const QRScanner = () => {
	const [data, setData] = useState("No result");
	const [isScanning] = useState(true); // Set isScanning to true by default

	const handleScan = (result) => {
		if (result) {
			setData(result.text);
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
		<>
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
					<div className="mx-2 sm:mx-8 mt-8 flex flex-row">
						{/* <p className="mt-4 text-lg text-gray-700">Scanned Data: {data || "No result"}</p> */}
					</div>

					<div className="mt-8 flex flex-row justify-evenly flex-wrap">
						<div className="py-8 px-8 mb-2 max-w-sm bg-blue-700 mx-2 text-white rounded-xl shadow-2xl  flex items-center space-y-0 space-x-6">
							<AccountCircleOutlinedIcon sx={{ width: 50, height: 50 }} />
							<div className="text-left sm:text-center space-y-2">
								<div className="space-y-0.5">
									<p className="text-lg font-semibold">Edmar Jay O. Heolin</p>
									<p className="text-white font-medium">Pob. Guipos, Zamboanga del Sur</p>
								</div>
							</div>
						</div>
						<div className="py-8 px-8 mb-2 max-w-sm bg-blue-700 mx-2 text-white rounded-xl shadow-2xl  flex items-center space-y-0 space-x-6">
							<InsertPhotoOutlinedIcon sx={{ width: 50, height: 50 }} />
							<div className="text-center space-y-2">
								<div className="space-y-0.5">
									<p className="text-lg font-semibold">Requirements Available</p>
									<p className="text-white font-medium">Click to view</p>
								</div>
							</div>
						</div>
						<div className="py-8 px-8 mb-2 max-w-sm bg-green-500 mx-2 text-white rounded-xl shadow-2xl  flex items-center space-y-0 space-x-6">
							<DoneAllOutlinedIcon sx={{ width: 50, height: 50 }} />
							<div className="space-y-2 text-left">
								<div className="space-y-0.5">
									<p className="text-lg font-semibold">Eligible</p>
									<p className="text-slate-500 font-medium">For Pension release</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default QRScanner;
