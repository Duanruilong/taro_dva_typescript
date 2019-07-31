// import Taro from '@tarojs/taro';
import * as indexApi from './service';

export default {
  namespace: 'index',
  state: {
    data:[],
    v:'1.0',
  },

  effects: {
    *getList({ payload },{select, call, put}){
      const { error, result} = yield call(indexApi.getList,{
        ...payload
      })
      console.log('数据接口返回',result);
      
      if (!error) {
        yield put({
          type: 'save',
          payload: {
            data:result.data
          },
        })
      }
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  }

}
