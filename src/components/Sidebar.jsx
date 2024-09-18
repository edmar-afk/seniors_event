/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import PublishIcon from "@mui/icons-material/Publish";
import ChecklistIcon from "@mui/icons-material/Checklist";
import logo from '../assets/img/logo.png';
function SideBar({ name, number, isOpen }) {
	const userData = JSON.parse(localStorage.getItem("userData"));

	return (
		<div
			id="Main"
			className={`fixed z-50 transform ${
				isOpen ? "translate-x-0" : "-translate-x-64"
			} ease-in-out transition-transform duration-300 flex justify-start items-start h-full w-64 bg-blue-900 flex-col shadow-2xl`}>
			<div className="flex justify-start p-6 items-center space-x-3">
				<img
					src={logo}
					alt="" className="w-12 rounded-full"
				/>
				<p className="text-lg leading-6 text-white">Seniors Pension</p>
			</div>
			<div className="mt-6 flex flex-col justify-start items-center pl-4 w-full space-y-3 pb-5">
				<div className="flex justify-start flex-col w-full md:w-auto items-start pb-1">
					{userData.is_superuser ? (
						<NavLink
							to="/admin-dashboard"
							className={({ isActive }) =>
								`flex justify-start items-center space-x-4 text-white py-2 w-52 ${
									isActive ? "bg-blue-700" : "hover:bg-blue-700"
								} rounded`
							}>
							<DashboardCustomizeOutlinedIcon />
							<p className="text-base leading-4">Dashboard</p>
						</NavLink>
					) : (
						<NavLink
							to="/seniors-dashboard"
							className={({ isActive }) =>
								`flex justify-start items-center space-x-4 text-white py-2 w-52 ${
									isActive ? "bg-blue-700" : "hover:bg-blue-700"
								} rounded`
							}>
							<DashboardCustomizeOutlinedIcon />
							<p className="text-base leading-4">Dashboard</p>
						</NavLink>
					)}
				</div>

				<div className="flex justify-start flex-col w-full md:w-auto items-start pb-1">
					<NavLink
						to="/profile"
						className={({ isActive }) =>
							`flex justify-start items-center space-x-4 text-white py-2 w-52 ${
								isActive ? "bg-blue-700" : "hover:bg-blue-700"
							} rounded`
						}>
						<AccountBoxOutlinedIcon />
						<p className="text-base leading-4">Profile</p>
					</NavLink>
				</div>
			</div>
			<div className="mt-6 flex flex-col justify-start items-center pl-4 w-full space-y-3 pb-5">
				<div className="text-left text-gray-300 flex justify-between items-center w-full py-5 space-x-14">
					<p className="text-xs leading-5 uppercase">Pension Release</p>
				</div>
				{userData.is_superuser && (
					<div className="flex justify-start flex-col w-full md:w-auto items-start pb-1">
						<NavLink
							to="/seniors-list"
							className={({ isActive }) =>
								`flex justify-start items-center space-x-4 text-white py-2 w-52 ${
									isActive ? "bg-blue-700" : "hover:bg-blue-700"
								} rounded`
							}>
							<ChecklistIcon />
							<p className="text-base leading-4">Seniors List</p>
						</NavLink>
					</div>
				)}
				{userData.is_superuser && (
					<div className="flex justify-start flex-col w-full md:w-auto items-start pb-1">
						<NavLink
							to="/scanner"
							className={({ isActive }) =>
								`flex justify-start items-center space-x-4 text-white py-2 w-52 ${
									isActive ? "bg-blue-700" : "hover:bg-blue-700"
								} rounded`
							}>
							<QrCodeScannerIcon />
							<p className="text-base leading-4">Scanner</p>
						</NavLink>
					</div>
				)}
				{userData.is_superuser ? (
					<div className="flex justify-start flex-col w-full md:w-auto items-start pb-1">
						<NavLink
							to="/submission"
							className={({ isActive }) =>
								`flex justify-start items-center space-x-4 text-white py-2 w-52 ${
									isActive ? "bg-blue-700" : "hover:bg-blue-700"
								} rounded`
							}>
							<PublishIcon />
							<p className="text-base leading-4">Submission</p>
						</NavLink>
					</div>
				) : (
					""
				)}
				<div className="flex justify-start flex-col w-full md:w-auto items-start pb-1">
					{userData.is_superuser ? (
						""
					) : (
						<>
							<NavLink
								to="/pension-status"
								className={({ isActive }) =>
									`flex justify-start items-center space-x-4 text-white py-2 w-52 ${
										isActive ? "bg-blue-700" : "hover:bg-blue-700"
									} rounded`
								}>
								<QueryStatsOutlinedIcon />
								<p className="text-base leading-4">Pension Status</p>
							</NavLink>
							<NavLink
								to="/file-submit"
								className={({ isActive }) =>
									`flex justify-start items-center space-x-4 text-white py-2 w-52 ${
										isActive ? "bg-blue-700" : "hover:bg-blue-700"
									} rounded`
								}>
								<QueryStatsOutlinedIcon />
								<p className="text-base leading-4">Submit Requirements</p>
							</NavLink>
						</>
					)}
				</div>
			</div>
			<div className="flex flex-col justify-end items-center h-full pb-6 pt-4 px-6 w-full space-y-32">
				<div className="flex justify-between items-center w-full">
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
	);
}

export default SideBar;
