document.querySelector("#login-form").addEventListener("submit", (event) => {
	event.preventDefault();
	const email = document.querySelector("#email").value;
	const password = document.querySelector("#password").value;

	fetch("/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.success) {
				// If the login was successful, redirect the user to the home page
				window.location.replace("/");
			} else {
				// If the login was unsuccessful, show an error message
				document.querySelector("#error-message").textContent = data.message;
			}
		});
});
