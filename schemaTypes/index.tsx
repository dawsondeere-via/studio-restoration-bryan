import {docTypes} from './documents'
import {componentTypes} from './components'
import {blockTypes} from './blocks'

export const schemaTypes = [...docTypes, ...componentTypes, ...blockTypes]
