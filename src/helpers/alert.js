/* eslint-disable */
import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
export default function () {
  const { notify, dialog } = useQuasar()
  const notification = ({ ...params }) => {
    notify({
      type: params.type || params.color || 'negative',
      position: params.position || 'top-right',
      icon: params.icon || 'error',
      message: params.msg || 'Please fill in required fields!',
      multiLine: params.multiLine || false,
      actions: params.actions || [{ icon: 'close', color: 'white', handler: () => { console.log('wooow') } }]
    })
  }
  const showDialog =  ({ ...params }) => {
    return new Promise((resolve) => {
      const config = {
        title: params.title || 'Confirm',
        message: params.msg || '',
        html: true,
        textColor: 'grey-10',
        style: 'width: 470px !important;  max-width: 470px !important',
        cancel: {
          color: 'grey-5',
          textColor: 'gray-8',
          noCaps: true,
          flat: false,
          label: params.cancelLabel || 'Cancel',
          style: 'width: 100px !important;  max-width: 100px !important',
          unelevated: true
        },
        ok: {
          color: params.color || 'negative',
          noCaps: true,
          label: params.okLabel || 'Proceed',
          flat: false,
          style: 'width: 100px !important;  max-width: 100px !important',
          unelevated: true
        },
        persistent: true
      }
      // Will remove button cancel or ok
      if (!params.isCancel) delete config.cancel
      if (!params.isOk) delete config.ok
      dialog(config)
        .onOk(() => {
          resolve(true)
        })
        .onCancel(() => {
          resolve(false)
        })
        .onDismiss(() => {
          resolve(false)
        })
    })
  }
  return {
    api,
    notification,
    showDialog
  }
}
