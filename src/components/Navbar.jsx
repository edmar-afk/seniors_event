import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
export default function NavBar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, ml: 2, position: "sticky" }}>
						<Link to={"/"}>DSWD Pension Release</Link>
					</Typography>
					<Button color="inherit">
						<Link to={"/login"}>Login</Link>
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
