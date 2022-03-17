import {GlobalRegistrator} from '@happy-dom/global-registrator';
import test from 'ava';
import {html} from 'htm/preact';
import {render} from 'preact';

import {FeedbackButton, FeedbackButtonProps} from '../../source/gram.js';
import {sleep} from '../utilities.js';

test.before(() => {
  GlobalRegistrator.register();
});

test('FeedbackButton', async (t) => {
  t.plan(7);

  const props: FeedbackButtonProps = {
    attributes: {
      id: 'feedback-button',
    },
    click: (event) => t.true(event !== undefined),
    feedbackText: 'Feedback Example',
    text: 'Example',
    timeout: 1000,
  };

  const noFeedbackProps: FeedbackButtonProps = {
    ...props,
    attributes: {
      id: 'no-feedback-button',
    },
    click(event) {
      props.click(event);
      return false;
    },
  };

  render(
    html`
      <${FeedbackButton} ...${props} />
      <${FeedbackButton} ...${noFeedbackProps} />
    `,
    document,
  );

  const noFeedbackButton = document.querySelector<HTMLButtonElement>(
    '#no-feedback-button',
  )!;

  noFeedbackButton.click();
  await sleep();
  t.false(noFeedbackButton.outerHTML.includes(props.feedbackText));

  const buttonElement =
    document.querySelector<HTMLButtonElement>('#feedback-button')!;

  t.snapshot(buttonElement.outerHTML, 'Default state');
  buttonElement.click();

  // Wait for Preact to do its stuff.
  await sleep();

  t.snapshot(buttonElement.outerHTML, 'Feedback state');
  buttonElement.click();

  await sleep(props.timeout * 1.25);

  t.snapshot(buttonElement.outerHTML, 'Back to default state');
});
