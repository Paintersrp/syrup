export default function handleApiError(error) {
  if (error.response) {
    const { status, data } = error.response;
    const errorMessage = `API Error ${status}: ${data.message}`;
    throw new Error(errorMessage);
  } else if (error.request) {
    throw new Error("Network error. Please try again later.");
  } else {
    throw new Error("An error occurred. Please try again later.");
  }
}
