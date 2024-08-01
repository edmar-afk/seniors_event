import { useState } from "react";import EventCalendar from "../components/seniors/EventCalendar";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function SeniorsDashboard() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const userData = JSON.parse(localStorage.getItem("userData"));
	const userId = userData?.id; // Adjust according to how your user data structure

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<>
			<Sidebar
				name={userData.first_name}
				number={userData.username}
				isOpen={isSidebarOpen}
			/>
			<Topbar
				isSidebarOpen={isSidebarOpen}
				toggleSidebar={toggleSidebar}
			/>
			<div className={`transition-all duration-300 ${isSidebarOpen ? "ml-2 lg:ml-72" : "ml-2 lg:ml-14"} pt-24`}>
				s
				<EventCalendar />
			</div>
		</>
	);
}

export default SeniorsDashboard;
