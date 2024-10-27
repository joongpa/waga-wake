const activator = document.getElementById("activator")
activator.onclick = async () => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    await chrome.tabs.sendMessage(tab.id, {});
}