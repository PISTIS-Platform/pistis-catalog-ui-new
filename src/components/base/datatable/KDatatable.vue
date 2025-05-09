<script setup lang="ts">
import type { DataTableProps, DataTableSlots } from 'primevue/datatable'
import Datatable from 'primevue/datatable'
import { computed, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const myProps = defineProps<DataTableProps>()
const mySlots = defineSlots<DataTableSlots>()

const resolvedAttrs = computed(() => ({ ...useAttrs(), ...myProps }))

/**
 * @see https://tailwind.primevue.org/datatable/#presets.lara
 */
const pt = {
  root: ({ props }: { props: DataTableProps }) => ({
    class: [
      'relative',
      // Flex & Alignment
      { 'flex flex-col': props.scrollable && props.scrollHeight === 'flex' },
      // Size
      { 'h-full': props.scrollable && props.scrollHeight === 'flex' },
    ],
  }),
  loadingoverlay: {
    class: ['absolute', 'top-0 left-0', 'z-20', 'flex items-center justify-center', 'w-full h-full', 'bg-surface-100/40 dark:bg-surface-800/40', 'transition duration-200'],
  },
  loadingicon: {
    class: 'w-8 h-8 animate-spin',
  },
  wrapper: ({ props }: { props: DataTableProps }) => ({
    class: [
      { 'relative': props.scrollable, 'flex flex-col grow': props.scrollable && props.scrollHeight === 'flex' },
      // Size
      { 'h-full': props.scrollable && props.scrollHeight === 'flex' },
    ],
  }),
  header: ({ props }: { props: DataTableProps }) => ({
    class: [
      'font-bold',
      // Shape
      props.showGridlines ? 'border-x border-t border-b-0' : 'border-y border-x-0',
      // Spacing
      'p-4',
      // Color
      'bg-surface-50 dark:bg-surface-800',
      'border-surface-200 dark:border-surface-700',
      'text-surface-700 dark:text-white/80',
    ],
  }),
  table: {
    class: 'w-full border-spacing-0 border-separate',
  },
  thead: ({ context }: any) => ({
    class: [
      {
        'bg-surface-50 dark:bg-surface-800 top-0 z-40 sticky': context.scrollable,
      },
    ],
  }),
  tbody: ({ instance, context }: any) => ({
    class: [
      {
        'sticky z-20': instance.frozenRow && context.scrollable,
      },
      'bg-surface-50 dark:bg-surface-800',
    ],
  }),
  tfoot: ({ context }: any) => ({
    class: [
      {
        'bg-surface-50 bottom-0 z-0': context.scrollable,
      },
    ],
  }),
  footer: {
    class: ['font-bold', 'border-t-0 border-b border-x-0', 'p-4', 'bg-surface-50 dark:bg-surface-800', 'border-surface-200 dark:border-surface-700', 'text-surface-700 dark:text-white/80'],
  },
  column: {
    headercell: ({ context, props }: any) => ({
      class: [
        'font-bold',
        // Position
        { 'sticky z-20 border-b': props.frozen || props.frozen === '' },
        { relative: context.resizable },
        // Alignment
        'text-left',
        // Shape
        { 'first:border-l border-y border-r': context == null ? void 0 : context.showGridlines },
        'border-0 border-b border-solid',
        // Spacing
        (context == null ? void 0 : context.size) === 'small' ? 'p-2' : (context == null ? void 0 : context.size) === 'large' ? 'p-5' : 'p-4',
        // Color
        (props.sortable === '' || props.sortable) && context.sorted ? 'bg-primary-highlight text-primary-highlight-inverse' : 'bg-surface-50 text-surface-700 dark:text-white/80 dark:bg-surface-800',
        'border-surface-200 dark:border-surface-700 ',
        // States
        { 'hover:bg-surface-100 dark:hover:bg-surface-400/30': (props.sortable === '' || props.sortable) && !(context != null && context.sorted) },
        'focus-visible:outline-hidden focus-visible:outline-offset-0 focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50',
        // Transition
        { 'transition duration-200': props.sortable === '' || props.sortable },
        // Misc
        { 'cursor-pointer': props.sortable === '' || props.sortable },
        {
          'overflow-hidden space-nowrap border-y bg-clip-padding': context.resizable,
          // Resizable
        },
      ],
    }),
    headercontent: {
      class: 'flex items-center',
    },
    sort: ({ context }: any) => ({
      class: [context.sorted ? 'text-primary-500' : 'text-surface-700', context.sorted ? 'dark:text-primary-400' : 'dark:text-white/80'],
    }),
    bodycell: ({ props, context, state, parent }: any) => ({
      class: [
        // Position
        { 'sticky box-border border-b': parent.instance.frozenRow },
        { 'sticky box-border border-b z-20': props.frozen || props.frozen === '' },
        // Alignment
        'text-left',
        // Shape
        'border-0 border-b border-solid',
        { 'first:border-l border-r border-b': context == null ? void 0 : context.showGridlines },
        { 'bg-surface-0 dark:bg-surface-800': parent.instance.frozenRow || props.frozen || props.frozen === '' },
        // Spacing
        { 'p-2': (context == null ? void 0 : context.size) === 'small' && !state.d_editing },
        { 'p-5': (context == null ? void 0 : context.size) === 'large' && !state.d_editing },
        { 'p-4': (context == null ? void 0 : context.size) !== 'large' && (context == null ? void 0 : context.size) !== 'small' && !state.d_editing },
        { 'py-[0.6rem] px-2': state.d_editing },
        // Color
        'border-surface-200 dark:border-surface-700',
      ],
    }),
    footercell: ({ context }: any) => ({
      class: [
        // Font
        'font-bold',
        // Alignment
        'text-left',
        // Shape
        'border-0 border-b border-solid',
        { 'border-x border-y': context == null ? void 0 : context.showGridlines },
        // Spacing
        (context == null ? void 0 : context.size) === 'small' ? 'p-2' : (context == null ? void 0 : context.size) === 'large' ? 'p-5' : 'p-4',
        // Color
        'border-surface-200 dark:border-surface-700',
        'text-surface-700 dark:text-white/80',
        'bg-surface-50 dark:bg-surface-800',
      ],
    }),
    sorticon: ({ context }: any) => ({
      class: ['ml-2', context.sorted ? 'text-primary-highlight-inverse' : 'text-surface-700 dark:text-white/70'],
    }),
    sortbadge: {
      class: ['flex items-center justify-center align-middle', 'rounded-full', 'w-[1.143rem] leading-[1.143rem]', 'ml-2', 'text-primary-highlight-inverse', 'bg-primary-highlight'],
    },
    columnfilter: {
      class: 'inline-flex items-center ml-auto',
    },
    filteroverlay: {
      class: ['absolute top-0 left-0', 'border-0 dark:border', 'rounded-md', 'shadow-md', 'min-w-[12.5rem]', 'bg-surface-0 dark:bg-surface-800', 'text-surface-800 dark:text-white/80', 'dark:border-surface-700'],
    },
    filtermatchmodedropdown: {
      root: ({ state }: any) => ({
        class: [
          // Display and Position
          'flex',
          'relative',
          // Spacing
          'my-2',
          // Shape
          'w-full',
          'rounded-md',
          // Color and Background
          'bg-surface-0 dark:bg-surface-900',
          'border border-surface-300 dark:border-surface-700',
          'text-surface-800 dark:text-white/80',
          'placeholder:text-surface-400 dark:placeholder:text-surface-500',
          // Transitions
          'transition-all',
          'duration-200',
          // States
          'hover:border-primary',
          { 'outline-hidden outline-offset-0 ring-3 ring-primary-400/50 dark:ring-primary-300/50': state.focused },
          // Misc
          'cursor-pointer',
          'select-none',
        ],
      }),
    },
    filterrowitems: {
      class: 'm-0 p-0 py-3 list-none',
    },
    filterrowitem: ({ context }: any) => ({
      class: [
        // Font
        'font-normal',
        'leading-none',
        // Position
        'relative',
        // Shape
        'border-0',
        'rounded-none',
        // Spacing
        'm-0',
        'py-3 px-5',
        // Color
        { 'bg-surface-0 dark:bg-surface-800 text-surface-700 dark:text-white/80': !(context != null && context.highlighted) },
        { 'bg-primary-highlight text-primary-highlight-inverse': context == null ? void 0 : context.highlighted },
        // States
        { 'hover:bg-surface-100 dark:hover:bg-surface-600/80': !(context != null && context.highlighted) },
        { 'hover:text-surface-700 hover:bg-surface-100 dark:hover:text-white dark:hover:bg-surface-600/80': !(context != null && context.highlighted) },
        'focus-visible:outline-hidden focus-visible:outline-offset-0 focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50',
        // Transitions
        'transition-shadow',
        'duration-200',
        // Misc
        'cursor-pointer',
        'overflow-hidden',
        'whitespace-nowrap',
      ],
    }),
    filteroperator: {
      class: ['px-5 py-3', 'border-b border-solid', 'rounded-t-md', 'text-surface-700 dark:text-white/80', 'border-surface-200 dark:border-surface-800', 'bg-surface-0 dark:bg-surface-700'],
    },
    filteroperatordropdown: {
      root: ({ state }: any) => ({
        class: [
          // Display and Position
          'inline-flex',
          'relative',
          // Shape
          'w-full',
          'rounded-md',
          // Color and Background
          'bg-surface-0 dark:bg-surface-900',
          'border border-surface-300 dark:border-surface-700',
          // Transitions
          'transition-all',
          'duration-200',
          // States
          'hover:border-primary',
          { 'outline-hidden outline-offset-0 ring-3 ring-primary-400/50 dark:ring-primary-300/50': state.focused },
          // Misc
          'cursor-pointer',
          'select-none',
        ],
      }),
      input: ({ props }: any) => ({
        class: [
          // Font
          'leading-[normal]',
          // Display
          'block',
          'flex-auto',
          // Color and Background
          'bg-transparent',
          'border-0',
          { 'text-surface-800 dark:text-white/80': props.modelValue, 'text-surface-400 dark:text-surface-500': !props.modelValue },
          'placeholder:text-surface-400 dark:placeholder:text-surface-500',
          // Sizing and Spacing
          'w-[1%]',
          'p-3',
          // Shape
          'rounded-none',
          // Transitions
          'transition',
          'duration-200',
          // States
          'focus:outline-hidden focus:shadow-none',
          // Misc
          'relative',
          'cursor-pointer',
          'overflow-hidden text-ellipsis',
          'whitespace-nowrap',
          'appearance-none',
        ],
      }),
      trigger: {
        class: ['flex items-center justify-center', 'shrink-0', 'bg-transparent', 'text-surface-500', 'w-12', 'rounded-tr-md', 'rounded-br-md'],
      },
      panel: {
        class: ['absolute top-0 left-0', 'border-0 dark:border', 'rounded-md', 'shadow-md', 'bg-surface-0 dark:bg-surface-800', 'text-surface-800 dark:text-white/80', 'dark:border-surface-700'],
      },
      item: ({ context }: any) => ({
        class: [
          // Font
          'font-normal',
          'leading-none',
          // Position
          'relative',
          // Shape
          'border-0',
          'rounded-none',
          // Spacing
          'm-0',
          'py-3 px-5',
          // Color
          { 'text-surface-700 dark:text-white/80': !context.focused && !context.selected },
          { 'bg-surface-50 dark:bg-surface-600/60 text-surface-700 dark:text-white/80': context.focused && !context.selected },
          { 'bg-primary-highlight text-primary-highlight-inverse': !context.focused && context.selected },
          // States
          { 'hover:bg-surface-100 dark:hover:bg-surface-600/80': !context.focused && !context.selected },
          { 'hover:text-surface-700 hover:bg-surface-100 dark:hover:text-white dark:hover:bg-surface-600/80': context.focused && !context.selected },
          // Transitions
          'transition-shadow',
          'duration-200',
          // Misc
          'cursor-pointer',
          'overflow-hidden',
          'whitespace-nowrap',
        ],
      }),
    },
    filterconstraint: {
      class: ['py-3 px-5', 'border-b border-solid', 'border-surface-200 dark:border-surface-700'],
    },
    filteraddrule: {
      class: 'py-3 px-5',
    },
    filteraddrulebutton: {
      root: {
        class: ['relative', 'items-center inline-flex text-center align-bottom justify-center', 'text-sm py-2 px-3 w-full', 'rounded-md', 'bg-transparent border-transparent', 'text-primary', 'hover:bg-primary-300/20', 'transition duration-200 ease-in-out', 'cursor-pointer overflow-hidden select-none'],
      },
      label: {
        class: 'flex-auto grow-0',
      },
      icon: {
        class: 'mr-2',
      },
    },
    filterremovebutton: {
      root: {
        class: ['relative', 'items-center inline-flex text-center align-bottom justify-center', 'text-sm py-2 px-3 w-full mt-2', 'rounded-md', 'bg-transparent border-transparent', 'text-red-500 dark:text-red-400', 'hover:bg-red-300/20', 'transition duration-200 ease-in-out', 'cursor-pointer overflow-hidden select-none'],
      },
      label: {
        class: 'flex-auto grow-0',
      },
      icon: {
        class: 'mr-2',
      },
    },
    filterbuttonbar: {
      class: ['flex items-center justify-between', 'py-3 px-5'],
    },
    filterclearbutton: {
      root: {
        class: ['relative', 'items-center inline-flex text-center align-bottom justify-center', 'text-sm py-2 px-3', 'rounded-md', 'text-primary-500 border border-primary', 'hover:bg-primary-300/20', 'transition duration-200 ease-in-out', 'cursor-pointer overflow-hidden select-none'],
      },
    },
    filterapplybutton: {
      root: {
        class: ['relative', 'items-center inline-flex text-center align-bottom justify-center', 'text-sm py-2 px-3', 'rounded-md', 'text-primary-inverse', 'bg-primary', 'hover:bg-primary-hover hover:border-primary-hover', 'transition duration-200 ease-in-out', 'cursor-pointer overflow-hidden select-none'],
      },
    },
    filtermenubutton: ({ context }: any) => ({
      class: [
        'relative',
        // Flex & Alignment
        'inline-flex items-center justify-center',
        // Size
        'w-8 h-8',
        // Spacing
        'ml-2',
        // Shape
        'rounded-full',
        // Color
        { 'bg-primary-highlight text-highlight-inverse': context.active },
        'dark:text-white/70 dark:hover:text-white/80 dark:bg-surface-800',
        // States
        'hover:text-surface-700 hover:bg-surface-300/20',
        'focus:outline-hidden focus:outline-offset-0 focus:ring-3 focus:ring-primary-400/50 dark:focus:ring-primary-300/50',
        // Transition
        'transition duration-200',
        // Misc
        'cursor-pointer no-underline overflow-hidden',
      ],
    }),
    headerfilterclearbutton: ({ context }: any) => ({
      class: [
        'relative',
        // Flex & Alignment
        'inline-flex items-center justify-center',
        'text-left',
        // Shape
        'border-none',
        // Spacing
        'm-0 p-0 ml-2',
        // Color
        'bg-transparent',
        // Misc
        'cursor-pointer no-underline overflow-hidden select-none',
        {
          invisible: !context.hidden,
        },
      ],
    }),
    rowtoggler: {
      class: ['relative', 'inline-flex items-center justify-center', 'text-left', 'm-0 p-0', 'w-8 h-8', 'border-0 rounded-full', 'text-surface-500 dark:text-white/70', 'bg-transparent', 'focus-visible:outline-hidden focus-visible:outline-offset-0', 'focus-visible:ring-3 focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50', 'transition duration-200', 'overflow-hidden', 'cursor-pointer select-none'],
    },
    columnresizer: {
      class: ['block', 'absolute top-0 right-0', 'w-2 h-full', 'm-0 p-0', 'border border-transparent', 'cursor-col-resize'],
    },
    rowreordericon: {
      class: 'cursor-move',
    },
    roweditorinitbutton: {
      class: ['relative', 'inline-flex items-center justify-center', 'text-left', 'w-8 h-8', 'border-0 rounded-full', 'text-surface-700 dark:text-white/70', 'border-transparent', 'focus:outline-hidden focus:outline-offset-0 focus:ring-3 focus:ring-primary-400/50 dark:focus:ring-primary-300/50', 'hover:text-surface-700 hover:bg-surface-300/20', 'transition duration-200', 'overflow-hidden', 'cursor-pointer select-none'],
    },
    roweditorsavebutton: {
      class: ['relative', 'inline-flex items-center justify-center', 'text-left', 'w-8 h-8', 'border-0 rounded-full', 'text-surface-700 dark:text-white/70', 'border-transparent', 'focus:outline-hidden focus:outline-offset-0 focus:ring-3 focus:ring-primary-400/50 dark:focus:ring-primary-300/50', 'hover:text-surface-700 hover:bg-surface-300/20', 'transition duration-200', 'overflow-hidden', 'cursor-pointer select-none'],
    },
    roweditorcancelbutton: {
      class: ['relative', 'inline-flex items-center justify-center', 'text-left', 'w-8 h-8', 'border-0 rounded-full', 'text-surface-700 dark:text-white/70', 'border-transparent', 'focus:outline-hidden focus:outline-offset-0 focus:ring-3 focus:ring-primary-400/50 dark:focus:ring-primary-300/50', 'hover:text-surface-700 hover:bg-surface-300/20', 'transition duration-200', 'overflow-hidden', 'cursor-pointer select-none'],
    },
    rowRadiobutton: {
      root: {
        class: ['relative', 'inline-flex', 'align-bottom', 'w-[1.571rem] h-[1.571rem]', 'cursor-pointer', 'select-none'],
      },
      box: ({ props }: any) => ({
        class: [
          // Flexbox
          'flex justify-center items-center',
          // Size
          'w-[1.571rem] h-[1.571rem]',
          // Shape
          'border-2',
          'rounded-full',
          // Transition
          'transition duration-200 ease-in-out',
          // Colors
          {
            'text-surface-700 dark:text-white/80': !props.modelValue,
            'bg-surface-0 dark:bg-surface-900': !props.modelValue,
            'border-surface-300 dark:border-surface-700': !props.modelValue,
            'border-primary dark:border-primary': props.modelValue,
            'bg-primary dark:bg-primary': props.modelValue,
          },
          // States
          {
            'peer-hover:border-primary': !props.disabled,
            'peer-hover:border-primary-hover peer-hover:bg-primary-hover': !props.disabled && props.modelValue,
            'peer-focus-visible:border-primary-500 dark:peer-focus-visible:border-primary-400 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-400/20 dark:peer-focus-visible:ring-primary-300/20': !props.disabled,
            'opacity-60 cursor-default': props.disabled,
          },
        ],
      }),
      input: {
        class: ['peer', 'w-full ', 'h-full', 'absolute', 'top-0 left-0', 'z-10', 'p-0', 'm-0', 'opacity-0', 'rounded-md', 'outline-hidden', 'border-2 border-surface-200 dark:border-surface-700', 'appearance-none', 'cursor-pointer'],
      },
      icon: ({ props }: any) => ({
        class: [
          'block',
          // Shape
          'rounded-full',
          // Size
          'w-[0.857rem] h-[0.857rem]',
          // Colors
          'bg-surface-0 dark:bg-surface-900',
          // Conditions
          {
            'backface-hidden scale-10 invisible': !props.modelValue,
            'transform visible scale-[1.1]': props.modelValue,
          },
          // Transition
          'transition duration-200',
        ],
      }),
    },
    headercheckbox: {
      root: {
        class: ['relative', 'inline-flex', 'align-bottom', 'w-6', 'h-6', 'cursor-pointer', 'select-none'],
      },
      box: ({ props, context }: any) => ({
        class: [
          // Alignment
          'flex',
          'items-center',
          'justify-center',
          // Size
          'w-6',
          'h-6',
          // Shape
          'rounded-md',
          'border-2',
          // Colors
          {
            'border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900': !context.checked,
            'border-primary bg-primary': context.checked,
          },
          // States
          {
            'peer-hover:border-primary': !props.disabled && !context.checked,
            'peer-hover:bg-primary-hover peer-hover:border-primary-hover': !props.disabled && context.checked,
            'peer-focus-visible:border-primary-500 dark:peer-focus-visible:border-primary-400 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-400/20 dark:peer-focus-visible:ring-primary-300/20': !props.disabled,
            'cursor-default opacity-60': props.disabled,
          },
          // Transitions
          'transition-colors',
          'duration-200',
        ],
      }),
      input: {
        class: ['peer', 'w-full ', 'h-full', 'absolute', 'top-0 left-0', 'z-10', 'p-0', 'm-0', 'opacity-0', 'rounded-md', 'outline-hidden', 'border-2 border-surface-200 dark:border-surface-700', 'appearance-none', 'cursor-pointer'],
      },
      icon: {
        class: ['text-base leading-none', 'w-4', 'h-4', 'text-white dark:text-surface-900', 'transition-all', 'duration-200'],
      },
    },
    rowCheckbox: {
      root: {
        class: ['relative', 'inline-flex', 'align-bottom', 'w-6', 'h-6', 'cursor-pointer', 'select-none'],
      },
      box: ({ props, context }: any) => ({
        class: [
          // Alignment
          'flex',
          'items-center',
          'justify-center',
          // Size
          'w-6',
          'h-6',
          // Shape
          'rounded-md',
          'border-2',
          // Colors
          {
            'border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900': !context.checked,
            'border-primary bg-primary': context.checked,
          },
          // States
          {
            'peer-hover:border-primary': !props.disabled && !context.checked,
            'peer-hover:bg-primary-hover peer-hover:border-primary-hover': !props.disabled && context.checked,
            'peer-focus-visible:border-primary-500 dark:peer-focus-visible:border-primary-400 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-400/20 dark:peer-focus-visible:ring-primary-300/20': !props.disabled,
            'cursor-default opacity-60': props.disabled,
          },
          // Transitions
          'transition-colors',
          'duration-200',
        ],
      }),
      input: {
        class: ['peer', 'w-full ', 'h-full', 'absolute', 'top-0 left-0', 'z-10', 'p-0', 'm-0', 'opacity-0', 'rounded-md', 'outline-hidden', 'border-2 border-surface-200 dark:border-surface-700', 'appearance-none', 'cursor-pointer'],
      },
      icon: {
        class: ['text-base leading-none', 'w-4', 'h-4', 'text-white dark:text-surface-900', 'transition-all', 'duration-200'],
      },
    },
    transition: {
      enterFromClass: 'opacity-0 scale-y-[0.8]',
      enterActiveClass: 'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
      leaveActiveClass: 'transition-opacity duration-100 ease-linear',
      leaveToClass: 'opacity-0',
    },
  },
  bodyrow: ({ context, props }: any) => ({
    class: [
      // Color
      'dark:text-white/80',
      { 'bg-primary-highlight text-primary-highlight-inverse': context.selected },
      { 'bg-surface-0 text-surface-600 dark:bg-surface-800': !context.selected },
      { 'font-bold bg-surface-0 dark:bg-surface-800 z-20': props.frozenRow },
      { 'odd:bg-surface-0 odd:text-surface-600 dark:odd:bg-surface-800 even:bg-surface-50 even:text-surface-600 dark:even:bg-surface-900/50': context.stripedRows },
      // State
      { 'focus:outline-hidden focus:outline-offset-0 focus:ring-3 focus:ring-primary-400/50 ring-inset dark:focus:ring-primary-300/50': context.selectable },
      { 'hover:bg-surface-300/20 hover:text-surface-600': props.selectionMode && !context.selected },
      // Transition
      { 'transition duration-200': props.selectionMode && !context.selected || props.rowHover },
      // Misc
      { 'cursor-pointer': props.selectionMode },
    ],
  }),
  rowexpansion: {
    class: 'bg-surface-0 dark:bg-surface-800 text-surface-600 dark:text-white/80',
  },
  rowgroupheader: {
    class: ['sticky z-20', 'bg-surface-0 text-surface-600 dark:text-white/70', 'dark:bg-surface-800'],
  },
  rowgroupfooter: {
    class: ['sticky z-20', 'bg-surface-0 text-surface-600 dark:text-white/70', 'dark:bg-surface-800'],
  },
  rowgrouptoggler: {
    class: ['relative', 'inline-flex items-center justify-center', 'text-left', 'm-0 p-0', 'w-8 h-8', 'border-0 rounded-full', 'text-surface-500 dark:text-white/70', 'bg-transparent', 'focus-visible:outline-hidden focus-visible:outline-offset-0', 'focus-visible:ring-3 focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50', 'transition duration-200', 'overflow-hidden', 'cursor-pointer select-none'],
  },
  rowgrouptogglericon: {
    class: 'inline-block w-4 h-4',
  },
  resizehelper: {
    class: 'absolute hidden w-[2px] z-20 bg-primary',
  },
}
</script>

<template>
  <Datatable v-bind="resolvedAttrs" :pt="pt" :pt-options="{ mergeSections: false, mergeProps: false }">
    <template v-for="(_, slot) in (mySlots as {})" #[slot]>
      <!-- @vue-expect-error -->
      <slot :name="slot" v-bind="{ scope }" />
    </template>
  </Datatable>
</template>

<style scoped></style>
