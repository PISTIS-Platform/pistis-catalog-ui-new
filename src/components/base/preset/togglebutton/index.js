export default {
  root: {
    class: [
      'relative',

      // Alignment
      'inline-flex',
      'align-bottom',

      // Misc
      'cursor-pointer',
      'select-none',
    ],
  },
  box: ({ props }) => ({
    class: [
      // Alignments
      'items-center inline-flex flex-1 text-center align-bottom justify-center',

      // Sizes & Spacing
      'px-3 py-2 leading-none',

      // TODO: Workaround remove later
      'rounded-l-none',

      // Shapes
      'rounded-full border',

      'peer-hover:bg-secondary peer-hover:border-primary-hover',

      // States
      {
        'peer-focus-visible:ring-3 text-primary peer-focus-visible:ring-primary-400/50 dark:peer-focus-visible:ring-primary-300/50':
          !props.disabled,
      },

      // Transitions
      'transition-all duration-200',

      // Misc
      {
        'cursor-pointer': !props.disabled,
        'opacity-60 select-none pointer-events-none cursor-default': props.disabled,
      },
    ],
  }),
  label: {
    class: 'font-bold text-center w-full text-surface-text',
  },
  input: {
    class: [
      'peer',

      // Size
      'size-full ',

      // Position
      'absolute',
      'top-0 left-0',
      'z-10',

      // Spacing
      'p-0',
      'm-0',

      // Shape
      'opacity-0',
      'rounded-md',
      'outline-hidden',
      'border border-surface-200 dark:border-surface-700',

      // Misc
      'appareance-none',
      'cursor-pointer',
    ],
  },
  icon: ({ props }) => ({
    class: [
      'mr-2',
      {
        'text-fg-muted active-item': !props.modelValue,
        'text-fg-muted': props.modelValue,
      },
    ],
  }),
}
