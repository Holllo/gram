import test from 'ava';
import {html} from 'htm/preact';
import {render} from 'preact-render-to-string';

import {PrivacyLink} from '../../source/gram.js';

test('PrivacyLink', (t) => {
  t.snapshot(render(html`<${PrivacyLink} />`), 'Empty');

  t.snapshot(
    render(html`<${PrivacyLink} href="https://example.org">Example<//>`),
    'Text children',
  );

  t.snapshot(
    render(
      html`
        <${PrivacyLink} href="https://example.org">
          Example <span class="bold">with children</span>
        <//>
      `,
    ),
    'HTML children',
  );

  t.snapshot(
    render(
      html`
        <${PrivacyLink} class="bold italic" href="https://example.org">
          Example
        <//>
      `,
    ),
    'CSS class',
  );
});
