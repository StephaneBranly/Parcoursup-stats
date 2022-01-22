export const openLink = (url: string) => {
    const win = window.open(url, '_blank')
    if (win) win.focus()
}
