import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { updatePassword } from "firebase/auth";
import { useContext, useState, useRef } from "react";
import { AuthContext } from "../../components/auth";
import Circleloader from "../../components/circleloader";
import SettingsPage from "../../components/settings";

const Security = () => {
	const { currentUser, loading, UpdateFireBase, UpdateField } =
		useContext(AuthContext);
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, SetShowPassword] = useState(false);
	const [error, setError] = useState(false);
	const newPassRef = useRef();
	const confPassRef = useRef();
	const ShowPasswordToggle = (e) => {
		e.preventDefault();
		SetShowPassword(!showPassword);
	};
	const SaveFunction = (e, user, password, newPassword, confirmPassword) => {
		e.preventDefault();
		if (password != "" && confirmPassword != "" && newPassword != "") {
			if (newPassword == confirmPassword) {
				updatePassword(user, newPassword).then((res) => {
					setOldPassword("");
					setNewPassword("");
					setConfirmPassword("");
				});
			} else {
				newPassRef.current.className =
					" rounded-lg max-w-xs w-52 pr-2 mt-2 shadow border border-red-600";
				confPassRef.current.className =
					" rounded-lg max-w-xs w-52 pr-2 mt-2 shadow border border-red-600";
				setNewPassword("");
				setConfirmPassword("");

				newPassRef.current.children[0].focus();
				setError(true);
			}
		}
	};
	if (currentUser && !currentUser.emailVerified) {
		return (
			<div className="pt-20 flex flex-col items-center justify-center">
				{" "}
				<h1>Verify your email before you can change your settings</h1>{" "}
			</div>
		);
	}
	if (loading) {
		return (
			<div className="pt-20 flex flex-col items-center justify-center">
				{" "}
				<h1 className="text-3xl">
					{" "}
					<Circleloader />{" "}
				</h1>{" "}
			</div>
		);
	}
	if (currentUser && currentUser.emailVerified) {
		return (
			<div className=" h-full grid grid-cols-5 md:grid-cols-4 w-screen overflow-hidden md:overflow-y-auto">
				<SettingsPage />
				<div
					/* style={{ scrollPaddingTop: "80px" }} */
					className="h-full pt-16 w-auto col-start-3 col-span-3 md:col-start-2 md:col-span-3 text-left overflow-hidden"
				>
					<div className="mr-5 pr-2 mt-5">
						<h1 className="text-2xl font-bold">Security</h1>
						<div>
							<h1 className="text-lg font-medium  ">Profile</h1>
							<p className="text-base text-gray-500">information.. </p>
						</div>
						<div className="flex flex-col pr-8 pt-4">
							<h1 className="font-semibold">Change Password</h1>
							<form autoComplete="off">
								<div className="flex border border-gray-200 rounded-lg max-w-xs w-52 pr-2 mt-2 shadow">
									<input
										className="pl-2 w-44 text-black rounded-lg outline-none"
										type={showPassword ? "text" : "password"}
										placeholder="old password"
										value={oldPassword}
										autoComplete="current-password"
										onChange={(e) => {
											e.preventDefault();

											setOldPassword(e.currentTarget.value);
										}}
									/>
									<button
										type="submit"
										className=""
										onClick={(e) => ShowPasswordToggle(e)}
									>
										<EyeIcon
											className={showPassword ? "w-4 h-4 hidden" : "w-4 h-4 "}
										/>
										<EyeOffIcon
											className={showPassword ? "w-4 h-4 " : "w-4 h-4 hidden"}
										/>
									</button>
								</div>
								<div
									ref={newPassRef}
									className="border border-gray-200 rounded-lg max-w-xs w-52 pr-2 mt-2 shadow"
								>
									<input
										className="pl-2 w-48 text-black rounded-lg outline-none"
										type={showPassword ? "text" : "password"}
										placeholder="new password"
										autoComplete="new-password"
										value={newPassword}
										onChange={(e) => {
											e.preventDefault();
											newPassRef.current.className =
												"border border-gray-200 rounded-lg max-w-xs w-52 pr-2 mt-2 shadow";
											setError(false);
											setNewPassword(e.currentTarget.value);
										}}
									/>
								</div>
								<div
									ref={confPassRef}
									className="border border-gray-200 rounded-lg max-w-xs w-52 pr-2 mt-2 shadow"
								>
									<input
										className="pl-2 w-48 text-black rounded-lg outline-none"
										type={showPassword ? "text" : "password"}
										placeholder="confirm password"
										autoComplete="new-password"
										value={confirmPassword}
										ref={confPassRef}
										onChange={(e) => {
											e.preventDefault();
											confPassRef.current.className =
												"border border-gray-200 rounded-lg max-w-xs w-52 pr-2 mt-2 shadow";
											setConfirmPassword(e.currentTarget.value);
										}}
									/>
								</div>
							</form>
							<span
								className={
									error
										? "text-center w-52 text-sm text-gray-800 font-semibold"
										: "hidden"
								}
							>
								Wrong password!
							</span>
						</div>
						<div className="flex space-x-4 pt-4 w-full justify-end mb-2 md:pr-16 ">
							{/* <p className="text-xs justify-center items-center flex">
								Not saved
							</p> */}
							<button className="border border-gray-300 rounded-lg w-16 text-center flex flex-col shadow ">
								<span className="px-2">Cancel</span>
							</button>
							<button
								onClick={(e) => {
									SaveFunction(
										e,
										currentUser,
										oldPassword,
										newPassword,
										confirmPassword
									);
								}}
								className=" bg-blue-500 text-white rounded-lg w-16 text-center flex flex-col shadow "
							>
								<span className="px-2">Save</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default Security;
