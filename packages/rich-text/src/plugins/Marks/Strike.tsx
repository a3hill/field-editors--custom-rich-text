import * as React from 'react';

import { Icon } from '@contentful/f36-components';
// import { MARKS } from '@contentful/rich-text-types';
import { createStrikethroughPlugin as createDefaultStrikePlugin } from '@udecode/plate-basic-marks';
import { someHtmlElement } from '@udecode/plate-core';
import { css } from 'emotion';
import * as Slate from 'slate-react';

import { RichTextPlugin } from '../../types';
import { createMarkToolbarButton } from './components/MarkToolbarButton';
import { buildMarkEventHandler } from './helpers';

export const ToolbarStrikeButton = createMarkToolbarButton({
  title: 'Strike',
  mark: 'strike',
  icon: (
    <Icon variant="secondary">
      <path d="M19.5 12.4h-15v-2h14.9v2zm-5.7.5c.6.3.9.6.9 1.2 0 .8-.8 1.6-2.4 1.6-1.9 0-3.5-.9-4.5-1.9l-1.6 2.3c1.3 1.3 3.3 2.2 6 2.2 3.8 0 5.6-1.9 5.6-4.5 0-.3 0-.6-.1-.9h-3.9zm.5-3c-.6-.2-1.2-.3-1.8-.5-1.6-.4-2.8-.7-2.8-1.6 0-.8.7-1.4 2.1-1.4 1.4 0 2.9.5 4 1.5l1.7-2.2c-1.4-1.3-3.2-2-5.5-2-3.3.1-5.3 2-5.3 4.3 0 .8.2 1.4.5 1.9h7.1z" />
    </Icon>
  ),
});

const styles = {
  strike: css({
    textDecoration: 'line-through',
  }),
};

export function Strike(props: Slate.RenderLeafProps) {
  return (
    <s {...props.attributes} className={styles.strike}>
      {props.children}
    </s>
  );
}

const isGoogleStikeWrapper = (el: HTMLElement) =>
  el.id.startsWith('docs-internal-guid') && el.nodeName === 'S';

export const createStrikePlugin = (): RichTextPlugin =>
  createDefaultStrikePlugin({
    type: 'strike',
    component: Strike,
    options: {
      // hotkey: ['mod+b'],
    },
    handlers: {
      onKeyDown: buildMarkEventHandler('strike'),
    },
    deserializeHtml: {
      rules: [
        { validNodeName: ['STRIKE', 'S'] },
        {
          validStyle: {
            textDecoration: 'line-through',
          },
        },
      ],
      query: (el) => {
        return (
          !isGoogleStikeWrapper(el) &&
          !someHtmlElement(el, (node) => node.style.fontWeight === 'normal')
        );
      },
    },
  });
