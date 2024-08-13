/* eslint-disable react/prop-types */
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ScheduleForm from "./ScheduleForm";

export default function ScheduleModal({ date }) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button onClick={handleOpen}>Add Schedule</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}>
				<Fade in={open}>
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-black shadow-lg p-4 w-11/12 sm:w-11/12 md:w-[50%] max-h-screen overflow-y-auto">
						<Typography
							id="transition-modal-title"
							variant="h6"
							component="h2">
							Set Schedule on {date}
						</Typography>
						<ScheduleForm date={date} />
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
