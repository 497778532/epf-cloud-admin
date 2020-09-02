import { request } from '../../utils/http'

export function example2 (data) {
  return request({
    url: '/user/example2',
    method: 'get',
    data
  })
}
