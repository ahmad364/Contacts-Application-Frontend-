
import axios from 'axios';
import FileDownload from 'js-file-download';

const baseUrl = "http://localhost:4000/api/";
const baseUrl1 = "http://localhost:3001/api/";
const csrf_token = 'jaf?lsajf#alskjf%aljdkf?klasf';
const headers = { 'Content-Type': 'application/json', 'csrf_token': csrf_token };
const fileHeaders = { 'csrf_token': csrf_token };
const options = { headers: headers, withCredentials: true };
const fileOptions = { headers: fileHeaders, responseType: "blob", withCredentials: true };

const getError = (error) => {

  if (error.response) {
    if (error.response.status === 500) {
      return { text: "Internal Server Error", error: error };
    } else if (error.response.status === 422) {
      return { text: "Cannot Process Please Try Again", error: error };
    } else if (error.response.status === 405) {
      return { text: "Not Found", error: error };
    } else if (error.response.status === 406) {
      return { text: "Already Exist", error: error };
    } else if (error.response.status === 404) {
      return { text: "API Not Found", error: error };
    } else if (error.response.status === 444) {
      return { text: "Invalid Data", error: error };
    } else if (error.response.status === 430) {
      return { text: error.response.data, error: error };
    } else if (error.response.status === 401) {
      return { text: error.response.data, error: error };
    }
    else {
      return { text: "Unkown Error", error: error };
    }
  } else {
    return { text: "No Internet Connection", error: error };
  }

}

const getResponse = (response, redirect) => {

  if (response.status === 202 && redirect === true) {
    window.location.replace(response.data);
  } else {
    return response;
  }

}

const ApiCallGet = (path, redirect = true) => {
  return axios.get(baseUrl + path, options)
    .then((response) => {
      return getResponse(response, redirect);
    })
    .catch((error) => {
      return getError(error);
    });

}

const ApiCallPost = (path, data, redirect = true) => {

  return axios.post(baseUrl + path, data, options)
    .then((response) => {
      return getResponse(response, redirect);
    })
    .catch((error) => {
      return getError(error);
    });

}

const ApiCallGetDownloadFile = async (path, filename) => {

  const Filedownloads = await ApiCallGetFile(path);
  FileDownload(Filedownloads.data, filename);

}

const ApiCallGetFile = (path, redirect = true) => {

  return axios.get(baseUrl + path, fileOptions, options)
    .then((response) => {
      return getResponse(response, redirect);
    })
    .catch((error) => {
      return getError(error);
    });

}

const LMSApiCallPost = (path, data, redirect = true) => {

  return axios.post(baseUrl1 + path, data, options)
    .then((response) => {
      return getResponse(response, redirect);
    })
    .catch((error) => {
      return getError(error);
    });

}


export { ApiCallGet, ApiCallPost, ApiCallGetFile, ApiCallGetDownloadFile };
