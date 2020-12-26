import App from './App.svelte';
import firebase from "firebase/app";

var config = {
	apiKey: 'AIzaSyADi8T3x8uB52tUBFtYPrnHlAA9kuuFLBg',
	authDomain: "dream-gallery-cf32a.firebaseapp.com",
	databaseURL: "https://dream-gallery-cf32a.firebaseio.com",
	projectId: "dream-gallery-cf32a",
	storageBucket: "dream-gallery-cf32a.appspot.com",
	messagingSenderId: "1015813923361"
};

firebase.initializeApp(config);

const app = new App({
	target: document.body,
});

export default app;