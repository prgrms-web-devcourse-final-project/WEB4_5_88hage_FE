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
    credentials: 'include',
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
      // 401(Unauthorized)이면 throw하지 않고 null 반환
      if (response.status === 401) {
        return null;
      }
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
    // 네트워크 에러, 예외 등은 throw (401은 위에서 처리됨)
    console.error('Fetch error:', error);
    throw error;
  }
};

// Helper functions for common HTTP methods
export const get = async <T>(
  endpoint: string,
  config?: FetchOptions,
): Promise<T | null> => {
  return (await fetchInstance(endpoint, { ...config, method: 'GET' })) as T | null;
};

export const post = async <T>(
  endpoint: string,
  data: FormData | object | null,
  config?: FetchOptions,
): Promise<T | null> => {
  return (await fetchInstance(endpoint, {
    ...config,
    method: 'POST',
    data,
  })) as T | null;
};

export const put = async <T>(
  endpoint: string,
  data: FormData | object | null,
  config?: FetchOptions,
): Promise<T | null> => {
  return (await fetchInstance(endpoint, {
    ...config,
    method: 'PUT',
    data,
  })) as T | null;
};

export const patch = async <T>(
  endpoint: string,
  data: object | null,
  config?: FetchOptions,
): Promise<T | null> => {
  return (await fetchInstance(endpoint, {
    ...config,
    method: 'PATCH',
    data,
  })) as T | null;
};

export const del = async (
  endpoint: string,
  config?: FetchOptions,
): Promise<void> => {
  await fetchInstance(endpoint, { ...config, method: 'DELETE' });
};

export default fetchInstance;