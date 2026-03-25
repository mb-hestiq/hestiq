import { serverUrl } from "../../shared/company.js";

const backendUrl = process.env.LOCAL_SERVER || serverUrl;
export default backendUrl;