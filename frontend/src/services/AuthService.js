import Swal from "sweetalert2";

const URL = process.env.VUE_APP_API;

export default async (isLoading, path, body, success, error) => {
  try {
    isLoading.value = true;
    console.log(URL);
    let response = await fetch(`${URL}/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Application: "application/json",
      },
      body: JSON.stringify(body),
    });
    let json = await response.json();
    isLoading.value = false;
    json.error ? error(json) : success(json);
  } catch (err) {
    isLoading.value = false;
    console.error(err);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.message,
    });
  }
};
