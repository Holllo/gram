import {html} from 'htm/preact';
import {Component, VNode} from 'preact';

/**
 * Component properties for {@linkcode ConfirmButton}.
 */
export type ConfirmButtonProps = {
  class: string;
  click: (event: MouseEvent) => unknown;
  confirmClass: string;
  confirmText: string;
  extraAttributes: Record<string, string>;
  preventDefault: boolean;
  text: string;
  timeout: number;
};

/**
 * Component state for {@linkcode ConfirmButton}.
 */
export type ConfirmButtonState = {
  timeoutHandle: number | undefined;
};

/**
 * A {@linkcode https://developer.mozilla.org/docs/Web/HTML/Element/button <button>}
 * element wrapper that requires 2 clicks within a given time to call the click
 * function. For example to confirm removal of something.
 */
export class ConfirmButton extends Component<
  ConfirmButtonProps,
  ConfirmButtonState
> {
  constructor(props: ConfirmButtonProps) {
    super(props);

    this.state = {
      timeoutHandle: undefined,
    };
  }

  click = (event: MouseEvent) => {
    const {click, preventDefault, timeout} = this.props;
    const {timeoutHandle} = this.state;

    if (preventDefault) {
      event.preventDefault();
    }

    if (timeoutHandle === undefined) {
      this.setState({
        timeoutHandle: window.setTimeout(this.resetTimeout, timeout),
      });
    } else {
      click(event);
      this.resetTimeout();
    }
  };

  resetTimeout = () => {
    window.clearTimeout(this.state.timeoutHandle);
    this.setState({timeoutHandle: undefined});
  };

  render(): VNode {
    const timeoutActive = this.state.timeoutHandle !== undefined;

    let text = this.props.text;
    const props: Record<string, string> = {
      class: this.props.class,
    };

    if (timeoutActive) {
      text = this.props.confirmText;
      props.class = `${props.class} ${this.props.confirmClass}`;
    }

    return html`
      <button
        ...${this.props.extraAttributes}
        ...${props}
        onclick=${this.click}
      >
        ${text}
      </button>
    `;
  }
}
