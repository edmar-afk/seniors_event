import SwapVertIcon from "@mui/icons-material/SwapVert";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import Tooltip from "@mui/material/Tooltip";
function SubmissionTable() {
	return (
		<>
			<div className="p-6 px-0 bg-white rounded-2xl shadow-2xl overflow-x-auto">
				<table className="mt-4 w-full table-auto text-left">
					<thead className="sticky top-0">
						<tr>
							<th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
								<p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
									Name
									<SwapVertIcon fontSize="small" />
								</p>
							</th>
							<th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
								<p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
									Requirements
									<SwapVertIcon fontSize="small" />
								</p>
							</th>
							<th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
								<p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
									QR Code
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
						<tr>
							<td className="p-4 border-b border-blue-gray-50">
								<div className="flex items-center gap-3">
									<div className="flex flex-col">
										<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
											Edmar Jay O. Heolin
										</p>
										<p className="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal opacity-70">
											09665616586
										</p>
									</div>
								</div>
							</td>
							<td className="p-4 border-b border-blue-gray-50">
								<div className="flex items-center gap-3">
									<div className="flex flex-col">
										<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
											sample.jpg
										</p>
										<p className="block antialiased font-sans text-sm leading-normal text-blue-900 font-bold opacity-70">
											View File
										</p>
									</div>
								</div>
							</td>
							<td className="p-4 border-b border-blue-gray-50">
								<div className="flex flex-col">
									<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
										Not yet Issued
									</p>
									<p className="block antialiased font-sans text-sm leading-normal text-blue-900 font-bold opacity-70">
										Generate QR Code
									</p>
								</div>
							</td>
							<td className="p-4 border-b border-blue-gray-50">
								<div className="w-max">
									<div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-orange-600 text-white py-1 px-2 text-xs rounded-md">
										<span className="">Notification Not Sent</span>
									</div>
								</div>
							</td>
							<td className="p-4 border-b border-blue-gray-50">
								<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
									Aug 11, 2024
								</p>
							</td>
							<td className="p-4 border-b border-blue-gray-50">
								<Tooltip
									title="Generate QR Code to Mr. Edmar Jay first"
									placement="left">
									<span>
										<button
											className="flex flex-col items-center select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
											type="button"
											disabled>
											<NotificationsActiveIcon /> Send Notification
										</button>
									</span>
								</Tooltip>
							</td>
						</tr>
						<tr>
							<td className="p-4 border-b border-blue-gray-50">
								<div className="flex items-center gap-3">
									<div className="flex flex-col">
										<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
											Edmar Jay O. Heolin
										</p>
										<p className="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal opacity-70">
											09665616586
										</p>
									</div>
								</div>
							</td>
							<td className="p-4 border-b border-blue-gray-50">
								<div className="flex items-center gap-3">
									<div className="flex flex-col">
										<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
											sample.jpg
										</p>
										<p className="block antialiased font-sans text-sm leading-normal text-blue-900 font-bold opacity-70">
											View File
										</p>
									</div>
								</div>
							</td>
							<td className="p-4 border-b border-blue-gray-50">
								<div className="flex flex-col">
									<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
										qrcode.jpg
									</p>
									<p className="block antialiased font-sans text-sm leading-normal text-blue-900 font-bold opacity-70">
										View
									</p>
								</div>
							</td>
							<td className="p-4 border-b border-blue-gray-50">
								<div className="w-max">
									<div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-600 py-1 px-2 text-xs rounded-md">
										<span className="">Notification Sent</span>
									</div>
								</div>
							</td>
							<td className="p-4 border-b border-blue-gray-50">
								<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
									Aug 11, 2024
								</p>
							</td>
							<td className="p-4 border-b border-blue-gray-50">
								<button
									className="flex flex-col items-center relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
									type="button"
									disabled>
									<AlarmOnIcon />
									Already Sent
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
}

export default SubmissionTable;
