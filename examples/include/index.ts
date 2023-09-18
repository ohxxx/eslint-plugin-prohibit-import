import { xxx } from '../helper';
import { get } from 'lodash'
import cloneDeep from 'lodash/cloneDeep'
import { Slot } from '@radix-ui/react-slot'

const fn = function () { return 0 }
const x = get({ a: 1 }, 'a')
console.log('xxx#x', x);