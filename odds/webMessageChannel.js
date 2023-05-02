class WebMessageChannel {
    constructor(onMessageCallback) {
        this.onMessageCallback = onMessageCallback;
        this.port = null;
        window.addEventListener('message', this.handleMessage.bind(this));
    }

    handleMessage(event) {
//        this.verifyDomain(event);

        if (event.data === 'init') {
            this.port = event.ports[0];
            this.port.onmessage = this.handlePortMessage.bind(this);
            this.port.start();
        } else {
            this.onMessageCallback(event.data, this.port);
        }
    }

    handlePortMessage(event) {

        this.onMessageCallback(event.data, this.port);
    }

    sendResponse(message, port) {
        if (port) {
            port.postMessage(message);
        }
    }

    sendMessage(message) {
        if (this.port) {
            this.port.postMessage(message);
        }
    }

    verifyDomain(event) {
        // Verify the origin of the incoming message
        if (event.origin !== 'https://yourdomain.com') {
            console.error('Invalid origin:', event.origin);
            return;
        }
    }
}
