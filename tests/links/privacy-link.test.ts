import test from 'ava';
import {html} from 'htm/preact';
import {render} from 'preact-render-to-string';

import {PrivacyLink} from '../../source/gram.js';

test('PrivacyLink', (t) => {
  t.snapshot(render(html`<${PrivacyLink} />`), 'Empty');

  const attributes: Record<string, unknown> = {
    href: 'https://example.org',
  };
  t.snapshot(
    render(html`<${PrivacyLink} attributes=${attributes}>Example<//>`),
    'Text children',
  );

  t.snapshot(
    render(
      html`
        <${PrivacyLink} attributes=${attributes}>
          Example <span class="bold">with children</span>
        <//>
      `,
    ),
    'HTML children',
  );

  attributes.class = 'bold italic';
  t.snapshot(
    render(html`<${PrivacyLink} attributes=${attributes}>Example<//>`),
    'CSS class',
  );
});
