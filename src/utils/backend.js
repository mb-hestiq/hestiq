import { serverUrl } from "../../shared/company"

const backendUrl =  import.meta.env.VITE_LOCAL_SERVER || serverUrl;
export default backendUrl;