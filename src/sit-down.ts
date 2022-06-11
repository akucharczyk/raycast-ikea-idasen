import { Clipboard, showHUD, Toast } from '@raycast/api'
import { runAppleScript } from 'run-applescript'
import { isDeskControllerInstalled, sitDown } from './utils'

export default async function () {
  const toast = new Toast({
    title: 'Sit Down',
    style: Toast.Style.Animated,
  })

  toast.show()

  if (!(await isDeskControllerInstalled())) {
    toast.title = 'Desk Controller not installed'
    toast.message =
      'Install it from: https://github.com/DWilliames/idasen-controller/releases/latest/download/Desk.Controller.app.zip'
    toast.style = Toast.Style.Failure
    toast.primaryAction = {
      title: 'Copy Link',
      onAction: () => {
        Clipboard.copy(
          'https://github.com/DWilliames/idasen-controller/releases/latest/download/Desk.Controller.app.zip'
        )
      },
    }
    return
  }

  runAppleScript(sitDown)

  await showHUD('Moving desk to sit-down position')
}
