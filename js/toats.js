const toast = document.getElementById('toasts')
const types = [
    'success',
    'error'
]
function createToast(message = "Error", type = 'error') {
    let properties

    const notif = document.createElement('div')
    const notifIcon = document.createElement('span')
    const notificationType = type ? type : types[0]

    properties = setProperties(notificationType)

    notif.classList.add('toast')
    notif.classList.add(notificationType)

    notifIcon.classList.add(properties[0])
    notifIcon.classList.add(properties[1])

    notif.innerText = message;

    toast.appendChild(notif)
    notif.append(notifIcon)

    setTimeout(() => {
        notif.remove()
    }, 3000)
}

function setProperties(notificationType) {
    let propertyList

    switch (notificationType) {
        case 'error':
            propertyList = ['fas', 'fa-exclamation-circle', 1]
            break
        case 'success':
            propertyList = ['fas', 'fa-check-circle', 2]
            break
    }

    return propertyList;
}