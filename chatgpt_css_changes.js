// ==UserScript==
// @name         ChatGPT css changes
// @version      1.0
// @description  ChatGPT css changes
// @match        https://chat.openai.com/chat/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const css = `
        .p-2 {
          padding: .5rem;
        }
        .gap-2 {
          gap: .1rem;
        }
        .space-y-1 > :not([hidden]) ~ :not([hidden]) {
            --tw-space-y-reverse: 0;
            margin-bottom: calc(.25rem*var(--tw-space-y-reverse));
            margin-top: calc(.25rem*(1 - var(--tw-space-y-reverse)));
        }
        .duration-200 {
            transition-duration: .0s;
        }
        .transition-colors {
            transition-duration: .15s;
            transition-property: color,background-color,border-color,text-decoration-color,fill,stroke;
            transition-timing-function: cubic-bezier(.4,0,.2,1);
        }
        .text-white {
            --tw-text-opacity: 1;
            color: rgba(255,255,255,var(--tw-text-opacity));
        }
        .text-sm {
            font-size: .875rem;
            line-height: 1.25rem;
        }
        .py-3 {
            padding-bottom: .0rem;
            padding-top: .0rem;
        }
        .px-3 {
            padding-left: .1rem;
            padding-right: .1rem;
        }
        .gap-3 {
            gap: .1rem;
            row-gap: 0.1rem;
            column-gap: 0.1rem;
        *, ::after, ::before {
            border: 0 solid #d9d9e3;
            box-sizing: border-box;
          }
          .bg-gray-900 {
            --tw-bg-opacity: 1;
          }
          .dark body, .dark html {
            --tw-bg-opacity: 1;
          }
          body {
            line-height: inherit;
          }
          Element {
            color-scheme: dark;
          }
          :root {
            --color-primary: #19c37d;
            --color-secondary: #715fde;
            --color-error: #ef4146;
            --gradient-primary: linear-gradient(90deg,#a29bd4,#989fdd);
            --text-primary: #202123;
            --text-default: #353740;
            --text-secondary: #6e6e80;
            --text-disabled: #acacbe;
            --text-error: var(--color-error);
          }
          html {
            -webkit-text-size-adjust: 100%;
            font-family: Söhne,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,Arial,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
            line-height: 1.5;
            tab-size: 4;
          }
        `;

const style = document.createElement('style');
style.innerHTML = css;
document.head.appendChild(style);
})();
