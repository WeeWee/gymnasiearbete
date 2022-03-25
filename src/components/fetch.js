import firebase from "../firebase/clientapp";
import {
	getAuth,
	updateProfile,
	GoogleAuthProvider,
	GithubAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	sendPasswordResetEmail,
	signOut,
	initializeAuth,
} from "firebase/auth";
import {
	getFirestore,
	collection,
	addDoc,
	setDoc,
	getDoc,
	updateDoc,
	doc,
	deleteDoc,
	snapshotEqual,
} from "firebase/firestore";
const auth = getAuth(firebase);
const GetDoc = async () => {
	const docRef = doc(db, "users", auth.currentUser.uid);
	const snap = await getDoc(docRef);
	return snap.data();
};
const GetDataFromField = async (fieldName) => {
	if (auth.currentUser != null) {
		let data = null;
		await GetDoc().then(function (result) {
			data = result[fieldName];
		});
		return data;
	}
};
const GetDataFromProfile = async (fieldName) => {
	if (auth.currentUser != null) {
		let data = null;
		await GetDoc().then(function (result) {
			data = result["profilepage"][fieldName];
		});
		return data;
	}
};

export { GetDataFromProfile, GetDataFromField, auth };
