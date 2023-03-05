import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

function LoginAuth0() {
	// auth0 login
	const { loginWithPopup } = useAuth0();

	// google login
	const googleAuth = () => {
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);
	};


	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Welcome to TradeByColors</h1>
			<div className={styles.form_container}>
				
				<div className={styles.right}>
					<button className={styles.btn} onClick={() => loginWithPopup({
						 redirectUri: 'http://localhost:3000/profile'
					})}>Log in with Auth0</button>

					<p className={styles.text}>or</p>
					<button className={styles.google_btn} onClick={googleAuth}>
						<img src="./images/google.png" alt="google icon" />
						<span>Sign in with Google</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default LoginAuth0;
