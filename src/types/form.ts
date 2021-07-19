import type { InternalFieldName } from './fields'

declare const $NestedValue: unique symbol

export type NestedValue<
  TValue extends unknown[] | Record<string, unknown> | Map<unknown, unknown> = unknown[] | Record<string, unknown>,
> = {
  [$NestedValue]: never
} & TValue

export type InternalNameSet = Set<InternalFieldName>

export type Names = {
  mount: InternalNameSet
  unMount: InternalNameSet
}

export type ChangeHandler = (event: any) => Promise<void | boolean>

export type ValidationMode = {
  onBlur: 'onBlur'
  onChange: 'onChange'
  onSubmit: 'onSubmit'
  onTouched: 'onTouched'
  all: 'all'
}

export type Mode = keyof ValidationMode
