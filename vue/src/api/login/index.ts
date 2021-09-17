import request from '@/utils/request';

// 用户登录
export function loginIn(params: object) {
	return request({
		url: '/login',
		method: 'post',
		data: params,
	});
}
