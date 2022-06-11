import { getApplications } from '@raycast/api'

export async function isDeskControllerInstalled() {
  const applications = await getApplications()
  return applications.some(({ bundleId }) => bundleId === 'com.davidwilliames.Desk-Controller')
}

export const standUp = `
  tell application "Desk Controller"
    move "to-stand"
  end tell
`

export const sitDown = `
  tell application "Desk Controller"
    move "to-sit"
  end tell
`
