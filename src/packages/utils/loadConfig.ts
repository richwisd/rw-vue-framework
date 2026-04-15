import { useAppConfigStore } from "../stores/appConfig";

export const loadConfig = async function () {
    const appConfig = useAppConfigStore()
    const appconfig = await appConfig.getFromRemote('');
    return { appconfig };
};
