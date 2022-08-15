import * as React from 'react';

import { Icon } from '@contentful/f36-components';
import { createSubscriptPlugin as createDefaultSubscriptPlugin } from '@udecode/plate-basic-marks';
import { someHtmlElement } from '@udecode/plate-core';
import { css } from 'emotion';
import * as Slate from 'slate-react';

import { RichTextPlugin } from '../../types';
import { createMarkToolbarButton } from './components/MarkToolbarButton';
import { buildMarkEventHandler } from './helpers';

export const ToolbarSubscriptButton = createMarkToolbarButton({
  title: 'Subscript',
  mark: 'subscript',
  icon: (
    <Icon variant="secondary">
      <path d="M20.6 18h-2v1h3v1h-4v-2c0-.5.5-1 1-1h2v-1h-3v-1h3c.5 0 1 .4 1 1v1c0 .5-.5 1-1 1zM4.4 18h2.7l3.4-5.4h.1L14 18h2.7L12 10.7 16.4 4h-2.7l-3.1 5h-.1L7.4 4H4.8l4.3 6.7L4.4 18z" />
    </Icon>
  ),
});

const styles = {
  subscript: css({
    verticalAlign: 'sub',
    fontSize: '65%',
  }),
};

export function Subscript(props: Slate.RenderLeafProps) {
  return (
    <sub {...props.attributes} className={styles.subscript}>
      {props.children}
    </sub>
  );
}

const isGoogleSubscriptWrapper = (el: HTMLElement) =>
  el.id.startsWith('docs-internal-guid') && el.nodeName === 'SUB';

export const createSubscriptPlugin = (): RichTextPlugin =>
  createDefaultSubscriptPlugin({
    type: 'subscript',
    component: Subscript,
    options: {
      // hotkey: ['mod+b'],
    },
    handlers: {
      onKeyDown: buildMarkEventHandler('subscript'),
    },
    deserializeHtml: {
      rules: [
        { validNodeName: ['sub'] },
        {
          validStyle: {
            verticalAlign: 'sub',
            fontSize: '65%',
          },
        },
      ],
      query: (el) => {
        return (
          !isGoogleSubscriptWrapper(el) &&
          !someHtmlElement(el, (node) => node.style.fontWeight === 'normal')
        );
      },
    },
  });
