import { ActionPanel, List, closeMainWindow, Toast, Action, Clipboard } from '@raycast/api'
import { useEffect, useState } from 'react'
import { runAppleScript } from 'run-applescript'
import { isDeskControllerInstalled, sitDown, standUp } from './utils'

const StandUpIcon =
  'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NCIgaGVpZ2h0PSI0NCIgZmlsbD0iI2ZmZmZmZiIgY2xhc3M9ImJpIGJpLWFycm93LXVwLXNxdWFyZSIgdmlld0JveD0iMCAwIDE2IDE2IiBpZD0iaWNvbi1hcnJvdy11cC1zcXVhcmUtMTciPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE1IDJhMSAxIDAgMCAwLTEtMUgyYTEgMSAwIDAgMC0xIDF2MTJhMSAxIDAgMCAwIDEgMWgxMmExIDEgMCAwIDAgMS0xVjJ6TTAgMmEyIDIgMCAwIDEgMi0yaDEyYTIgMiAwIDAgMSAyIDJ2MTJhMiAyIDAgMCAxLTIgMkgyYTIgMiAwIDAgMS0yLTJWMnptOC41IDkuNWEuNS41IDAgMCAxLTEgMFY1LjcwN0w1LjM1NCA3Ljg1NGEuNS41IDAgMSAxLS43MDgtLjcwOGwzLTNhLjUuNSAwIDAgMSAuNzA4IDBsMyAzYS41LjUgMCAwIDEtLjcwOC43MDhMOC41IDUuNzA3VjExLjV6Ij48L3BhdGg+PC9zdmc+'
const SitDownIcon =
  'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NCIgaGVpZ2h0PSI0NCIgZmlsbD0iI2ZmZmZmZiIgY2xhc3M9ImJpIGJpLWFycm93LWRvd24tc3F1YXJlIiB2aWV3Qm94PSIwIDAgMTYgMTYiIGlkPSJpY29uLWFycm93LWRvd24tc3F1YXJlLTE2Ij48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNSAyYTEgMSAwIDAgMC0xLTFIMmExIDEgMCAwIDAtMSAxdjEyYTEgMSAwIDAgMCAxIDFoMTJhMSAxIDAgMCAwIDEtMVYyek0wIDJhMiAyIDAgMCAxIDItMmgxMmEyIDIgMCAwIDEgMiAydjEyYTIgMiAwIDAgMS0yIDJIMmEyIDIgMCAwIDEtMi0yVjJ6bTguNSAyLjVhLjUuNSAwIDAgMC0xIDB2NS43OTNMNS4zNTQgOC4xNDZhLjUuNSAwIDEgMC0uNzA4LjcwOGwzIDNhLjUuNSAwIDAgMCAuNzA4IDBsMy0zYS41LjUgMCAwIDAtLjcwOC0uNzA4TDguNSAxMC4yOTNWNC41eiI+PC9wYXRoPjwvc3ZnPg=='
const BrowserIcon =
  'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLWJyb3dzZXIiIHdpZHRoPSI0NCIgaGVpZ2h0PSI0NCIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZT0iI2ZmZmZmZiIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBpZD0iaWNvbi1icm93c2VyLTUiPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIHN0cm9rZT0ibm9uZSI+PC9wYXRoPjxyZWN0IHg9IjQiIHk9IjQiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcng9IjEiPjwvcmVjdD48cGF0aCBkPSJNNCA4aDE2TTggNHY0Ij48L3BhdGg+PC9zdmc+'

export default function Command () {
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
          title: 'Copy Link',
          onAction: () => {
            Clipboard.copy(
              'https://github.com/DWilliames/idasen-controller/releases/latest/download/Desk.Controller.app.zip'
            )
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
      {!isInstalled &&
        <List.Item
          icon={BrowserIcon}
          title="Download app from github"
          actions={
            <ActionPanel>
              <Action.OpenInBrowser
                url="https://github.com/DWilliames/idasen-controller-mac"
              />
            </ActionPanel>
          }
        />
      }
    </List>
  )
}
