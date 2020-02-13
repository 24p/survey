type TUriComponent = string | number | boolean;

type TSerializableDictionary = Readonly<{
    [key in string]?: TUriComponent;
}>;

type TRequestBodyContainer =
    Readonly<{
        json: true;
        body: any,
    }>
    |
    Readonly<{
        json: false;
        body: TSerializableDictionary,
    }>;

type THttpMethod = 'GET' | 'POST';

export type TAbortForwarder = (abortFunction: () => void) => void;

export type TRequestOptions = Readonly<{
    abortForwarder?: TAbortForwarder,
    headers?: ReadonlyArray<[string, string]>,
}>;

const buildUriEncodedPair = (key: string, value: TUriComponent): string => {
    const encodedKey = encodeURIComponent(key);
    const encodedData = encodeURIComponent(value);

    return `${encodedKey}=${encodedData}`;
};

const convertToQuery = (data: TSerializableDictionary): string =>
    Object.entries(data)
        .map(([key, value]) => buildUriEncodedPair(key, value!))
        .join('&');

const enhanceUrl = (method: THttpMethod, url: string, requestQuery?: TSerializableDictionary) => {
    if (method !== 'GET' || requestQuery === undefined) {
        return url;
    }

    return `?${convertToQuery(requestQuery)}`;
};

const createRequest = <RESPONSE_BODY>(
    method: THttpMethod,
    url: string,
    requestQuery?: TSerializableDictionary,
    bodyContainer?: TRequestBodyContainer,
    options?: TRequestOptions,
): Promise<RESPONSE_BODY> => new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.withCredentials = false;

    const mappedUrl = enhanceUrl(method, url, requestQuery);

    request.addEventListener('load', () => {
        const { response, status }: { response: string, status: number } = request;
        const isSuccess = status < 400;

        if (isSuccess) {
            try {
                const json = JSON.parse(response);

                if (json.error) {
                    throw new Error(json.error);
                }

                resolve(json as RESPONSE_BODY);
            } catch (error) {
                reject(error);
            }
        }

        reject(new Error(`[XHR] [${method}] [${status}] Received http error: ${url}`));
    });

    request.addEventListener('error', () => {
        reject(new Error(`[XHR] [${method}] Error while fetching: ${url}`));
    });

    request.open(method, mappedUrl);

    options?.headers?.forEach((header: any) => request.setRequestHeader(header[0], header[1]));

    if (method === 'GET') {
        return request.send();
    }

    if (bodyContainer?.json === true) {
        request.setRequestHeader('Content-Type', 'application/json');

        try {
            request.send(JSON.stringify(bodyContainer?.body));
        } catch {
            reject(new Error(`[XHR] [${method}] Error while serializing JSON body for: ${url}`));
        }

        return;
    }

    if (bodyContainer?.json === false) {
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send(convertToQuery(bodyContainer?.body));

        return;
    }

    reject(new Error(`[XHR] [${method}] Configuration error with ${url}`));
});

export const get = <RESPONSE_BODY>(
    url: string,
    query?: TSerializableDictionary,
    options?: TRequestOptions,
): Promise<RESPONSE_BODY> => createRequest('GET', url, query, undefined, options);

export const post = <RESPONSE_BODY>(
    url: string,
    bodyContainer: TRequestBodyContainer,
    options?: TRequestOptions,
): Promise<RESPONSE_BODY> => createRequest('POST', url, undefined, bodyContainer, options );
