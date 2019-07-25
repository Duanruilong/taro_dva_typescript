import Taro from "@tarojs/taro";
import { node } from "_@types_prop-types@15.7.1@@types/prop-types";

/** 
 * 整合封装微信的原生弹窗
 * 提示、加载、工具类
*/

export default class Tips {
	static isLoading = false;

	/** 
	 * 提示信息
	*/
	static toast(title: string, onHide?: () => void) {
		Taro.showToast({
			title: title,
			icon: 'node',
			mask: true,
			duration: 1500
		});
		// 去除结束回调函数
		if (onHide) {
			setTimeout(() => {
				onHide();
			}, 500);
		}
	}

	/** 
	 * 加载提示弹窗
	*/

	static loding(title:'加载中',force = false){
		if (this.isLoading && !force) {
			return
		}

		this.isLoading = true;
		if (Taro.showLoading) {
			Taro.showLoading({
				title:title,
				mask:true
			})
		}else{
			Taro.showNavigationBarLoading() //导航条加载动画
		}
	}

	/** 
	 * 加载完成
	*/
	static loaded(){
		let duration = 0;
		if (this.isLoading) {
			this.isLoading = false;
			if (Taro.hideLoading) {
				Taro.hideLoading()
			} else {
				Taro.hideNavigationBarLoading(); //导航条加载动画
			}
			duration = 500;
		}
		// 设定隐藏的动画时长为500ms,防止直接toast时出现问题
		return new Promise(resolve => setTimeout(resolve,duration))
	}

	/** 
	 * 弹出提示框
	*/

	static success(title,duration = 1500){
		Taro.showToast({
			title: title,
			icon: 'success',
			duration: duration,
			mask:true
		})
		if (duration > 0) {
			return new Promise(resolve => setTimeout(resolve,duration))
		}
	}

}










