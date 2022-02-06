'use strict';

class Message {
    static body = document.querySelector('body');

    static step = 2;

    static topMargin = 0;

    static delayForAssignigHidingClass = 3000;

    static goTopDelay = 3000;

    static marginDataAttribute = 'data-top-margin';

    static MESSAGE_TYPES = {
        ADDED_PRODUCT: 'AddMessage',
        DELETED_PRODUCT: 'DeleteMessage',
        COUNT_INCREMENT: 'CountIncrementMessage',
        COUNT_DECREMENT: 'CountDecrementMessage',
    }

    static MESSAGE_DATA = {
        AddMessage: {
            createMessage: (product) => `${product.title.text} добавлено в корнизу`,
            class: 'added-product-message'
        },
        DeleteMessage: {
            createMessage: (product) => `${product.title.text} удалено из корзины`,
            class: 'deleted-product-message'
        },
        CountIncrementMessage: {
            createMessage: (product) => `Количество ${product.title.text} в корзине увеличено`,
            class: 'count-increment-product-message'
        },
        CountDecrementMessage: {
            createMessage: (product) => `Количество ${product.title.text} в корзине уменьшено`,
            class: 'count-decrement-product-message'
        },
    }

    static showMessage(product, messageType) {
        const messageData = Message.MESSAGE_DATA[messageType];
        if (!messageData) {
            return;
        }
        const messageContainer = document.createElement('div');
        messageContainer.classList.add(messageData.class);

        const messageText = document.createElement('div');
        messageText.innerHTML = messageData.createMessage(product);

        messageContainer.appendChild(messageText);

        Message.setEvents(messageContainer);

        Message.body.appendChild(messageContainer);
    }

    static setEvents(messageContainer) {
        Message.setMessageMargin(messageContainer, Message.topMargin);

        messageContainer.classList.add('message');

        messageContainer.addEventListener('click', (event) => {
            const message = event.target;
            
            message.classList.add('hide');
        });

        setTimeout(() => {
            messageContainer.classList.add('message-hidden');
            setTimeout(Message.moveMessagesToTop, Message.goTopDelay);
        }, Message.delayForAssignigHidingClass);

        Message.topMargin += Message.step;
    }

    static moveMessagesToTop() {
        document.querySelectorAll('.message').forEach((element) => {
            let savedMargin = Number(element.getAttribute(Message.marginDataAttribute));
            if (!isNaN(savedMargin) && savedMargin > 0) {
                savedMargin -= Message.step;
                Message.setMessageMargin(element, savedMargin);
            }
        });
        Message.topMargin -= Message.step;
    }

    static setMessageMargin(messageContainer, margin) {
        messageContainer.style = `top: ${margin}em;`;
        messageContainer.setAttribute(Message.marginDataAttribute, margin);
    }
}