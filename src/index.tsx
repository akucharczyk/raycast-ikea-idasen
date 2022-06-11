import { ActionPanel, List, closeMainWindow, Toast, Action, open } from '@raycast/api'
import { useEffect, useState } from 'react'
import { runAppleScript } from 'run-applescript'
import {
  appLink,
  BrowserIcon,
  fileDownload,
  isDeskControllerInstalled,
  sitDown,
  SitDownIcon,
  standUp,
  StandUpIcon,
} from './utils'

export default function Command() {
  const [isInstalled, setInstalled] = useState<boolean>(true)

  useEffect(() => {
    const getDektopControllerInstalledInfo = async () => {
      setInstalled(await isDeskControllerInstalled())
    }

    getDektopControllerInstalledInfo()
  }, [])

  const callAppleScript = async (script: string) => {
    const toast = new Toast({
      title: 'Something went wrong',
      style: Toast.Style.Animated,
    })

    try {
      if (!isInstalled) {
        toast.title = 'Desk Controller not installed'
        toast.message =
          'Install it from: https://github.com/DWilliames/idasen-controller/releases/latest/download/Desk.Controller.app.zip'
        toast.style = Toast.Style.Failure
        toast.primaryAction = {
          title: 'Download',
          onAction: () => {
            open(fileDownload)
            toast.hide()
          },
        }
        toast.secondaryAction = {
          title: 'Open in Browser',
          onAction: () => {
            open(appLink)
            toast.hide()
          },
        }
        toast.show()
        return
      }

      closeMainWindow()
      await runAppleScript(script)
    } catch (error) {
      toast.show()
    }
  }

  return (
    <List navigationTitle="Ikea Idasen">
      <List.Item
        icon={StandUpIcon}
        title="Stand Up"
        actions={
          <ActionPanel>
            <Action title="StandUp" onAction={() => callAppleScript(standUp)} />
          </ActionPanel>
        }
      />
      <List.Item
        icon={SitDownIcon}
        title="Sit Down"
        actions={
          <ActionPanel>
            <Action title="SitDown" onAction={() => callAppleScript(sitDown)} />
          </ActionPanel>
        }
      />
      <List.Item
        icon={SitDownIcon}
        title="Sit Down for 30 minutes"
        actions={
          <ActionPanel>
            <Action
              title="SitDown"
              onAction={() => {
                callAppleScript(sitDown)

                setTimeout(() => {
                  callAppleScript(standUp)
                }, 30 * 60 * 1000)
              }}
            />
          </ActionPanel>
        }
      />
      {!isInstalled && (
        <List.Item
          icon={BrowserIcon}
          title="Download app from github"
          actions={
            <ActionPanel>
              <Action.OpenInBrowser url="https://github.com/DWilliames/idasen-controller-mac" />
            </ActionPanel>
          }
        />
      )}
    </List>
  )
}
