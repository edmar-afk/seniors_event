import SwapVertIcon from "@mui/icons-material/SwapVert";import { useState, useEffect } from "react";import api from "../../assets/api";import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";function SeniorsTable() {
	const [seniors, setSeniors] = useState([]);

	useEffect(() => {
		api
			.get("/api/seniors/")
			.then((response) => {
				console.log(response.data); // Log the response data
				setSeniors(response.data);
			})
			.catch((error) => {
				console.error("There was an error fetching the seniors!", error);
			});
	}, []);

	// Filter out superusers
	const filteredSeniors = seniors.filter((senior) => !senior.user.is_superuser);

	return (
		<>
			<div className="p-6 px-0 bg-white rounded-2xl shadow-2xl overflow-x-auto">
				<table className="mt-4 w-full table-auto text-left">
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
									Mobile Number
								</p>
							</th>
							<th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
								<p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center gap-2 font-normal leading-none opacity-70">
									<SwapVertIcon fontSize="small" />
									Address
								</p>
							</th>

							<th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
								<p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center gap-2 font-normal leading-none opacity-70">
									<SwapVertIcon fontSize="small" />
									Date Registered
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
						{filteredSeniors.map((senior) => (
							<tr key={senior.id}>
								<td className="p-4 border-b border-blue-gray-50">
									<div className="flex items-center gap-3">
										<div className="flex flex-col">
											<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
												{senior.user.first_name}
											</p>
										</div>
									</div>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<div className="flex items-center gap-3">
										<div className="flex flex-col">
											<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
												{senior.mobile_num}
											</p>
										</div>
									</div>
								</td>
								<td className="p-4 border-b border-blue-gray-50">
									<div className="flex items-center gap-3">
										<div className="flex flex-col">
											<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
												{senior.user.last_name}
											</p>
										</div>
									</div>
								</td>
								<td className="p-4 border-b">
									<div className="w-max">
										<div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none text-gray-600 py-1 px-2 text-sm rounded-md">
											<span className="">
												{new Date(senior.user.date_joined).toLocaleDateString("en-US", {
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
										className="flex flex-row items-center select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-red-500 hover:scale-110 hover:shadow-2xl duration-300"
										type="button">
										<DeleteForeverOutlinedIcon className="mr-1" /> Remove
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default SeniorsTable;
