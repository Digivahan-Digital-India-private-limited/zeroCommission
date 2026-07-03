const fetch = globalThis.fetch;

function getTargetPath(pathname) {
  const match = pathname.match(/^\/(?:\.netlify\/functions\/proxy-nextpay|api\/proxy-nextpay)(\/.*)?$/);
  return match?.[1] || '/';
}

function getRequestBody(event) {
  if (!event.body) return undefined;
  if (event.isBase64Encoded) {
    return Buffer.from(event.body, 'base64');
  }
  return event.body;
}

function getForwardHeaders(headers = {}) {
  const forwarded = { ...headers };
  delete forwarded.host;
  delete forwarded.connection;
  delete forwarded['content-length'];
  delete forwarded['transfer-encoding'];
  return forwarded;
}

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Refresh-Token, X-Requested-With',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: '',
    };
  }

  const { path, httpMethod, headers, queryStringParameters } = event;
  const targetPath = getTargetPath(path || '/');
  const targetUrl = `https://nextpayindia.com${targetPath}${queryStringParameters && Object.keys(queryStringParameters).length ? `?${new URLSearchParams(queryStringParameters).toString()}` : ''}`;

  const requestInit = {
    method: httpMethod,
    headers: {
      ...getForwardHeaders(headers),
      host: 'nextpayindia.com',
      'x-forwarded-host': headers?.host || 'zerocommission.netlify.app',
    },
  };

  const body = getRequestBody(event);
  if (body !== undefined && !['GET', 'HEAD'].includes(httpMethod.toUpperCase())) {
    requestInit.body = body;
  }

  try {
    const response = await fetch(targetUrl, requestInit);
    const responseText = await response.text();

    return {
      statusCode: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Refresh-Token, X-Requested-With',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': response.headers.get('content-type') || 'application/json',
      },
      body: responseText,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Refresh-Token, X-Requested-With',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: false, message: error.message || 'Proxy request failed' }),
    };
  }
};
