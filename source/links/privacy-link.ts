import {html} from 'htm/preact';
import {Component, ComponentChildren, VNode} from 'preact';

/**
 * Component properties for {@linkcode PrivacyLink}.
 */
export type PrivacyLinkProps = {
  attributes: Record<string, unknown>;
  children: ComponentChildren;
};

/**
 * A simple {@linkcode https://developer.mozilla.org/docs/Web/HTML/Element/a <a>}
 * element wrapper with `rel="noopener noreferrer"` and `target="_blank"`
 * already set.
 */
export class PrivacyLink extends Component<PrivacyLinkProps> {
  render(): VNode {
    const props: Record<string, string> = {
      ...this.props.attributes,
      rel: 'noopener noreferrer',
      target: '_blank',
    };

    return html`<a ...${props}>${this.props.children}</a>`;
  }
}
