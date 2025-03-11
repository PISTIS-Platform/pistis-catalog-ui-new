import type { ComputedRef, MaybeRef, MaybeRefOrGetter, Ref } from 'vue'
import { computed, toRef, toValue } from 'vue'

export interface UseDataTruncatorParamsString {
  data: string
  limit: MaybeRef<number>
}

export interface UseDataTruncatorParamsAny<T> {
  data: T[]
  limit: MaybeRef<number>
}

export type UseDataTruncatorParamsBase<T> = UseDataTruncatorParamsString | UseDataTruncatorParamsAny<T>

export type UseDataTruncatorParams<U, T extends UseDataTruncatorParamsBase<U>> = {
  [K in keyof T]: K extends 'data' ? MaybeRefOrGetter<T[K]> : T[K]
}

export interface UseDataTruncatorReturn<T> {
  data: ComputedRef<T>
  limit: Ref<number>
  isTruncated: ComputedRef<boolean>
  isTruncationNeeded: ComputedRef<boolean>
  offset: (n: number) => void
  reset: () => void
  collapse: () => void
  expand: () => void
  toggle: () => void
}

export function useDataTruncator<T>(params: UseDataTruncatorParams<T, UseDataTruncatorParamsString>): UseDataTruncatorReturn<string>
export function useDataTruncator<T>(params: UseDataTruncatorParams<T, UseDataTruncatorParamsAny<T>>): UseDataTruncatorReturn<T[]>

/**
 * Returns an object with properties to manipulate and track the truncation
 * of an array of data.
 */
export function useDataTruncator<T>(params: UseDataTruncatorParams<T, UseDataTruncatorParamsBase<T>>): UseDataTruncatorReturn<string> | UseDataTruncatorReturn<any> {
  const { data, limit } = params
  const limitRef = toRef(limit)
  const origLimit = toValue(limit) ?? 0

  const dataLength = computed(() => toValue(data).length)
  const truncatedData = computed(() => toValue(data).slice(0, toValue(limitRef) ?? 0))
  const isTruncated = computed(() => dataLength.value > toValue(limitRef))
  const isTruncationNeeded = computed(() => dataLength.value > toValue(origLimit))

  function offset(n: number) {
    limitRef.value += n
  }

  function reset() {
    limitRef.value = origLimit
  }

  const collapse = reset

  function expand() {
    limitRef.value = dataLength.value
  }

  function toggle() {
    if (isTruncated.value) {
      expand()
    }
    else {
      reset()
    }
  }

  return {
    data: truncatedData,
    limit: limitRef,
    isTruncated,
    isTruncationNeeded,
    offset,
    reset,
    collapse,
    expand,
    toggle,
  }
}
