/* eslint-disable react/prop-types */ import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import { Link } from "react-router-dom";
function Topbar({ isSidebarOpen, toggleSidebar }) {
	return (
		<>
			<div
				onClick={toggleSidebar}
				className={`${
					isSidebarOpen ? "absolute" : "hidden" // Adjust the translate value if needed
				} w-screen h-screen absolute lg:hidden bg-gray-800/60 z-40`}></div>
			<div className="fixed top-0 bg-gray-300 border-2 border-b-gray-100 shadow-xl w-full z-[45]">
				<div className="ml-4 lg:ml-72 py-4 flex flex-row items-center justify-between ease-in-out transition-transform duration-300">
					{isSidebarOpen ? (
						<MenuOpenOutlinedIcon
							fontSize="large"
							className={`text-blue-800 cursor-pointer ease-in-out transition-transform duration-300 ${
								isSidebarOpen ? "translate-x-0" : "translate-x-0 lg:-translate-x-64" // Adjust the translate value if needed
							} `}
							onClick={toggleSidebar}
						/>
					) : (
						<MenuOutlinedIcon
							fontSize="large"
							className={`text-blue-800 cursor-pointer ease-in-out transition-transform duration-300 ${
								isSidebarOpen ? "translate-x-0" : "translate-x-0 lg:-translate-x-64" // Adjust the translate value if needed
							} `}
							onClick={toggleSidebar}
						/>
					)}
					<Link
						to={"/logout"}
						className="mr-12">
						Logout
					</Link>
				</div>
			</div>
		</>
	);
}

export default Topbar;
