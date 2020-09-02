import { request } from '../../utils/http'

export function example (data) {
  return request({
    url: '/user/example',
    method: 'post',
    data
  })
}
