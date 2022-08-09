import axios from 'axios'

const emit = async (url, data) => (await axios.post('/api/' + url, data)).data

export default {
  user: {
    shift: {
      active: email => new Promise(async res => res(await emit('user/shift/active', {email}))),
      toggle: email => new Promise(async res => res(await emit('user/shift/toggle', {email}))),
      list: email => new Promise(async res => res(await emit('user/shift/list', {email}))),
      delete: id => new Promise(async res => res(await emit('user/shift/delete', {id}))),
    }
  }
}
