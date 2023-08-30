enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const fetcher = async (
  endpoint: string,
  method: METHOD,
  { body = {}, query = '', credentials = true }
) => {
  let url = process.env.REACT_APP_API_URL + `/${endpoint}`;

  if (query) url = `${url}/${query}`;

  let headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (credentials) {
    headers = {
      ...headers,
      authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
    };
  }

  const data = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  });
  return await data.json();
};

export { fetcher, METHOD };
