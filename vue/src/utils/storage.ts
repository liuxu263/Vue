// 设置临时缓存
export function setSession(key: string, val: any) {
	window.sessionStorage.setItem(key, JSON.stringify(val));
}
// 获取临时缓存
export function getSession(key: string) {
	let json: any = window.sessionStorage.getItem(key);
	return JSON.parse(json);
}
// 移除临时缓存
export function removeSession(key: string) {
	window.sessionStorage.removeItem(key);
}
// 移除全部临时缓存
export function clearSession() {
	window.sessionStorage.clear();
}
