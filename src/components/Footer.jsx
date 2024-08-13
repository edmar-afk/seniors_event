function Footer() {
	return (
		<>
			<footer className="bg-transparent mt-8 mb-3 ">
				<div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
					<span className="text-sm text-gray-500 sm:text-center flex">
						@ 2024 <p className="hover:underline ml-1"> DSWD</p>
					</span>
					<ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
						<li>
							<p className="hover:underline">Lakewood, Zamboanga del Sur</p>
						</li>
					</ul>
				</div>
			</footer>
		</>
	);
}

export default Footer;
