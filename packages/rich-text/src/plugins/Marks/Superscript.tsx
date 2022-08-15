import * as React from 'react';

import { Icon } from '@contentful/f36-components';
import { createSuperscriptPlugin as createDefaultSuperscriptPlugin } from '@udecode/plate-basic-marks';
import { someHtmlElement } from '@udecode/plate-core';
import { css } from 'emotion';
import * as Slate from 'slate-react';

import { RichTextPlugin } from '../../types';
import { createMarkToolbarButton } from './components/MarkToolbarButton';
import { buildMarkEventHandler } from './helpers';

export const ToolbarSuperscriptButton = createMarkToolbarButton({
  title: 'Superscript',
  mark: 'superscript',
  icon: (
    <Icon variant="secondary">
      <path d="M22,7h-2v1h3v1h-4V7c0-0.55,0.45-1,1-1h2V5h-3V4h3c0.55,0,1,0.45,1,1v1C23,6.55,22.55,7,22,7z M5.88,20h2.66l3.4-5.42h0.12 l3.4,5.42h2.66l-4.65-7.27L17.81,6h-2.68l-3.07,4.99h-0.12L8.85,6H6.19l4.32,6.73L5.88,20z" />
    </Icon>
  ),
});

const styles = {
  superscript: css({
    verticalAlign: 'super',
    fontSize: '65%',
  }),
};

export function Superscript(props: Slate.RenderLeafProps) {
  return (
    <sup {...props.attributes} className={styles.superscript}>
      {props.children}
    </sup>
  );
}

const isGoogleSuperscriptWrapper = (el: HTMLElement) =>
  el.id.startsWith('docs-internal-guid') && el.nodeName === 'SUP';

export const createSuperscriptPlugin = (): RichTextPlugin =>
  createDefaultSuperscriptPlugin({
    type: 'superscript',
    component: Superscript,
    options: {
      // hotkey: ['mod+b'],
    },
    handlers: {
      onKeyDown: buildMarkEventHandler('superscript'),
    },
    deserializeHtml: {
      rules: [
        { validNodeName: ['sup'] },
        {
          validStyle: {
            verticalAlign: 'super',
            fontSize: '65%',
          },
        },
      ],
      query: (el) => {
        return (
          !isGoogleSuperscriptWrapper(el) &&
          !someHtmlElement(el, (node) => node.style.fontWeight === 'normal')
        );
      },
    },
  });
