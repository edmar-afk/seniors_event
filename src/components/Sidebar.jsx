/* eslint-disable react/prop-types */
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ElderlyOutlinedIcon from "@mui/icons-material/ElderlyOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
function SideBar({ name, number, isOpen }) {
	return (
		<>
			<div
				id="Main"
				className={`fixed z-50 transform ${
					isOpen ? "translate-x-0" : "-translate-x-64" // Adjust the translate value if needed
				} ease-in-out transition-transform duration-300 flex justify-start items-start h-full w-64 bg-blue-900 flex-col shadow-2xl`}>
				<div className="flex justify-start p-6 items-center space-x-3">
					<ElderlyOutlinedIcon
						sx={{ fontSize: 50 }}
						className="text-white border-2 p-2 rounded-full"
					/>
					<p className="text-lg leading-6 text-white">Seniors Pension</p>
				</div>
				<div className="mt-6 flex flex-col justify-start items-center  pl-4 w-full space-y-3 pb-5 ">
					<div className="flex justify-start flex-col w-full md:w-auto items-start pb-1 ">
						<button className="flex justify-start items-center space-x-4 text-white hover:bg-blue-700 rounded py-2 w-52">
							<DashboardCustomizeOutlinedIcon />
							<p className="text-base leading-4">Dashboard</p>
						</button>
					</div>
					<div className="flex justify-start flex-col w-full md:w-auto items-start pb-1 ">
						<button className="flex justify-start items-center space-x-4 text-white hover:bg-blue-700 rounded py-2 w-52">
							<AccountBoxOutlinedIcon />
							<p className="text-base leading-4">Profile</p>
						</button>
					</div>
				</div>
				<div className="mt-6 flex flex-col justify-start items-center  pl-4 w-full space-y-3 pb-5 ">
					<div className="text-left text-gray-300 flex justify-between items-center w-full py-5 space-x-14  ">
						<p className="text-xs leading-5  uppercase">Pension Release</p>
					</div>
					<div className="flex justify-start flex-col w-full md:w-auto items-start pb-1 ">
						<button className="flex justify-start items-center space-x-4 text-white hover:bg-blue-700 rounded py-2 w-52">
							<CalendarMonthOutlinedIcon />
							<p className="text-base leading-4">Calendar</p>
						</button>
					</div>
					<div className="flex justify-start flex-col w-full md:w-auto items-start pb-1 ">
						<button className="flex justify-start items-center space-x-4 text-white hover:bg-blue-700 rounded py-2 w-52">
							<QueryStatsOutlinedIcon />
							<p className="text-base leading-4">Pension Status</p>
						</button>
					</div>
				</div>
				<div className="flex flex-col justify-end items-center h-full pb-6 pt-4  px-6 w-full space-y-32">
					<div className=" flex justify-between items-center w-full">
						<div className="flex justify-center items-center space-x-2">
							<AccountCircleOutlinedIcon
								fontSize="large"
								className="text-white"
							/>
							<div className="flex justify-start flex-col items-start">
								<p className="cursor-pointer text-sm leading-5 text-white">{name}</p>
								<p className="cursor-pointer text-xs leading-3 text-gray-300">{number}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default SideBar;
