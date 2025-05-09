import {
  CheckboxPropertyItemObjectResponse,
  DatabaseObjectResponse,
  DatePropertyItemObjectResponse,
  EmailPropertyItemObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  PageObjectResponse,
  PhoneNumberPropertyItemObjectResponse,
  PropertyItemObjectResponse,
  RichTextItemResponse,
  RollupPropertyItemObjectResponse,
  SelectPropertyItemObjectResponse,
  StatusPropertyItemObjectResponse,
  TextRichTextItemResponse,
  UniqueIdPropertyItemObjectResponse,
  UrlPropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { DateTime } from 'luxon'
import Api from '../api'
import { isFullDatabase } from '@notionhq/client'
import invariant from 'tiny-invariant'

export function getFileName(path: string) {
  return path.includes('/') ? path.slice(path.lastIndexOf('/') + 1) : path
}
export function parseTitle(database: DatabaseObjectResponse) {
  return parseText(database.title)
}

export function yamlToNotion(
  type: PageObjectResponse['properties'][string]['type'],
  property: boolean | number | string | string[]
) {
  switch (type) {
    case 'checkbox':
      return property === true
        ? true
        : (false as CheckboxPropertyItemObjectResponse['checkbox'])
    case 'date':
      return property
        ? ({
            start: property,
          } as DatePropertyItemObjectResponse['date'])
        : undefined
    case 'email':
      return String(property) as EmailPropertyItemObjectResponse['email']
    case 'multi_select':
      return (
        property instanceof Array
          ? property.map((option) => ({
              name: option.replace('[[', '').replace(']]', ''),
            }))
          : property
          ? [
              {
                name:
                  typeof property === 'string'
                    ? property.replace('[[', '').replace(']]', '')
                    : property,
              },
            ]
          : []
      ) as MultiSelectPropertyItemObjectResponse['multi_select']
    case 'number':
      return undefined
    case 'phone_number':
      return String(
        property
      ) as PhoneNumberPropertyItemObjectResponse['phone_number']
    case 'select':
      return (
        property
          ? {
              name:
                typeof property === 'string'
                  ? property.replace('[[', '').replace(']]', '')
                  : property,
            }
          : null
      ) as SelectPropertyItemObjectResponse['select']
    case 'status':
      return {
        name: property,
      } as StatusPropertyItemObjectResponse['status']
    case 'title':
    case 'rich_text':
      return [
        {
          type: 'text',
          text: { content: String(property) },
        },
      ] as TextRichTextItemResponse[]
    case 'unique_id':
      return {
        prefix: '',
        number:
          typeof property === 'string'
            ? parseInt(property)
            : typeof property === 'number'
            ? property
            : undefined,
      } as UniqueIdPropertyItemObjectResponse['unique_id']
    case 'url':
      return String(property) as UrlPropertyItemObjectResponse['url']
    case 'relation':
    case 'verification':
    case 'people':
    case 'rollup':
    case 'last_edited_time':
    case 'files':
    case 'formula':
    case 'last_edited_by':
    case 'created_by':
    case 'created_time':
      return undefined
  }
}

export function yamlToMarkdown(
  property: boolean | number | string | string[] | object
): string {
  if (typeof property === 'object' && property !== null) {
    if ('url' in property && typeof property.url === 'string') {
      return property.url  // Return the Notion page URL
    }
  }
  switch (typeof property) {
    case 'boolean':
      return property ? 'X' : ' '
    case 'number':
      return String(property)
    case 'object':
      if (property instanceof Array) {
        return property.join(', ')
      } else {
        let propertyString: string[] = []
        for (let [key, value] of Object.entries(property)) {
          propertyString.push(`${key}: ${yamlToMarkdown(value)}`)
        }
        return propertyString.join(', ')
      }
    case 'string':
      return property
  }
}

export function parsePageTitle(page: PageObjectResponse) {
  const search = Object.entries(page.properties).find(
    ([key, property]) => property.type === 'title'
  )
  invariant(search)
  const [titleKey, title] = search
  invariant(title.type === 'title')
  return [titleKey, parseText(title.title).replace(/\//g, '-')]
}

export function parseText(object: RichTextItemResponse[]) {
  return object.map((span) => span.plain_text).join('')
}
