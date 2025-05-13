<script setup>
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
</script>

<template>
  <Story
    title="Components/Dropdown"
  >
    <div class="grid h-96 w-full place-content-center p-4">
      <div class="flex flex-col gap-4">
        <Dropdown label="Beschreibung speichern">
          <DropdownItem as="a" href="//example.org" target="_blank">
            Item 1
          </DropdownItem>
          <DropdownItem as="button">
            Item 2
          </DropdownItem>
          <DropdownItem as="button">
            Item 3
          </DropdownItem>
          <DropdownItem as="button">
            Item 4
          </DropdownItem>
        </Dropdown>
        <Dropdown severity="secondary" label="Beschreibung speichern">
          <DropdownItem as="a" href="//example.org" target="_blank">
            Item 1
          </DropdownItem>
          <DropdownItem as="button">
            Item 2
          </DropdownItem>
          <DropdownItem as="button">
            Item 3
          </DropdownItem>
          <DropdownItem as="button">
            Item 4
          </DropdownItem>
        </Dropdown>
        <Dropdown severity="contrast" label="Beschreibung speichern">
          <DropdownItem as="a" href="//example.org" target="_blank">
            Item 1
          </DropdownItem>
          <DropdownItem as="button">
            Item 2
          </DropdownItem>
          <DropdownItem as="button">
            Item 3
          </DropdownItem>
          <DropdownItem as="button">
            Item 4
          </DropdownItem>
        </Dropdown>
      </div>
    </div>
  </Story>
</template>
