<script lang="ts" setup>
import { ref } from 'vue'
import Typography from './Typography.vue'

const text = ref('The lazy fox jumps over the quick brown dog')
</script>

<template>
  <Story
    icon="ph:text-aa"
    title="Base Components/Typography"
    :layout="{ type: 'grid', width: 720 }"
  >
    <Variant title="H1 (Header 1)">
      <Typography variant="header-1">
        {{ text }}
      </Typography>
    </Variant>
    <Variant title="H2 (Header 2)">
      <Typography variant="header-2">
        {{ text }}
      </Typography>
    </Variant>
    <Variant title="H3 (Header 3)">
      <Typography variant="header-3">
        {{ text }}
      </Typography>
    </Variant>
    <Variant title="H4 (Header 4)">
      <Typography variant="header-4">
        {{ text }}
      </Typography>
    </Variant>
    <Variant title="Paragraph 1">
      <Typography variant="paragraph-1">
        {{ text }}
      </Typography>
    </Variant>
    <Variant title="Paragraph 2">
      <Typography variant="paragraph-2">
        {{ text }}
      </Typography>
    </Variant>
    <Variant title="Caption">
      <Typography variant="caption">
        {{ text }}
      </Typography>
    </Variant>
    <Variant title="Numeric (Data and Statistics)">
      <Typography variant="numeric">
        {{ text }}
      </Typography>
    </Variant>
    <Variant title="Button Text">
      <Typography variant="button-text">
        {{ text }}
      </Typography>
    </Variant>
    <Variant title="Code or Data Tables">
      <Typography variant="code-or-data-tables">
        {{ text }}
      </Typography>
    </Variant>

    <Variant title="by-heading-1">
      <Typography variant="by-heading-1">
        Some Lazy Fox
      </Typography>
    </Variant>
    <Variant title="by-heading-2">
      <Typography variant="by-heading-2">
        {{ text }}
      </Typography>
    </Variant>
    <Variant title="by-heading-3">
      <Typography variant="by-heading-3">
        {{ text }}
      </Typography>
    </Variant>
    <Variant title="by-heading-4">
      <Typography variant="by-heading-4">
        {{ text }}
      </Typography>
    </Variant>
    <Variant title="by-heading-5">
      <Typography variant="by-heading-5">
        {{ text }}
      </Typography>
    </Variant>

    <Variant title="by-caption">
      <Typography variant="by-caption">
        {{ text }}
      </Typography>
    </Variant>
    <Variant title="by-copy-large-regular">
      <Typography variant="by-copy-large-regular">
        {{ text }}
      </Typography>
    </Variant>
    <Variant title="by-copy-large-semibold">
      <Typography variant="by-copy-large-semibold">
        {{ text }}
      </Typography>
    </Variant>
    <Variant title="by-copy-large-bold">
      <Typography variant="by-copy-large-bold">
        {{ text }}
      </Typography>
    </Variant>
    <Variant title="by-copy-small-regular">
      <Typography variant="by-copy-small-regular">
        {{ text }}
      </Typography>
    </Variant>
    <Variant title="by-copy-small-semibold">
      <Typography variant="by-copy-small-semibold">
        {{ text }}
      </Typography>
    </Variant>
    <Variant title="by-copy-small-bold">
      <Typography variant="by-copy-small-bold">
        {{ text }}
      </Typography>
    </Variant>
    <Variant title="by-copy-mini-regular">
      <Typography variant="by-copy-mini-regular">
        {{ text }}
      </Typography>
    </Variant>
    <Variant title="by-copy-mini-semibold">
      <Typography variant="by-copy-mini-semibold">
        {{ text }}
      </Typography>
    </Variant>
    <Variant title="by-copy-mini-bold">
      <Typography variant="by-copy-mini-bold">
        {{ text }}
      </Typography>
    </Variant>

    <template #controls>
      <HstText
        v-model="text"
        title="Text"
      />
    </template>
  </Story>
</template>
