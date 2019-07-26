/**
 * index.state 参数类型
 *
 * @export
 * @interface IndexState
 */
export interface IndexState {
    month:number,
    day:number,
}

/**
 * index.props 参数类型
 *
 * @export
 * @interface IndexProps
 */
export interface IndexProps {
    dispatch?: any,
    data?: Array<DataInterface>
}

export interface DataInterface {
    day:number,
    des:string,
    lunar:string,
    month:number,
    pic:string,
    title:string,
    year:number,
    _id:string
}
