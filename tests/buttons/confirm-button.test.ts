import {GlobalRegistrator} from '@happy-dom/global-registrator';
import test from 'ava';
import {html} from 'htm/preact';
import {render} from 'preact';

import {ConfirmButton, ConfirmButtonProps} from '../../source/gram.js';
import {sleep} from '../utilities.js';

test.before(() => {
  GlobalRegistrator.register();
});

test('ConfirmButton', async (t) => {
  t.plan(3);

  const props: ConfirmButtonProps = {
    class: 'button',
    click: (event) => t.true(event !== undefined),
    confirmClass: 'confirm',
    confirmText: 'Confirm Button',
    extraAttributes: {
      id: 'confirm-button',
    },
    preventDefault: true,
    text: 'Button',
    timeout: 1000,
  };

  render(html`<${ConfirmButton} ...${props} />`, document);

  const buttonElement =
    document.querySelector<HTMLButtonElement>('#confirm-button')!;

  t.snapshot(buttonElement.outerHTML, 'Default state');
  buttonElement.click();

  // Wait for Preact to do its stuff.
  await sleep();

  t.snapshot(buttonElement.outerHTML, 'Confirm state');
  buttonElement.click();
});
