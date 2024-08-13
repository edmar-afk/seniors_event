/* eslint-disable react/prop-types */import { useState } from "react";import api from "../../assets/api";import { format } from "date-fns";
function ScheduleForm({ date }) {
	const [description, setDescription] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		// Ensure the date string is in the correct format for Django's DateField
		const formattedMonth = format(date, "yyyy-MM-dd"); // Format date to "YYYY-MM-DD"

		// Format the start and end times to include only the time part
		const formattedStartDatetime = format(new Date(`1970-01-01T${startDate}:00`), "HH:mm:ss");
		const formattedEndDatetime = format(new Date(`1970-01-01T${endDate}:00`), "HH:mm:ss");

		try {
			const response = await api.post("/api/schedules/", {
				description,
				month: formattedMonth,
				startDatetime: formattedStartDatetime,
				endDatetime: formattedEndDatetime,
			});

			if (response.status === 201) {
				console.log("Schedule created successfully");
				// Refresh the page after successful submission
				window.location.reload();
			} else {
				console.error("Failed to create schedule");
				// Handle error
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};


	return (
		<div className="flex items-center justify-center p-1 sm:p-12">
			<div className="mx-auto w-full bg-white">
				<form onSubmit={handleSubmit}>
					<div className="mb-5">
						<label
							htmlFor="description"
							className="mb-3 block text-base font-medium text-[#07074D]">
							Description
						</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							name="description"
							id="description"
							required
							placeholder="Input your description about this date"
							className="w-full rounded-md border border-gray-200 bg-white py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-blue-700 focus:shadow-md"
						/>
					</div>

					<div className="-mx-3 flex flex-wrap">
						<div className="w-full px-3 sm:w-1/2">
							<div className="mb-5">
								<label
									htmlFor="startDate"
									className="mb-3 block text-base font-medium text-[#07074D]">
									Time Started
								</label>
								<input
									type="time"
									value={startDate}
									onChange={(e) => setStartDate(e.target.value)}
									name="startDate"
									id="startDate"
									required
									className="w-full rounded-md border border-gray-200 bg-white py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-blue-700 focus:shadow-md"
								/>
							</div>
						</div>
						<div className="w-full px-3 sm:w-1/2">
							<div className="mb-5">
								<label
									htmlFor="endDate"
									className="mb-3 block text-base font-medium text-[#07074D]">
									Time Ends
								</label>
								<input
									type="time"
									value={endDate}
									onChange={(e) => setEndDate(e.target.value)}
									name="endDate"
									id="endDate"
									required
									className="w-full rounded-md border border-gray-200 bg-white py-3 px-6 text-base font-medium text-gray-600 outline-none focus:border-blue-700 focus:shadow-md"
								/>
							</div>
						</div>
					</div>

					<div className="flex flex-row">
						<button
							type="submit"
							className="hover:shadow-form w-fit mx-1 sm:mx-2 rounded-md bg-blue-700 py-3 px-8 text-center text-base font-semibold text-white outline-none hover:bg-blue-500 hover:scale-110 hover:shadow-2xl duration-300">
							Set Schedule
						</button>
						<button
							type="button"
							className="hover:shadow-form w-fit mx-1 sm:mx-2 rounded-md bg-red-700 py-3 px-8 text-center text-base font-semibold text-white outline-none hover:bg-red-500 hover:scale-110 hover:shadow-2xl duration-300">
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ScheduleForm;
