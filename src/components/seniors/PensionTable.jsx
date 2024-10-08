import SwapVertIcon from "@mui/icons-material/SwapVert";import { useState, useEffect, useMemo } from "react";import api from "../../assets/api";import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";import RequirementsModal from "../RequirementsModal";import Swal from "sweetalert2";import withReactContent from "sweetalert2-react-content";const MySwal = withReactContent(Swal);

function PensionTable() {
	const [pensions, setPensions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const userData = useMemo(() => JSON.parse(localStorage.getItem("userData")), []);

	useEffect(() => {
		if (userData && userData.id) {
			api
				.get(`/api/pensions/user/${userData.id}/`)
				.then((response) => {
					setPensions(response.data);
					setLoading(false);
				})
				.catch((error) => {
					console.error("There was an error fetching the pensions!", error);
					setError("There was an error fetching the pensions.");
					setLoading(false);
				});
		} else {
			setLoading(false);
		}
	}, [userData]);

	const handleDelete = (pensionId) => {
		MySwal.fire({
			title: "Are you sure?",
			text: "Withdrawing the pension you believe has an error. You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				api
					.delete(`/api/delete-pension/${pensionId}/`)
					.then(() => {
						MySwal.fire("Deleted!", "Your pension has been deleted.", "success");
						setPensions(pensions.filter((pension) => pension.id !== pensionId));
					})
					.catch((error) => {
						console.error("There was an error deleting the pension!", error);
						MySwal.fire("Error!", "There was an error deleting the pension.", "error");
					});
			}
		});
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div className="p-6 px-0 bg-white rounded-2xl shadow-2xl overflow-x-auto">
			<table className="w-full table-auto text-left">
				<thead className="sticky top-0">
					<tr>
						<th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
							<p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
								Picture of Grantee <br /> with Calendar
								<SwapVertIcon fontSize="small" />
							</p>
						</th>
						<th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
							<p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
								Senior ID
								<SwapVertIcon fontSize="small" />
							</p>
						</th>
						<th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
							<p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
								Authorization Letter
								<SwapVertIcon fontSize="small" />
							</p>
						</th>
						<th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
							<p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
								Status
								<SwapVertIcon fontSize="small" />
							</p>
						</th>
						<th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
							<p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
								QR Code Availability
								<SwapVertIcon fontSize="small" />
							</p>
						</th>
						<th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
							<p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
								Date Submitted
								<SwapVertIcon fontSize="small" />
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
										<RequirementsModal
											imageUrl={pension.requirement}
											name={pension.seniors.first_name}
											title="View Requirements"
											subTitle="Requirements"
										/>
									</div>
								</div>
							</td>
							<td className="p-4 border-b border-blue-gray-50">
								<div className="flex items-center gap-3">
									<div className="flex flex-col">
										<RequirementsModal
											imageUrl={pension.requirement1}
											name={pension.seniors.first_name}
											title="View Requirements"
											subTitle="Requirements"
										/>
									</div>
								</div>
							</td>
							<td className="p-4 border-b border-blue-gray-50">
								<div className="flex items-center gap-3">
									<div className="flex flex-col">
										<RequirementsModal
											imageUrl={pension.requirement2}
											name={pension.seniors.first_name}
											title="View Requirements"
											subTitle="Requirements"
										/>
									</div>
								</div>
							</td>
							<td className="p-4 border-b border-blue-gray-50">
								<div className="flex items-center gap-3">
									<div className="flex flex-col">
										<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
											{pension.status}
										</p>
									</div>
								</div>
							</td>
							<td className="p-4 border-b border-blue-gray-50">
								<div className="flex items-center gap-3">
									<div className="flex flex-col">
										{pension.qr ? (
											<>
												<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
													{pension.qr.split("/").pop()} {/* Extract filename */}
												</p>
												<RequirementsModal
													imageUrl={pension.qr}
													name={pension.seniors.first_name}
													title="View QR"
													subTitle="QR Code"
												/>
											</>
										) : (
											<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
												Not yet Issued
											</p>
										)}
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
							<td className="p-4">
								<button
									onClick={() => handleDelete(pension.id)}
									className="flex flex-row items-center select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-red-500 hover:scale-110 hover:shadow-2xl duration-300"
									type="button">
									<DeleteForeverOutlinedIcon className="mr-1" /> Withdraw
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default PensionTable;
