import SwapVertIcon from "@mui/icons-material/SwapVert";import { useState, useEffect } from "react";import api from "../../assets/api";import Swal from "sweetalert2";import withReactContent from "sweetalert2-react-content";import RequirementsModal from "../RequirementsModal";import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";

const MySwal = withReactContent(Swal);

function PensionList() {
	const [pensions, setPensions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		api
			.get(`/api/pensions-list/`)
			.then((response) => {
				setPensions(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("There was an error fetching the pensions!", error);
				setError("There was an error fetching the pensions.");
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	const handleGenerateQr = async (pensionId) => {
		try {
			MySwal.fire({
				title: "Generating QR Code...",
				text: "Please wait while the QR code is being generated.",
				allowOutsideClick: false,
				didOpen: () => {
					MySwal.showLoading();
				},
			});

			const response = await api.post(`/api/add-qr-to-pension/${pensionId}/`);
			if (response.status === 200) {
				const updatedPensions = pensions.map((pension) =>
					pension.id === pensionId ? { ...pension, qr: response.data.qr } : pension
				);
				setPensions(updatedPensions);

				MySwal.fire({
					icon: "success",
					title: "QR Code Generated",
					text: "The QR code has been successfully generated.",
				});
			}
		} catch (error) {
			MySwal.fire({
				icon: "error",
				title: "Error",
				text: "There was an error generating the QR code. Please try again.",
			});
			console.error("Error generating QR code:", error.response?.data || error.message);
		}
	};

	const handleSendNotification = async (seniorId) => {
		try {
			const response = await api.post(`/api/send-notification/${seniorId}/`);
			if (response.status === 200) {
				MySwal.fire({
					icon: "success",
					title: "Notification Sent",
					text: "The senior has successfully received the notification.",
				});
			}
		} catch (error) {
			MySwal.fire({
				icon: "error",
				title: "Error",
				text: "There was an error sending the notification. Please try again.",
			});
			console.error("Error sending notification:", error.response?.data || error.message);
		}
	};

	return (
		<div className="p-6 px-0 bg-white rounded-2xl shadow-2xl overflow-x-auto">
			<table className="w-full table-auto text-left">
				<thead className="sticky top-0">
					<tr>
						<th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
							<p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center gap-2 font-normal leading-none opacity-70">
								<SwapVertIcon fontSize="small" />
								Name
							</p>
						</th>
						<th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
							<p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center gap-2 font-normal leading-none opacity-70">
								<SwapVertIcon fontSize="small" />
								Requirements
							</p>
						</th>
						<th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
							<p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center gap-2 font-normal leading-none opacity-70">
								<SwapVertIcon fontSize="small" />
								Date Submitted
							</p>
						</th>
						<th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
							<p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center gap-2 font-normal leading-none opacity-70">
								<SwapVertIcon fontSize="small" />
								Status
							</p>
						</th>
						<th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
							<p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center gap-2 font-normal leading-none opacity-70">
								
								QR Code
							</p>
						</th>
						<th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
							<p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
								Actions
							</p>
						</th>
					</tr>
				</thead>
				<tbody>
					{pensions.map((pension) => (
						<tr key={pension.id}>
							<td className="p-4 border-b border-blue-gray-50">
								<div className="flex items-center gap-3">
									<div className="flex flex-col">
										<p>{pension.seniors.first_name}</p>
										<p className="text-xs text-gray-600">{pension.seniors.username}</p>
									</div>
								</div>
							</td>
							<td className="p-4 border-b border-blue-gray-50">
								<div className="flex items-center gap-3">
									<div className="flex flex-col">
										<RequirementsModal
											imageUrl={pension.requirement}
											name={pension.seniors.first_name}
											title="View Requirements"
											subTitle="Requirements"
										/>
									</div>
								</div>
							</td>
							<td className="p-4 border-b">
								<div className="w-max">
									<div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none text-gray-600 py-1 px-2 text-sm rounded-md">
										<span className="">
											{new Date(pension.date_submitted).toLocaleDateString("en-US", {
												month: "short",
												day: "numeric",
												year: "numeric",
											})}
										</span>
									</div>
								</div>
							</td>
							<td className="p-4 border-b border-blue-gray-50">
								<div className="flex items-center gap-3">
									<div className="flex flex-col">
										<p className="block antialiased font-sans text-sm leading-normal text-red-600 font-bold">
											Notification Not Sent
										</p>
									</div>
								</div>
							</td>
							<td className="p-4 border-b border-blue-gray-50">
								<div className="flex items-center gap-3">
									<div className="flex flex-col">
										{pension.qr ? (
											<>
												<p className="text-xs">QR Code Available</p>
												<RequirementsModal
													imageUrl={pension.qr}
													name={pension.seniors.first_name}
													title="View QR"
													subTitle="QR Code"
												/>
											</>
										) : (
											<>
												<p className="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">
													No QR Code
												</p>
												<button
													onClick={() => handleGenerateQr(pension.id)}
													className="text-blue-700 font-bold text-sm">
													Generate QR Code
												</button>
											</>
										)}
									</div>
								</div>
							</td>
							<td className="p-4">
								<button
									onClick={() => handleSendNotification(pension.seniors.id)}
									className={`flex flex-col items-center select-none font-sans text-xs font-bold uppercase leading-normal tracking-normal rounded-lg ${
										pension.seniors.hasReceivedNotification ? "text-gray-400" : "text-red-600"
									}`}>
									{pension.seniors.hasReceivedNotification ? (
										<AlarmOnIcon className="text-gray-400" />
									) : (
										<NotificationsActiveIcon className="text-red-600" />
									)}
									<span className="block antialiased font-sans text-xs leading-normal">
										{pension.seniors.hasReceivedNotification ? "Notified" : "Notify"}
									</span>
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default PensionList;
