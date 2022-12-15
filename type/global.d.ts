interface Window {
  existLoading: boolean
  lazy: NodeJS.Timer
  unique: number
}

interface ApiResponse<T = any> {
  status: number
  data: T
  msg: string
  // time: number
}
interface anyObj {
  [key: string]: any
}
type BackendRouter=Array<{
  path:string;
  children:Array<string>
}>
type ApiPromise<T = any> = Promise<ApiResponse<T>>