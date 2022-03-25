import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	getRedirectResult,
	GoogleAuthProvider,
} from "firebase/auth";
import firebase from "../../firebase/clientapp";
import {useAuthState} from 'react-firebase-hooks/auth'
export default function Google() {
	const auth = getAuth(firebase);
	const provider = new GoogleAuthProvider();
	const [user] = useAuthState(auth);
	auth.useDeviceLanguage();
	signInWithRedirect(auth, provider);
	/* 		.then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			User = result.user;
			console.log(user);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			const email = error.email;
			const credential = GoogleAuthProvider.credentialFromError(error);
		});
 */
	auth.onAuthStateChanged((user) => {
		if (user) {
			window.location = "/";
			console.log(user);
		}
	});
	return <div></div>;
}
