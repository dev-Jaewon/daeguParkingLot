export const delayApi = async<T>(api: Promise<T>, delayTime: number): Promise<T> => {
    const delay = new Promise(resolve => setTimeout(resolve, delayTime));

    const [resultApi] = await Promise.all([api, delay]);

    return resultApi;
}