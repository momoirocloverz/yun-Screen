import axios from "./http.js";

export const get_play_url = (name) => {
    return axios.post(
        "http://195.195.10.47:9999/dahua/?name=" + name
    );
}



