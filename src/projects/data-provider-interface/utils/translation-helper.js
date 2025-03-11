import { has, isObject } from 'lodash-es'
import { useI18n } from 'vue-i18n'

/**
 * Translation of each translatable parameter within the given structure if a translation is available
 * @param {*} propertyDefinition Object containing parameters defining the form and their content
 * @param {string} property String defining which property translation should be used
 */

async function translateProperty(propertyDefinition, property) {
  // console.log(useI18n().messages);
  const i18n = await useI18n()

  if (has(propertyDefinition, 'identifier')) { // hidden fields don't need a label and have no identifier
    const translatableParameters = ['label', 'info', 'help', 'placeholder', 'add-label']
    const propertyName = propertyDefinition.identifier

    for (let valueIndex = 0; valueIndex < translatableParameters.length; valueIndex += 1) {
      let translation = propertyName
      const parameter = translatableParameters[valueIndex]

      const translationExsists = i18n.te(`message.dataupload.${property}.${propertyName}.${parameter}`)
      const translationExsistsEN = i18n.te(`message.dataupload.${property}.${propertyName}.${parameter}`, 'en')

      // Check if translation exists
      if (!has(property, parameter)) {
        if (translationExsists) {
          translation = i18n.t(`message.dataupload.${property}.${propertyName}.${parameter}`)
        }
        else if (translationExsistsEN) {
          translation = i18n.t(`message.dataupload.${property}.${propertyName}.${parameter}`, 'en')
        }
        else {
          translation = parameter
        }

        const isCustomComponentWithProps = !!propertyDefinition.$cmp
          && !propertyDefinition.$formkit
          && isObject(propertyDefinition.props)

        const isSelectControlledGroupCustomComponent = isCustomComponentWithProps
          && propertyDefinition.$cmp === 'SelectControlledGroup'

        if (isSelectControlledGroupCustomComponent) {
          propertyDefinition.props[parameter] = translation
        }
        else {
          propertyDefinition[parameter] = translation
        }

        if (parameter === 'info') {
          propertyDefinition['sections-schema'] = { prefix: { $el: 'div', attrs: { class: 'infoI' }, children: [{ $el: 'div', children: translation, attrs: { class: 'tooltipFormkit' } }] } }
        }
      }

      // Highlight mandatory fields
      if (propertyDefinition.mandatory && parameter === 'label')
        propertyDefinition[parameter] = `${translation}*`
    }
  }
}

/**
 * Recursive translation of propertie parameters including recursive translation of nested properties
 * @param {object} schema Object containing the forms schema
 * @param {string} property String defining which property translation should be used (datasets/ distribution/ catalogues)
 */
function translate(schema, property) {
  for (let index = 0; index < schema.length; index += 1) {
    const schemaPropertyValues = schema[index]

    // translation of group forms and their nested properties
    if (has(schemaPropertyValues, 'children')) {
      // group attributes should be translated too
      translateProperty(schemaPropertyValues, property)
      // translated nested properties
      translate(schemaPropertyValues.children, property)
      // translation of conditional forms and their nested properties
    }
    else if (has(schemaPropertyValues, 'data')) {
      // group attributes should be translated too
      translateProperty(schemaPropertyValues, property)
      // translate nested data
      const dataKeys = Object.keys(schemaPropertyValues.data)
      for (let keyIndex = 0; keyIndex < dataKeys.length; keyIndex += 1) {
        const currentKey = dataKeys[keyIndex]
        translate(schemaPropertyValues.data[currentKey], property)
      }
      // translation of 'normal' singular form properties
    }
    else {
      translateProperty(schemaPropertyValues, property)
    }
  }
}

export default translate
