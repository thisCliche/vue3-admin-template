import axios from '@/utils/axios'
enum routeUrl{
  login = "/v1/sys/login",
}

export function login(data:Record<string, any>):ApiPromise {
  return axios({
    url: routeUrl.login,
    method: 'post',
    headers:{
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: data
  })
}

// export function login(data:Record<string, any>):Promise<any> {
//   return axios({
//     url: routeUrl.login,
//     method: 'get',
//     params: data
//   })
// }