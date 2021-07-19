import type { IsFlatObject } from './utils'

export type InternalFieldName = string

export type FieldValues = Record<string, any>

export type FieldName<VFieldValues extends FieldValues> = IsFlatObject<VFieldValues> extends true
  ? Extract<keyof VFieldValues, string>
  : string

export type CustomElement<VFieldValues extends FieldValues> = {
  name: FieldName<VFieldValues>
  type?: string
  value?: any
  disabled?: boolean
  checked?: boolean
  options?: HTMLOptionsCollection
  files?: FileList | null
  focus?: () => void
}

export type FieldElement<VFieldValues extends FieldValues = FieldValues> =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | CustomElement<VFieldValues>

export type Ref = FieldElement

export type Field = {
  _f: {
    ref: Ref
    name: InternalFieldName
    value?: any
    refs?: HTMLInputElement[]
    mount?: boolean
  }
}

export type FieldRefs = Partial<Record<InternalFieldName, Field>>
