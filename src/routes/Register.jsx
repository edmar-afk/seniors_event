/* eslint-disable react/no-unescaped-entities */import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bg from "../assets/img/bg.jpg";
import api from "../assets/api";
import Swal from "sweetalert2";

function Register() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [validationError, setValidationError] = useState({
		fullName: "",
		number: "",
		address: "",
		password: "",
		password2: "",
	});
	const [formData, setFormData] = useState({ fullName: "", number: "", address: "", password: "", password2: "" });
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === "number") {
			setFormData({
				...formData,
				[name]: value,
			});

			// Validate number field
			const isValid = /^09\d{9}$/.test(value);
			if (value === "" || isValid) {
				setValidationError({
					...validationError,
					number: "",
				});
			} else {
				setValidationError({
					...validationError,
					number: "Invalid mobile number. Must start with 09 and be 11 digits long.",
				});
			}
		} else if (name === "address") {
			setFormData({
				...formData,
				[name]: value,
			});
		} else if (name === "password") {
			setFormData({
				...formData,
				[name]: value,
			});

			// Validate password
			if (value.length < 6) {
				setValidationError({
					...validationError,
					password: "Password must be at least 6 characters long.",
				});
			} else {
				setValidationError({
					...validationError,
					password: "",
				});
			}
		} else if (name === "password2") {
			setFormData({
				...formData,
				[name]: value,
			});

			// Validate password2
			if (value !== formData.password) {
				setValidationError({
					...validationError,
					password2: "Passwords do not match.",
				});
			} else {
				setValidationError({
					...validationError,
					password2: "",
				});
			}
		} else {
			setFormData({
				...formData,
				[name]: value,
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.password !== formData.password2) {
			setValidationError({
				...validationError,
				password2: "Passwords do not match.",
			});
			return;
		}
		setLoading(true);
		setError("");
		try {
			const response = await api.post("/api/register/", {
				username: formData.number,
				first_name: formData.fullName,
				last_name: formData.address, // Make sure address is passed as last_name
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

	const isFormInvalid = () => {
		return (
			Object.values(validationError).some((msg) => msg.length > 0) ||
			!formData.fullName ||
			!formData.number ||
			!formData.address || // Ensure address is included
			!formData.password ||
			!formData.password2
		);
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
									{validationError.fullName && <p className="text-red-600 mt-2">{validationError.fullName}</p>}
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
									{validationError.number && <p className="text-red-600 mt-2">{validationError.number}</p>}
								</motion.div>
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ type: "spring", stiffness: 180, bounce: 0.5, delay: 0.15 }}>
									<select
										id="address"
										name="address"
										className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
										value={formData.address}
										onChange={handleChange}
										required>
										<option
											value=""
											disabled>
											Choose a Barangay
										</option>
										<option value="Bululawan">Bululawan</option>
										<option value="Poblacion Lakewood">Poblacion Lakewood</option>
										<option value="Baking">Baking</option>
										<option value="Biswangan">Biswangan</option>
										<option value="Lukuan">Lukuan</option>
										<option value="Kahayag">Kahayag</option>
									</select>
									{validationError.address && <p className="text-red-600 mt-2">{validationError.address}</p>}
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
									{validationError.password && <p className="text-red-600 mt-2">{validationError.password}</p>}
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
										placeholder="Confirm Password"
										value={formData.password2}
										onChange={handleChange}
									/>
									{validationError.password2 && <p className="text-red-600 mt-2">{validationError.password2}</p>}
								</motion.div>

								<div className="pt-2">
									<button
										type="submit"
										disabled={loading || isFormInvalid()}
										className="bg-blue-600 text-sm w-full py-3.5 rounded-md text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
										{loading ? "Registering..." : "Register"}
									</button>
								</div>

								{error && <p className="text-red-600 text-center text-sm mt-4">{error}</p>}
							</div>

							<div className="text-center mt-8">
								<p className="text-sm">
									Already have an account?{" "}
									<Link
										to="/login"
										className="font-medium text-blue-600 hover:underline">
										Login
									</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default Register;
