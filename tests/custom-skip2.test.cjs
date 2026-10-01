const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');

// Execute the creative's actual inline JavaScript with lightweight DOM/bridge doubles.
// These test click and keyboard contracts; real TalkBack/WebView QA is still required.
function loadCreative({ withHoppr = true } = {}) {
    const messages = [];
    const timers = [];
    const elements = new Map();
    for (const id of ['sad-button', 'skip-button', 'happy-button', 'button-container', 'qrcode']) {
        const element = new EventTarget();
        const classes = new Set(id === 'skip-button' ? ['selected'] : []);
        element.style = { display: '' };
        element.classList = {
            add: name => classes.add(name),
            remove: name => classes.delete(name),
            contains: name => classes.has(name),
        };
        element.click = () => element.dispatchEvent(new Event('click', { cancelable: true }));
        elements.set(id, element);
    }
    const window = new EventTarget();
    const globals = {
        document: { getElementById: id => elements.get(id) },
        window,
        setTimeout: (callback, delay) => timers.push({ callback, delay }),
        console: { log() {}, error() {} },
        QRCode: { toCanvas: (_canvas, _url, _options, callback) => callback(null) },
    };
    if (withHoppr) {
        globals.Hoppr = { sendMessage: message => messages.push(JSON.parse(message)) };
    }
    const context = vm.createContext(globals);
    const htmlPath = path.join(__dirname, '..', 'CustomSkip2.html');
    const html = fs.readFileSync(htmlPath, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
    for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)) {
        vm.runInContext(match[1], context, { filename: htmlPath });
    }
    return {
        elements,
        messages,
        timers,
        context,
        flushTimers() {
            while (timers.length > 0) timers.shift().callback();
        },
        key(type, key) {
            const event = new Event(type, { cancelable: true });
            Object.defineProperty(event, 'key', { value: key });
            window.dispatchEvent(event);
            return event;
        },
    };
}

for (const [id, skipValue, delay] of [
    ['sad-button', 1, 200],
    ['skip-button', 3, 0],
    ['happy-button', 5, 200],
]) {
    test(`${id} click submits exactly one skip with value ${skipValue}`, () => {
        const creative = loadCreative();

        creative.elements.get(id).click();

        assert.equal(creative.timers.length, 1);
        assert.equal(creative.timers[0].delay, delay);
        creative.flushTimers();
        assert.deepEqual(creative.messages, [{ type: 'performSkip', skipValue }]);
    });
}

for (const [key, selectedId, skipValue, delay] of [
    ['ArrowLeft', 'sad-button', 1, 200],
    ['Enter', 'skip-button', 3, 0],
    ['ArrowRight', 'happy-button', 5, 200],
]) {
    test(`${key} keeps the existing remote-key selection and skip behavior`, () => {
        const creative = loadCreative();

        const down = creative.key('keydown', key);

        assert.equal(down.defaultPrevented, true, 'prevent additional browser-default activation');
        assert.equal(creative.timers.length, 0, 'keydown does not submit a skip');
        for (const id of ['sad-button', 'skip-button', 'happy-button']) {
            assert.equal(creative.elements.get(id).classList.contains('selected'), id === selectedId);
        }
        creative.key('keyup', key);
        assert.equal(creative.timers.length, 1);
        assert.equal(creative.timers[0].delay, delay);
        creative.flushTimers();
        assert.deepEqual(creative.messages, [{ type: 'performSkip', skipValue }]);
    });
}

test('a click uses the activated button, not the keyboard-selected button', () => {
    const creative = loadCreative();
    creative.key('keydown', 'ArrowLeft');

    creative.elements.get('happy-button').click();
    creative.flushTimers();

    assert.deepEqual(creative.messages, [{ type: 'performSkip', skipValue: 5 }]);
});

test('unhandled keys keep their default behavior and do not skip', () => {
    const creative = loadCreative();

    assert.equal(creative.key('keydown', 'Tab').defaultPrevented, false);
    creative.key('keyup', 'Tab');
    creative.flushTimers();

    assert.deepEqual(creative.messages, []);
});

test('QR mode prevents hidden buttons from submitting clicks or remote-key skips', () => {
    const creative = loadCreative();
    vm.runInContext('generateQrCode("https://example.com")', creative.context);
    creative.flushTimers();
    creative.messages.length = 0;

    for (const id of ['sad-button', 'skip-button', 'happy-button']) {
        creative.elements.get(id).click();
    }
    for (const key of ['ArrowLeft', 'Enter', 'ArrowRight']) {
        creative.key('keydown', key);
        creative.key('keyup', key);
    }
    creative.flushTimers();

    assert.equal(creative.elements.get('button-container').style.display, 'none');
    assert.deepEqual(creative.messages, []);
});

test('clicks without a native Hoppr bridge do not crash', () => {
    const creative = loadCreative({ withHoppr: false });

    for (const id of ['sad-button', 'skip-button', 'happy-button']) {
        creative.elements.get(id).click();
    }
    assert.doesNotThrow(() => creative.flushTimers());
    assert.deepEqual(creative.messages, []);
});
