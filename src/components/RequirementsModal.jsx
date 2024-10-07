/* eslint-disable react/no-unescaped-entities */ /* eslint-disable react/prop-types */ import * as React from "react";import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

export default function RequirementsModal({ imageUrl, name, title, subTitle }) {
	const [open, setOpen] = React.useState(false);
	const download = (e) => {
		e.preventDefault(); // Prevent the default anchor behavior

		console.log("Fetching image from:", e.target.href);

		fetch(e.target.href, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok.");
				}
				return response.arrayBuffer();
			})
			.then((buffer) => {
				console.log("ArrayBuffer received:", buffer);

				// Check if buffer is a valid ArrayBuffer
				if (buffer instanceof ArrayBuffer) {
					const blob = new Blob([buffer], { type: "image/png" }); // Specify MIME type
					const url = window.URL.createObjectURL(blob);

					const link = document.createElement("a");
					link.href = url;
					link.setAttribute("download", `${name}_${subTitle}.png`); // Dynamic filename
					document.body.appendChild(link);
					link.click();
					link.remove(); // Remove the link from the DOM
					URL.revokeObjectURL(url); // Clean up the object URL
				} else {
					throw new Error("Received data is not a valid ArrayBuffer.");
				}
			})
			.catch((err) => {
				console.error("Error fetching or processing image:", err);
			});
	};

	return (
		<React.Fragment>
			<p
				className="text-blue-600 font-semibold cursor-pointer"
				onClick={() => setOpen(true)}>
				{title}
			</p>
			<Modal
				aria-labelledby="modal-title"
				aria-describedby="modal-desc"
				size="lg"
				open={open}
				onClose={() => setOpen(false)}
				sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
				<Sheet
					variant="outlined"
					sx={{
						maxWidth: 1200,
						borderRadius: "lg",
						p: 3,
						boxShadow: "lg",
					}}>
					<ModalClose
						variant="plain"
						sx={{ m: 1 }}
					/>
					<Typography
						component="h2"
						id="modal-title"
						level="h4"
						textColor="inherit"
						fontWeight="lg"
						mb={1}>
						{name}'s {subTitle}
					</Typography>
					<div className="w-72 sm:w-96">
						<img
							src={imageUrl}
							alt=""
							className="max-w-full h-auto"
						/>
						<a
							href={imageUrl} // Use the provided image URL
							onClick={(e) => download(e)}
							className="flex w-fit justify-center mt-8 mx-auto bg-blue-600 hover:bg-blue-500 py-2 px-6 text-white rounded-full hover:scale-110 shadow-xl hover:shadow-2xl duration-300">
							<i className="fa fa-download mr-1" />
							<DownloadOutlinedIcon className="animate-pulse mr-1" /> Download
						</a>
					</div>
				</Sheet>
			</Modal>
		</React.Fragment>
	);
}
