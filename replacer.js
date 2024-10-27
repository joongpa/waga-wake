/**
 * @param {Node} node 
 */
function printTree(node) {
    node.childNodes.forEach(childNode => {
        childNode.parentElement.elementT
        if (isNodeText(childNode)) {
            if (childNode.parentElement.id.startsWith('parti-')) {
                return
            }

            var text = childNode.parentElement.innerHTML

            for (let i = text.length - 1; i >= 0; i--) {
                if (text[i] === "は") {
                    text = text.slice(0, i) + button("は") + text.slice(i + 1)
                } else if(text[i] === "が") {
                    text = text.slice(0, i) + button("が") + text.slice(i + 1)
                }
            }
            childNode.parentElement.innerHTML = text
        } else {
            printTree(childNode)
        }
    })
}

/**
 * 
 * @param {Node} node 
 */
function isNodeText(node) {
    return !node.hasChildNodes()
        && node.nodeType === Node.TEXT_NODE
        && !/[function|<|>]/.test(node.parentElement.innerHTML)
}

var globalCounter = 0

function button(answer) {
    var button = document.createElement("button")
    button.className = answer
    button.id = "parti-" + globalCounter
    button.innerText = "?"
    button.style.color = "white"
    button.style.backgroundColor = "grey"
    button.style.border = "none"
    button.style.borderRadius = "3px"
    globalCounter++
    return button.outerHTML
}

chrome.runtime.onMessage.addListener(() => {
    globalCounter = 0
    printTree(document.body)
    
    for (let i = 0; i < globalCounter; i++) {
        const id = "parti-" + i
        const button = document.getElementById(id)
        if (!button) continue

        button.onclick = e => {
            e?.preventDefault()
            button.outerHTML = button.className
        }
    }
});