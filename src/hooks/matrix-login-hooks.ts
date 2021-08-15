import useLocalStorage from "./useLocalStorage";

const useHomeserverUrl = () => useLocalStorage<string>("homeserverUrl", "");
const useAccessToken = () => useLocalStorage<string>("access_token", "");
const useDeviceId = () => useLocalStorage<string>("device_id", "");
const useUserId = () => useLocalStorage<string>("user_id", "");
export {
    useHomeserverUrl,
    useAccessToken,
    useDeviceId,
    useUserId
}
