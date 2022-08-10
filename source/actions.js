import API from '/source/api'

export default {
  user: {
    session: {
      validate: status => {
        API.env.dev.debug()
          .then(e => {
            if (status == 'unauthenticated' && e == 'false') window.location.replace('/')
          })
      }
    }
  }
}
