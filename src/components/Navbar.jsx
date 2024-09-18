import AppBar from "@mui/material/AppBar";import Box from "@mui/material/Box";import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import logo from '../assets/img/logo.png'
export default function NavBar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{
							flexGrow: 1,
							ml: 2,
							position: "sticky",
							display: "flex",
							alignItems: "center",
							
						}}>
						<Link
							to={"/"}
							style={{ display: "flex", alignItems: "center" }}>
							<img
								src={logo}
								alt="Logo"
								className="rounded-full w-8 h-8"
								style={{ marginRight: "8px" }} // Adjust margin if needed
							/>
							DSWD Pension Release
						</Link>
					</Typography>

					<Button color="inherit">
						<Link to={"/login"}>Login</Link>
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
