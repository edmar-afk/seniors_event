/* eslint-disable react/no-unescaped-entities */ import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bg from "../assets/img/bg.jpg";
import api from "../assets/api";
import Swal from "sweetalert2";

function Register() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		fullName: "",
		number: "",
		password: "",
		password2: "",
	});
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.password !== formData.password2) {
			setError("Passwords do not match");
			return;
		}
		setLoading(true);
		setError("");
		try {
			const response = await api.post("/api/register/", {
				username: formData.number,
				first_name: formData.fullName,
				mobile_num: formData.number,
				password: formData.password,
			});
			if (response.status === 201) {
				let timerInterval;
				Swal.fire({
					icon: "success",
					title: "Registration successful!",
					html: "Redirecting to login in <b></b> seconds.",
					timer: 4000,
					timerProgressBar: true,
					didOpen: () => {
						const timer = Swal.getPopup().querySelector("b");
						timerInterval = setInterval(() => {
							timer.textContent = `${Math.ceil(Swal.getTimerLeft() / 1000)}`;
						}, 100);
					},
					willClose: () => {
						clearInterval(timerInterval);
					},
				}).then((result) => {
					if (result.dismiss === Swal.DismissReason.timer) {
						navigate("/login");
					}
				});
			}
		} catch (error) {
			if (error.response && error.response.data) {
				const errorMsg = Object.values(error.response.data).join(" ");
				setError(errorMsg);
			} else {
				setError("There was an error registering the user!");
			}
			console.error(error);
		}
		setLoading(false);
	};

	return (
		<>
			<div className="font-[sans-serif] bg-white">
				<div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
					<div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
						<div>
							<img
								src={bg}
								className="hidden sm:block"
								alt=""
							/>
						</div>

						<form
							className="max-w-md md:ml-auto w-full -mt-16 sm:mt-0"
							onSubmit={handleSubmit}>
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
										placeholder="Your Full Name"
										value={formData.fullName}
										onChange={handleChange}
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
										value={formData.number}
										onChange={handleChange}
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
										value={formData.password}
										onChange={handleChange}
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
										value={formData.password2}
										onChange={handleChange}
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
										<a className="text-blue-600 hover:text-blue-500 font-semibold">Forgot your password?</a>
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
									className={`w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white ${
										loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
									} focus:outline-none`}
									disabled={loading}>
									{loading ? (
										<div className="flex items-center justify-center">
											<svg
												className="animate-spin h-5 w-5 mr-3 text-white"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24">
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"></circle>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
											</svg>
											Validating...
										</div>
									) : (
										"Register"
									)}
								</button>
								{error && <p className="mt-4 text-red-600">{error}</p>}
							</motion.div>
							<motion.p
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 180, bounce: 0.5, delay: 0.45 }}
								className="text-sm mt-12 text-gray-800">
								Already have an account?{" "}
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
