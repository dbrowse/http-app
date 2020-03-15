import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";
import logService from "./logService";

//Unxpected (network down, server down, db down, bug)
//Log them
//DIsplay generic and friendly error message
//interceptor can be succes or error. In this case we don't need c
axios.interceptors.response.use(null, error => {
	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;
	if (!expectedError) {
		logger.log(error);
		//toast is function in JS are object
		toast.error("An unexpected error occured.");
	}
	return Promise.reject(error);
});

export default {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete
};
