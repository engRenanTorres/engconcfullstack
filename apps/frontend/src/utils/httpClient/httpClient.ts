export type HttpClientResponse = {
  ok: boolean;
  body: object;
};

type FetchOptions<T> = Omit<RequestInit, 'body'> & {
  body: T;
};

export async function HttpClient<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  fetchOptions: FetchOptions<T> = {} as FetchOptions<T>,
  authorization?: string
): Promise<HttpClientResponse> {
  const defaultHeaders = fetchOptions.headers || {};
  return fetch(url, {
    ...fetchOptions,
    method,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      ...defaultHeaders,
      Authorization: authorization ? `Bearer ${authorization}` : '',
    },
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null,
  }).then(async (response) => {
    return {
      ok: response.ok,
      body: await response.json(),
    };
  });
}

export async function HttpClientGet(
  url: string,
  fetchOptions: RequestInit = {},
  authorization?: string
): Promise<HttpClientResponse> {
  const defaultHeaders = fetchOptions.headers || {};
  return fetch(url, {
    ...fetchOptions,
    method: 'GET',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      ...defaultHeaders,
      Authorization: authorization ? `Bearer ${authorization}` : '',
    },
  }).then(async (response) => {
    return {
      ok: response.ok,
      body: await response.json(),
    } as HttpClientResponse;
  });
}
