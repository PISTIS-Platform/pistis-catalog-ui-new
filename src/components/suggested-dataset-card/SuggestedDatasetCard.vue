<script lang="ts" setup>
import { clsx } from 'clsx'
import { computed, toRefs } from 'vue'
import PhCaretRight from '~icons/ph/caret-right'
import PhStar from '~icons/ph/star'
import KButton from '../base/button/KButton.vue'
import KTag from '../base/tag/KTag.vue'
import Typography from '../base/typography/Typography.vue'

const props = defineProps<{
  id: string
  title: string
  catalog: string
  description: string
  formats: string[]
  dark?: boolean
}>()

const { dark } = toRefs(props)

const classes = computed(() => ({
  container: clsx([
    // base
    'flex flex-col items-start gap-16 flex-1 min-h-[520px] h-[520px] max-h-[520px] min-w-[260px] max-w-full p-8',
    'no-underline rounded-by',
    'group',

    {
      'border-neutral-10 border-solid border-b': !dark.value,
      'border-none': dark.value,
    },

    {
      'bg-neutral-0': !dark.value,
      'bg-[#f3fbff] bg-opacity-[0.06]': dark.value,
    },

    // Hover
    {

    },
  ]),
  headline: clsx([
    'flex flex-col gap-2',
  ]),
  title: clsx([
    'w-100 m-0 line-clamp-3 text-ellipsis overflow-hidden break-words',
    {
      'text-primary-100': !dark.value,
      'text-primary-10': dark.value,
    },

    // hover
    {
      'group-hover:text-primary-60': !dark.value,
      'group-hover:text-primary-30': dark.value,
    },
  ]),
  subtitle: clsx([
    'by-copy-small-semibold',
    {
      'text-neutral-60': !dark.value,
      'text-neutral-30': dark.value,
    },
  ]),
  body: clsx(['flex flex-col justify-between items-start flex-grow self-stretch']),
  bodyDescription: clsx([
    'line-clamp-5 max-w-full overflow-hidden break-words',
    {
      'text-neutral-60': !dark.value,
      'text-neutral-30': dark.value,
    },
  ]),
  bodyChips: clsx(['flex flex-row items-start content-start gap-2 self-stretch flex-wrap max-h-[4.5rem] overflow-hidden']),
  category: clsx(['flex flexrow items-center by-copy-small-regular text-neutral-60']),
  categoryImg: clsx(['w-by5 h-by5']),
  footer: clsx([
    'flex py-1 px-4 items-center gap-2',
    {
      // 'bg-primary-80': !dark.value,
      // 'bg-primary-10': dark.value
    },
  ]),
  footerBody: clsx(['flex flex-col items-end gap-8 flex-grow self-stretch']),
  toDataset: clsx([
    'border-none rounded-by-button py-[7px] px-[20px]',

    {
      'text-primary-40': dark.value,
    },

    // hover
    {
      'hover:bg-[#d4edfc] hover:text-[#0172ad] hover:no-underline': !dark.value,
      'hover:bg-primary-90 hover:text-primary-30': dark.value,
    },
  ]),
}))
</script>

<template>
  <RouterLink
    :to="{ name: 'dataset-details', params: { datasetId: id } }"
    :class="classes.container"
  >
    <slot name="category">
      <div v-if="false" class="suggested-dataset-card__category d-flex flex-row align-items-center by-copy-small-regular text-by-neutral-60">
        <PhStar class="suggested-dataset-card__category__img text-by-neutral-60" />
        <span class="ml-2">Empfehlung</span>
      </div>
    </slot>
    <slot name="body">
      <div :class="classes.footerBody">
        <div :class="classes.body">
          <div :class="classes.headline">
            <h4 :class="classes.title">
              <Typography as="span" variant="by-heading-4">
                {{ title }}
              </Typography>
            </h4>
            <p :class="classes.subtitle">
              {{ catalog }}
            </p>
          </div>
          <Typography as="p" variant="by-copy-small-regular" :class="classes.bodyDescription">
            {{ description }}
          </Typography>
        </div>
        <div :class="classes.bodyChips">
          <KTag
            v-for="(format, i) in formats"
            :key="i"
            :light="!dark"
          >
            {{ format }}
          </KTag>
        </div>
        <div :class="classes.footer">
          <KButton
            severity="tertiary"
          >
            Zum Datensatz
            <PhCaretRight />
          </KButton>
        </div>
      </div>
    </slot>
  </RouterLink>
</template>

<!-- <style lang="scss">
// .suggested-dataset-card {
//   display: flex;
//   min-height: 520px;
//   height: 520px;
//   max-height: 520px;
//   min-width: 260px;
//   padding: 32px;
//   flex-direction: column;
//   align-items: flex-start;
//   gap: 64px;
//   flex: 1 0 0;

//   text-decoration: none;

//   border-radius: var(--Border-Radius, 8px);
//   border-bottom: 1px solid var(--Neutral-10, #F1F1F3);
//   background: var(--Neutral-0, #FFF);

//   &__headline {
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
//   }

//   &__title {
//     width: 100%;
//     margin: 0;
//     display: -webkit-box;
//     line-clamp: 3;
//     -webkit-line-clamp: 3;
//     -webkit-box-orient: vertical;
//     text-overflow: ellipsis;
//     overflow: hidden;
//     color: $by-blue-100;

//     word-break: break-word;
//     word-wrap: break-word;
//   }

//   &__subtitle {
//     color: $by-neutral-60;
//   }

//   &__body__description {
//     color: $by-neutral-60;
//   }

//   &__category {
//     &__img {
//       width: var(--Spacer-Custom-1, 32px);
//       height: var(--Spacer-Custom-1, 32px);
//     }
//   }

//   &__body {
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     align-items: flex-start;
//     flex: 1 0 0;
//     align-self: stretch;

//     &__description {
//       display: -webkit-box;
//       max-width: 100%;
//       -webkit-line-clamp: 5;
//       -webkit-box-orient: vertical;
//       overflow: hidden;
//     }

//     &__chips {
//       display: flex;
//       align-items: flex-start;
//       align-content: flex-start;
//       gap: 8px;
//       align-self: stretch;
//       flex-wrap: wrap;
//       // Ensure that the chips don't take more than two rows
//       max-height: 4.5rem; // === 2 rows of chips
//       overflow: hidden;
//     }
//   }

//   &__footer {
//     div {
//       display: flex;
//       padding: 4px 16px;
//       align-items: center;
//       gap: 8px;
//       color: $by-blue-80;
//     }
//   }

//   &__body-footer {
//     display: flex;
//     flex-direction: column;
//     align-items: flex-end;
//     gap: var(--Spacer-Custom-1, 32px);
//     flex: 1 0 0;
//     align-self: stretch;
//   }

//   .to-dataset {
//     border: 0 !important;
//     border-radius: 24px !important;
//     padding: 7px 20px 7px 20px !important;
//   }

//   &:hover {
//     .suggested-dataset-card__title {
//       color: $by-blue-60!important;
//     }
//   }

//   .to-dataset:hover {
//     background-color: #D4EDFC !important;
//     color: #0172AD !important;
//     -webkit-text-decoration: none !important;
//     text-decoration: none !important;
//   }

//   &--dark {
//     background: rgba(243, 251, 255, 0.06);
//     border: none;

//     .suggested-dataset-card {
//       &__title {
//         color: $by-blue-10;
//       }

//       &__subtitle {
//         color: $by-neutral-30;
//       }

//       &__body__description {
//         color: $by-neutral-30;
//       }
//     }

//     .to-dataset {
//       color: $by-blue-40;

//       &:hover {
//         background-color: $by-blue-90 !important;
//         color: $by-blue-30 !important;
//       }
//     }

//     &:hover {
//     .suggested-dataset-card__title {
//         color: $by-blue-30!important;
//       }
//     }
//   }
// }
</style> -->
