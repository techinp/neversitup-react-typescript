enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const fetcher = async (
  endpoint: string,
  method: METHOD,
  { body = {}, query = '', credentials = true } = {}
) => {
  let url = process.env.REACT_APP_API_URL + `/${endpoint}`;

  if (query) url = `${url}/${query}`;

  let headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (credentials) {
    headers = {
      ...headers,
      authorization: `Bearer ${window.localStorage.getItem('token')}`,
    };
  }

  let options: RequestInit = {
    method,
    headers,
  };

  console.log('Object.keys(body).length :', Object.keys(body).length);
  if (Object.keys(body).length) {
    options = {
      ...options,
      body: JSON.stringify(body),
    };
  }

  console.log('options :', options);
  const data = await fetch(url, options);
  return await data.json();
};

export { fetcher, METHOD };
