import { FieldExtensionSDK } from '@contentful/app-sdk';
import { entityHelpers } from '@contentful/field-editor-shared';
import { ContentTypeProps } from 'contentful-management/types';

export async function fetchEntries(
  sdk: FieldExtensionSDK,
  contentType: ContentTypeProps,
  query: string
) {
  const entries = await sdk.space.getEntries({
    content_type: contentType.sys.id,
    query,
  });

  return entries.items.map((entry) => {
    const description = entityHelpers.getEntityDescription({
      contentType,
      entity: entry,
      localeCode: sdk.field.locale,
      defaultLocaleCode: sdk.locales.default,
    });

    const displayTitle = entityHelpers.getEntryTitle({
      entry,
      contentType,
      localeCode: sdk.field.locale,
      defaultLocaleCode: sdk.locales.default,
      defaultTitle: 'Untitled',
    });

    return {
      contentTypeName: contentType.name,
      displayTitle: displayTitle,
      id: entry.sys.contentType.sys.id,
      description,
      entry,
    };
  });
}
