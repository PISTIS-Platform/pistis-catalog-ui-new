import type { FormKitLibrary } from '@formkit/core'
import AutocompleteInput from '../components/AutocompleteInput.vue'
import ConditionalInput from '../components/ConditionalInput.vue'
import FileUpload from '../components/FileUpload.vue'
import SimpleAccessURLInput from '../components/SimpleAccessURLInput.vue'
import SimpleInput from '../components/SimpleInput.vue'
import SimpleSelect from '../components/SimpleSelect.vue'
import SpatialInput from '../components/SpatialInput.vue'
import UniqueIdentifierInput from '../components/UniqueIdentifierInput.vue'
import FormKitGroup from './FormKitGroup.vue'
import Repeatable from './Repeatable.vue'

export default {

  repeatable: {
    type: 'list',
    component: Repeatable,
  },
  id: {
    type: 'input',
    component: UniqueIdentifierInput,
  },
  auto: {
    type: 'group',
    component: AutocompleteInput,
  },
  fileupload: {
    type: 'group',
    component: FileUpload,
  },
  spatialinput: {
    type: 'group',
    component: SpatialInput,
  },
  formkitGroup: {
    type: 'group',
    component: FormKitGroup,
  },
  simpleConditional: {
    type: 'group',
    component: ConditionalInput,
  },
  simpleSelect: {
    type: 'input',
    component: SimpleSelect,
  },
  simpleInput: {
    type: 'input',
    component: SimpleInput,
  },
  simpleAccessURLInput: {
    type: 'group',
    component: SimpleAccessURLInput,
  },

} as FormKitLibrary
