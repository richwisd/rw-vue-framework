import { isClient, isIOS } from '@vueuse/core'

export const isFirefox = (): boolean =>
  isClient && /firefox/i.test(window.navigator.userAgent)

export const loadScript = (src: string, options: {
  async?: boolean,
  charset?: string,
  type?: string,
  defer?: boolean,
} = {}) => {
  const { async = true, type = 'text/javascript', defer = true } = options
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.type = type;
    script.async = async
    script.defer = defer
    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      reject();
    };
    document.body.appendChild(script);
  });
};

export { isClient, isIOS }
