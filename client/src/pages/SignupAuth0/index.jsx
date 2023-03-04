import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

function SignupAuth0() {
	// signup with auth0
	const { loginWithRedirect } = useAuth0();

	// signup with google
	const googleAuth = () => {
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Sign up with redirect</h1>
			<div className={styles.form_container}>
				
				<div className={styles.right}>
					<button className={styles.btn} onClick={() => loginWithRedirect()}>Sign Up</button>
					<p className={styles.text}>or</p>
					<button className={styles.google_btn} onClick={googleAuth}>
						<img src="./images/google.png" alt="google icon" />
						<span>Sign up with Google</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default SignupAuth0;
