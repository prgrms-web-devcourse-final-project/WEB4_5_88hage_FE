const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchOptions extends RequestInit {
  data?: FormData | object | null;
}

const fetchInstance = async (
  endpoint: string,
  { data, headers: customHeaders, ...customConfig }: FetchOptions = {},
) => {
  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    credentials: 'include', // 쿠키 자동 포함
    ...customConfig,
  };

  if (data instanceof FormData) {
    config.body = data;
    config.headers = {
      ...customHeaders,
    };
  } else if (data !== undefined && data !== null) {
    config.body = JSON.stringify(data);
    config.headers = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };
  } else {
    config.headers = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };
  }

  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: '알 수 없는 오류가 발생했습니다.' }));
      throw errorData;
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return null; // JSON이 아닌 경우 null 반환
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

// Helper functions for common HTTP methods
export const get = async <T>(
  endpoint: string,
  config?: FetchOptions,
): Promise<T> => {
  return fetchInstance(endpoint, { ...config, method: 'GET' }) as Promise<T>;
};

export const post = async <T>(
  endpoint: string,
  data: FormData | object | null,
  config?: FetchOptions,
): Promise<T> => {
  return fetchInstance(endpoint, {
    ...config,
    method: 'POST',
    data,
  }) as Promise<T>;
};

export const put = async <T>(
  endpoint: string,
  data: FormData | object | null,
  config?: FetchOptions,
): Promise<T> => {
  return fetchInstance(endpoint, {
    ...config,
    method: 'PUT',
    data,
  }) as Promise<T>;
};

export const patch = async <T>(
  endpoint: string,
  data: object | null,
  config?: FetchOptions,
): Promise<T> => {
  return fetchInstance(endpoint, {
    ...config,
    method: 'PATCH',
    data,
  }) as Promise<T>;
};

export const del = async (
  endpoint: string,
  config?: FetchOptions,
): Promise<void> => {
  await fetchInstance(endpoint, { ...config, method: 'DELETE' });
};

export default fetchInstance;
