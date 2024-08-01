/* eslint-disable react/no-unescaped-entities */ import bg from "../assets/img/bg.jpg";import { Link } from "react-router-dom";
function Homepage() {
	return (
		<>
			<section className="px-2 py-4 bg-white md:px-0 h-full">
				<div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
					<div className="flex flex-wrap items-center sm:-mx-3">
						<div className="w-full md:w-1/2 md:px-3">
							<div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
								<h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
									<span>Welcome to</span>
									<br />
									<span className="block text-indigo-600 text-4xl"> Senior Citizen Event Scheduling System.</span>
								</h1>
								<p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
									It's never been easier to build beautiful websites that convey your message and tell your story.
								</p>
								<div className="relative flex flex-col sm:flex-row sm:space-x-4">
									<p className="flex items-center w-full px-6 py-3 mb-3 text-lg text-indigo-600 rounded-md sm:mb-0 sm:w-auto">
										Start here
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-5 h-5 ml-1"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round">
											<line
												x1="5"
												y1="12"
												x2="19"
												y2="12"></line>
											<polyline points="12 5 19 12 12 19"></polyline>
										</svg>
									</p>
									<Link
										to={"/register"}
										className="flex items-center px-6 py-3 text-white bg-indigo-600 rounded-md hover:bg-indigo-800 hover:text-gray-100 hover:scale-110 hover:shadow-2xl duration-300">
										Register
									</Link>
								</div>
							</div>
						</div>
						<div className="w-full md:w-1/2">
							<div className="w-full h-auto overflow-hidden rounded-md sm:rounded-xl">
								<img src={bg} />
							</div>
						</div>
					</div>
				</div>

				<div className="text-center text-4xl mt-4">Schedule Calendar Below soon</div>
			</section>
		</>
	);
}

export default Homepage;
