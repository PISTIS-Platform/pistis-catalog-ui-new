import type { PropertyTableEntry, PropertyTableEntryLeaf, PropertyTableEntryNode } from '@piveau/sdk-vue'
import type { PropType, VNode, VNodeArrayChildren } from 'vue'
import { isVNodeEmpty } from '@piveau/sdk-vue'
import { defineComponent, h, toRef } from 'vue'
import Typography from '../base/typography/Typography.vue'

const PropertyTable = defineComponent({
  name: 'PropertyTable',
  props: {
    as: { type: [Object, String], default: 'div' },
    root: { type: Boolean, default: false },
    node: { type: Object as PropType<PropertyTableEntryNode>, required: true },
  },
  setup(props, { slots }) {
    const node = toRef(props, 'node')

    function renderLeaf(data: PropertyTableEntryLeaf): VNode {
      if (data.type === 'value')
        return h('span', data.data)

      if (data.type === 'href')
        return h('span', h('a', { class: 'text-primary hover:text-primary', href: data.data.href }, data.data.label))

      return h('span', JSON.stringify(data))
    }

    function renderNodes(nodes: PropertyTableEntry[], depth: number = 0): VNodeArrayChildren {
      return nodes.map((data, idx) => {
        const itemSlot = slots.item
        if (itemSlot && !isVNodeEmpty(itemSlot?.({ data, idx, depth })))
          return itemSlot?.({ data, idx, depth })

        if (data.type === 'node' && depth <= 0) {
          return !!data.data && data.data.length > 0
            ? h('tr', { class: 'flex flex-col gap-1 mb-2' }, [
                h('td', { class: 'block font-medium' }, h(Typography, { as: 'span', variant: 'caption' }, () => data.label || data.id)),
                h('td', { class: 'block' }, renderNodes(data.data || [], depth + 1)),
              ])
            : null
          // return h('tr', [
          //   slots.title?.({ title: data.label, depth }) || h('div', { class: 'font-medium' }, `${data.type} -> ${data.id} (${data.id}) (${data.data?.length || 0} children)`),
          //   !isVNodeEmpty(itemsSlot) ? itemsSlot : h('div', { class: 'pl-8' }, renderNodes(data.data || [], depth + 1)),
          // ])
        }

        if (data.type === 'node' && depth > 0) {
          // render only td without title
          return renderNodes(data.data || [], depth + 1)
        }

        if (data.type === 'value' || data.type === 'href')
          return h('td', { class: 'block' }, renderLeaf(data))

        return null
      })
    }

    return () => h('table', {
      class: 'flex flex-col gap-4 mb-4 overflow-x-auto',
    }, renderNodes(node.value?.data || []))
  },
})

export { PropertyTable }
