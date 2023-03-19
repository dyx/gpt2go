import { ChatCompletionRequestMessageRoleEnum } from 'openai/api'

export function downloadFile(url: string, filename: string) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function str2ChatCompletionRequestMessageRoleEnum(str: string) {
  if (str === 'system') {
    return ChatCompletionRequestMessageRoleEnum.System
  } else if (str === 'user') {
    return ChatCompletionRequestMessageRoleEnum.User
  } else if (str === 'assistant') {
    return ChatCompletionRequestMessageRoleEnum.Assistant
  }
  return ChatCompletionRequestMessageRoleEnum.User
}

export function generateCopyButton(codeContent: string) {
  const panelElement = document.createElement('div')
  panelElement.className = 'button-panel'

  const copyButtonElement = document.createElement('div')
  copyButtonElement.innerText = 'copy'
  copyButtonElement.className = 'copy-button'
  panelElement.append(copyButtonElement)

  const copiedButtonElement = document.createElement('div')
  copiedButtonElement.innerText = 'copied'
  copiedButtonElement.className = 'copied-button'
  copiedButtonElement.style.display = 'none'
  panelElement.append(copiedButtonElement)

  copyButtonElement.addEventListener('click', function (e) {
    console.log('click')
    const copiedButton = (e.target as HTMLDivElement).nextElementSibling as HTMLDivElement
    copiedButton.style.display = ''
    navigator.clipboard.writeText(codeContent)
    setTimeout(() => {
      copiedButton.style.display = 'none'
    }, 2500)
  })
  return panelElement
}
