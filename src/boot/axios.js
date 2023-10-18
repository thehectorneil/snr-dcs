import axios from 'axios'
import { authStore } from 'src/stores/auth'
import { commonStore } from 'src/stores/common'
import { useRouter } from 'vue-router'
import { Loading } from 'quasar'
export async function api ({ ...params }) {
  const router = useRouter()
  const auth = authStore()
  const common = commonStore()
  console.log(baseUrl(params.module || ''))
  try {
    if(params.loading) showLoading()
    const response = await axios({
      method: params.method || 'POST',
      data: params.data,
      params: params.param,
      baseURL: `${baseUrl(params.module || '')}${params.url}`,
      headers: params.hideHeaders ? {} : { Authorization: `Bearer ${auth.profile.token}` }
    })
    return { ok: true, data: response.data }
  } catch (error) {
    const statusCode = error.response.status
    if (statusCode === 401) destroyLocalStorage(router, params.url)
    if (statusCode === 403) {
      destroyLocalStorage(router)
      common.setDialog(true) // Will open dialog and will show message if user is not permitted or administrator changed the permissions
    }
    return { ok: false, error: error.response }
  } finally { Loading.hide() }
}
/**
  @status 401
  If the token is expired with status code 401 will destroy all storage data and redirect to login page
  @status 403
  If status code is 403, it means that the user has no permission to CRUD
  The user will redirect in the login page and will promp warning message
*/
const destroyLocalStorage = (router, url = '') => {
  const auth = authStore()
  if(url !== '/cms-service/user/login') {
    router.push('/admin/login')
    auth.setProfile({
      token: '',
      firstName: '',
      lastName: '',
      panelView: '',
      modules: []
    })
  }
}
/**
 * Microservices
 * Will identify the api to use
 * @param { String } module
 * @returns { Url }
 */
const baseUrl = (module = '') => {
  const env = process.env.ENV
  switch (module) {
    case 'dcs':
      return env === 'development'
        ? process.env.VUE_APP_DEV_DCS
        : env === 'staging'
          ? process.env.VUE_APP_STAGING_DCS
          : process.env.VUE_APP_PROD
    default:
      return env === 'development'
        ? process.env.VUE_APP_DEV_AP
        : env === 'staging'
          ? process.env.VUE_APP_STAGING_AP
          : process.env.VUE_APP_PROD
  }
}
/**
  Modal Loading will execute every api call
  Will only call if @param { params.loading } = true
 */
const showLoading = () => {
  Loading.show({
    html: true,
    message: `<p class="text-bold">Loading...</p> Please wait`,
    boxClass: 'bg-white text-grey-9',
    spinnerColor: 'primary'
  })
}
