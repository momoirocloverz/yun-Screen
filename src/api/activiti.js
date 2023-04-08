import axios from "./http.js";
import common from './common';
export const getLocalData = url => axios.get(url);

//流程资源id 拼接
export const get = params =>
    axios.get(
        common.xswlIp +
        `workflow/cmd/v1/definition/07a9a156-c1ed-11ec-95dc-84ef187d0d9c`
    );

//流程实例id 拼接
export const getDefinitions = params =>
    axios.get(
        common.xswlIp +
        `workflow/cmd/v1/definition/getDefinitions/80b0a12b-dca0-11ec-9ada-989096aec582`
    );
//流程实例id 拼接
export const gethighLine = params =>
    axios.get(
        common.xswlIp +
        `workflow/cmd/v1/history/80b0a12b-dca0-11ec-9ada-989096aec582`
    );