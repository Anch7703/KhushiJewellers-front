// auth/authApi.js
export const authRequest = async (url, body, showNotification) => {
  try {
    const response = await fetch(url, {
      method: "POST", // default POST, you can change later if needed
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      if (showNotification) showNotification(data.message || "Success!", "success");
      return data; // return data for further use (token, user info, etc.)
    } else {
      if (showNotification) showNotification(data.message || "Something went wrong!", "error");
      return null;
    }
  } catch (error) {
    if (showNotification) showNotification("Server error! Try again later.", "error");
    console.error(error);
    return null;
  }
};
