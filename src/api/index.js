import ajaxRequest from '../lib/request';
export const getTest = () => ajaxRequest.request({ url: '/test' });
export const login = (username) => ajaxRequest.request({ url: '/login', method: 'POST', data: { username } })
export const validate = () => ajaxRequest.request({ url: '/validate' })

export default {};
