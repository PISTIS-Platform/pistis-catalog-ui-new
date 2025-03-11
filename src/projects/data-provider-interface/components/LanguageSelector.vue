<!-- LANGUAGE SELECTOR -->
<script>
export default {
  name: 'LanguageSelector',
  props: {
    value: {
      type: String,
      default: 'de',
    },
  },
  data() {
    return {
      languages: {
        bg: 'Български',
        cs: 'čeština',
        da: 'dansk',
        de: 'Deutsch',
        el: 'Ελληνικά',
        en: 'English',
        es: 'español',
        et: 'eesti',
        fr: 'français',
        ga: 'Gaeilge',
        hr: 'Hrvatski',
        hu: 'Magyar',
        it: 'italiano',
        lt: 'lietuvių',
        lv: 'latviešu',
        mt: 'Malti',
        nl: 'Nederlands',
        pl: 'polski',
        pt: 'português',
        ro: 'română',
        sk: 'slovenčina',
        sl: 'slovenščina',
        fi: 'suomi',
        sv: 'svenska',
      },
    }
  },
  computed: {
    locale: {
      get() {
        return this.value
      },
      set(newLocale) {
        this.$emit('input', newLocale)
      },
    },
  },
  created() {},
}
</script>

<template>
  <span class="d-inline-block">
    <select v-model="locale">
      <option
        v-for="lang in Object.keys(languages)"
        :key="lang"
        :value="lang"
      >
        {{ languages[lang] }}
      </option>
    </select>
  </span>
</template>

<style lang="scss" scoped></style>
