/* eslint-disable react/no-unescaped-entities */ import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bg from "../assets/img/bg.jpg";
function Register() {
	return (
		<>
			<div className="font-[sans-serif] bg-white">
				<div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
					<div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
						<div>
							<img
								src={bg}
								className="hidden sm:block"
								alt=""
							/>
						</div>

						<form className="max-w-md md:ml-auto w-full -mt-16 sm:mt-0">
							<motion.h3
								className="text-gray-800 text-3xl font-extrabold mb-8"
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 180, bounce: 0.5 }}>
								Register your Account
							</motion.h3>

							<div className="space-y-4">
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ type: "spring", stiffness: 180, bounce: 0.5, delay: 0.1 }}>
									<input
										name="fullName"
										type="text"
										required
										className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
										placeholder="You Full Name"
									/>
								</motion.div>
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ type: "spring", stiffness: 180, bounce: 0.5, delay: 0.15 }}>
									<input
										name="number"
										type="number"
										autoComplete="number"
										required
										className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
										placeholder="Mobile Number"
									/>
								</motion.div>

								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ type: "spring", stiffness: 180, bounce: 0.5, delay: 0.2 }}>
									<input
										name="password"
										type="password"
										required
										className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
										placeholder="Password"
									/>
								</motion.div>
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ type: "spring", stiffness: 180, bounce: 0.5, delay: 0.25 }}>
									<input
										name="password2"
										type="password"
										required
										className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
										placeholder="Retype Password"
									/>
								</motion.div>
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ type: "spring", stiffness: 180, bounce: 0.5, delay: 0.3 }}
									className="flex flex-wrap items-center justify-between gap-4">
									<motion.div
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{ type: "spring", stiffness: 180, bounce: 0.5, delay: 0.35 }}
										className="text-sm">
										<a
											href="jajvascript:void(0);"
											className="text-blue-600 hover:text-blue-500 font-semibold">
											Forgot your password?
										</a>
									</motion.div>
								</motion.div>
							</div>

							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 180, bounce: 0.5, delay: 0.4 }}
								className="!mt-8">
								<button
									type="submit"
									className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
									Register
								</button>
							</motion.div>
							<motion.p
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 180, bounce: 0.5, delay: 0.45 }}
								className="text-sm mt-12 text-gray-800">
								Already have account?{" "}
								<Link
									to={"/login"}
									className="text-blue-600 font-semibold hover:underline ml-1">
									Login here
								</Link>
							</motion.p>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default Register;
