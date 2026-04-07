import { useAppConfigStore } from "@rw-vue-framework/stores/appConfig";

export const loadConfig = async function () {
    const appConfig = useAppConfigStore()
    const appconfig = await appConfig.getFromRemote('');
    return { appconfig };
};
