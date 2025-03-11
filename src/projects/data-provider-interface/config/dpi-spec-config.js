// @ts-nocheck
// dynamic imports are somehow diffcult so we need to import everything :(

import formatTypes from './dcatap/format-types'
import inputDefinition from './dcatap/input-definition'
// import for DCAT-AP
import pageContent from './dcatap/page-content-config'
import prefixes from './dcatap/prefixes'
import vocabPrefixes from './dcatap/vocab-prefixes'

import formatTypesDCATAPDE from './dcatapde/format-types'
import inputDefinitionDCATAPDE from './dcatapde/input-definition'
// import DCAT-AP.de
import pageContentDCATAPDE from './dcatapde/page-content-config'
import prefixesDCATAPDE from './dcatapde/prefixes'
import vocabPrefixesDCATAPDE from './dcatapde/vocab-prefixes'

import formatTypesDCATAPDEODB from './dcatapdeODB/format-types'
import inputDefinitionDCATAPDEODB from './dcatapdeODB/input-definition'
// import DCAT-AP.de for ODB
import pageContentDCATAPDEODB from './dcatapdeODB/page-content-config'
import prefixesDCATAPDEODB from './dcatapdeODB/prefixes'
import vocabPrefixesDCATAPDEODB from './dcatapdeODB/vocab-prefixes'

const config = {
  dcatap: {
    pageConent: pageContent,
    inputDefinition,
    formatTypes,
    prefixes,
    vocabPrefixes,
  },
  dcatapde: {
    pageConent: pageContentDCATAPDE,
    inputDefinition: inputDefinitionDCATAPDE,
    formatTypes: formatTypesDCATAPDE,
    prefixes: prefixesDCATAPDE,
    vocabPrefixes: vocabPrefixesDCATAPDE,
  },
  dcatapdeODB: {
    pageConent: pageContentDCATAPDEODB,
    inputDefinition: inputDefinitionDCATAPDEODB,
    formatTypes: formatTypesDCATAPDEODB,
    prefixes: prefixesDCATAPDEODB,
    vocabPrefixes: vocabPrefixesDCATAPDEODB,
  },

}

export default config
