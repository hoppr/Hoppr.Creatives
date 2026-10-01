# Hoppr Creatives

## CustomSkip2 interaction tests

Run the dependency-free JavaScript regression tests with Node.js 18 or later:

```sh
node --test tests/custom-skip2.test.cjs
```

The tests execute the creative's inline JavaScript with DOM and native Hoppr bridge doubles. They cover click activation, the existing remote-key mappings and delays, suppression of default keyboard activation, and hidden controls in QR mode. They do not replace Android WebView/TalkBack testing.

### Device verification

- Play an activity-based video using `CustomSkip2.html` with TalkBack enabled. Focus and activate each button; expect skip values `1` (sad), `3` (Skip), and `5` (happy), once per activation.
- Repeat with TalkBack disabled: Left, Center/Enter, and Right should retain their existing skip behavior.
- Confirm Enter does not submit a duplicate skip and QR mode does not activate hidden skip controls.
