const timer = ms => new Promise(res => setTimeout(res, ms));

/**
 * @param {Node} node 
 */
function printTree(node) {
    node.childNodes.forEach(childNode => {
        if (childNode.nodeType === Node.TEXT_NODE) {
            var texts = childNode.textContent.split(/\s+/)
            for (var text of texts) {
                var element = document.createElement('span')
                element.innerText = text
                childNode.parentNode.appendChild(element)
                childNode.parentNode.appendChild(button())
            }
        } else {
            printTree(childNode)
        }
    })
}

function button() {
    var button = document.createElement("button")
    button.innerText = "o"
    button.style.color = "red"
    return button
}

// run function anytime new content loads somehow
(async function() {
    // await timer(10000)
    printTree(document.body)
})()
