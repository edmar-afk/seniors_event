/* eslint-disable react/no-unescaped-entities */ /* eslint-disable react/prop-types */ import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

export default function RequirementsModal({ imageUrl, name }) {
	const [open, setOpen] = React.useState(false);
	return (
		<React.Fragment>
			<p
				className="text-blue-600 font-semibold cursor-pointer"
				onClick={() => setOpen(true)}>
				View Requirement
			</p>
			<Modal
				aria-labelledby="modal-title"
				aria-describedby="modal-desc"
				open={open}
				onClose={() => setOpen(false)}
				sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
				<Sheet
					variant="outlined"
					sx={{
						maxWidth: 700,
						borderRadius: "md",
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
						{name}'s Requirement
					</Typography>
					<Typography
						id="modal-desc"
						textColor="text.tertiary">
						<img
							src={imageUrl}
							alt=""
						/>
					</Typography>
				</Sheet>
			</Modal>
		</React.Fragment>
	);
}
