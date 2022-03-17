import {html} from 'htm/preact';
import {Component, VNode} from 'preact';

/**
 * Component properties for {@linkcode FeedbackButton}.
 */
export type FeedbackButtonProps = {
  attributes: Record<string, unknown>;
  click: (event: MouseEvent) => unknown;
  feedbackText: string;
  text: string;
  timeout: number;
};

/**
 * Component state for {@linkcode FeedbackButton}.
 */
export type FeedbackButtonState = {
  currentText: string;
  timeoutHandle: number | undefined;
};

/**
 * A {@linkcode https://developer.mozilla.org/docs/Web/HTML/Element/button <button>}
 * element wrapper that changes its text for a given time after being clicked.
 */
export class FeedbackButton extends Component<
  FeedbackButtonProps,
  FeedbackButtonState
> {
  constructor(props: FeedbackButtonProps) {
    super(props);

    this.state = {
      currentText: this.props.text,
      timeoutHandle: undefined,
    };
  }

  click = async (event: MouseEvent) => {
    if ((await this.props.click(event)) === false) {
      return;
    }

    let {timeoutHandle} = this.state;
    if (timeoutHandle !== undefined) {
      window.clearTimeout(timeoutHandle);
    }

    timeoutHandle = window.setTimeout(() => {
      this.setState({
        currentText: this.props.text,
        timeoutHandle: undefined,
      });
    }, this.props.timeout);

    this.setState({
      currentText: this.props.feedbackText,
      timeoutHandle,
    });
  };

  render(): VNode {
    return html`
      <button ...${this.props.attributes} onclick=${this.click}>
        ${this.state.currentText}
      </button>
    `;
  }
}
