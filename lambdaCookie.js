'use strict';

exports.handler = async (event) => {
    const request = event.Records[0].cf.request;
    const headers = request.headers;

    const cookieName = 'unique-visitor';
    const existingCookie = headers.cookie && headers.cookie.find(c => c.value.includes(cookieName));

    // If cookie is already set, return as-is
    if (existingCookie) {
        return request;
    }

   
    const response = {
        status: '200',
        statusDescription: 'OK',
        headers: {
            'set-cookie': [{
                key: 'Set-Cookie',
                value: `${cookieName}=${Date.now()}; Path=/; Secure; HttpOnly; Max-Age=31536000`
            }],
            'cache-control': [{ key: 'Cache-Control', value: 'no-cache' }],
            'content-type': [{ key: 'Content-Type', value: 'text/html' }]
        },
        body: `<html><body><script>window.location.reload();</script></body></html>`
    };

    return response;
};
