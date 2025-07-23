<template>
  <div class="compare-container">
    <h4 class="compare-title">Compare Dataset Versions{{ getVersionTitle }}</h4>
    
    <div v-if="store.selectedDiff.length < 2" class="instructions-panel">
      <div class="alert alert-orange">
        <h5>How to Compare Versions</h5>
        <p>To compare two dataset versions:</p>
        <ol>
          <li>Click on any two dataset nodes in the dataset family tree</li>
          <li>Click anywhere outside the tree to reset your selections</li>
        </ol>
        <div>Selected versions: <b>{{ store.selectedDiff.length }} of 2</b></div>
        <button v-if="store.selectedDiff.length === 1" class="btn btn-secondary mt-2" @click="store.resetDiff">Reset Selection</button>
      </div>
    </div>
    
    <!-- Show selection message only if we're not actively comparing yet -->
    <div v-else-if="store.selectedDiff.length === 2 && !isComparing" class="comparison-panel">
      <div class="alert alert-success mb-3">
        <h5>Versions Selected</h5>
        <p>You've selected two versions for comparison.</p>
        <button class="btn btn-secondary" @click="store.resetDiff">Reset Selection</button>
        <button class="btn btn-primary ms-2" @click="compareVersions">Compare</button>
      </div>
    </div>
    
    <!-- Active comparison section -->
    <div v-else-if="store.selectedDiff.length === 2 && isComparing" class="comparison-panel">
      <!-- Loading state -->
      <div v-if="store.isLoadingDiff" class="text-center p-4">
        <div class="spinner-border spinner-pistis" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3">Fetching comparison data...</p>
      </div>
      
      <!-- Error state -->
      <div v-else-if="store.diffError" class="alert alert-danger">
        <h5>Error</h5>
        <p>{{ store.diffError }}</p>
        <button class="btn btn-primary" @click="compareVersions">Retry</button>
      </div>
      
      <!-- Comparison content -->
      <div v-else-if="store.diffData">
        <!-- Summary section - Always visible in both factory and cloud mode -->
        <div class="comparison-summary">
          <div class="d-flex flex-wrap gap-3 pt-3 px-3">
            <div class="summary-item columns-added">
              <span class="badge bg-success">Columns Added</span>
              <span class="count">{{ store.diffData?.diff?.schema_changes?.columns_added?.length || 0 }} columns</span>
            </div>
            <div class="summary-item columns-removed">
              <span class="badge bg-danger">Columns Removed</span>
              <span class="count">{{ store.diffData?.diff?.schema_changes?.columns_removed?.length || 0 }} columns</span>
            </div>
            <div class="summary-item columns-renamed">
              <span class="badge bg-info">Columns Renamed</span>
              <span class="count">{{ store.diffData?.diff?.schema_changes?.columns_changed?.length || 0 }} columns</span>
            </div>
            <div class="summary-item rows-added">
              <span class="badge bg-success">Records Added</span>
              <span class="count">{{ store.diffData?.diff?.data_changes?.rows_added?.length || 0 }} records</span>
            </div>
            <div class="summary-item rows-removed">
              <span class="badge bg-danger">Records Removed</span>
              <span class="count">{{ store.diffData?.diff?.data_changes?.rows_removed?.length || 0 }} records</span>
            </div>
            <div class="summary-item values-modified">
              <span class="badge bg-info">Values Modified</span>
              <span class="count">{{ store.diffData?.diff?.data_changes?.values_modified?.length || 0 }} values</span>
            </div>
          </div>
        </div>
        
        <!-- Data comparison table - Only visible in factory mode -->
        <div v-if="!cloudMode" class="data-comparison">
          <!-- Comparison table with highlighting -->
          <section class="comparison-container" v-if="ready">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th v-for="(column, index) in columnNames" :key="index" :class="isColumnAddedOrRemoved(column)">
                    <template v-if="isColumnAdded(column)">
                      <div class="added-column">
                        <span class="added-name">{{ column }}</span>
                      </div>
                    </template>
                    <template v-else-if="isColumnRenamed(column)">
                      <div class="renamed-column">
                        <span class="old-name">{{ column }}</span>
                        <span class="arrow">→</span>
                        <span class="new-name">{{ getNewColumnName(column) }}</span>
                      </div>
                    </template>
                    <template v-else>
                      {{ column }}
                    </template>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, rowIndex) in combinedRows" :key="rowIndex" :class="getRowStatusClass(row)">
                  <td v-for="(column, colIndex) in columnNames" :key="colIndex" :class="getCellClasses(row, column)">
                    <template v-if="isSpecificFieldChanged(row, column)">
                      <div class="changed-value">
                        <span class="old-value">{{ getChangedCellValues(row, column)[0] }}</span>
                        <span class="arrow">→</span>
                        <span class="new-value">{{ getChangedCellValues(row, column)[1] }}</span>
                      </div>
                    </template>
                    <template v-else-if="isColumnRemoved(column) && getValueForRemovedColumn(row, column) !== null">
                      {{ getValueForRemovedColumn(row, column) }}
                    </template>
                    <template v-else>
                      {{ row._added ? getAddedRowValue(row, column) : row[column] }}
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          
          <!-- Loading message when not ready -->
          <section v-else-if="isComparing && store.isLoadingDiff" class="text-center p-3">
            <div class="spinner-border spinner-pistis" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3">Loading comparison data...</p>
          </section>
          
          <div v-else class="alert alert-info">
            <p>No data available for comparison.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from '../data-lineage/store'

// Define props for the component
const props = defineProps({
  cloudMode: {
    type: Boolean,
    default: false
  }
})

const store = useStore()
const isComparing = ref(false)

const getVersionTitle = computed(() => {
  if (store.selectedDiff.length === 2 && store.tableData) {
    const firstVersion = store.tableData[store.selectedDiff[0]]?.version
    const secondVersion = store.tableData[store.selectedDiff[1]]?.version
    if (firstVersion && secondVersion) {
      return ` (v${firstVersion} → v${secondVersion})`
    }
  }
  return ''
})

// Get version information from the store's tableData
const getVersionInfo = (id) => {
  return store.tableData ? store.tableData[id] : null
}

// Computed property to check if there's data to compare
const hasDataToCompare = computed(() => {
  if (!store.diffData || !store.diffData.diff) return false
  
  return (
    (store.diffData.diff.data_changes.rows_added && store.diffData.diff.data_changes.rows_added.length > 0) ||
    (store.diffData.diff.data_changes.rows_removed && store.diffData.diff.data_changes.rows_removed.length > 0) ||
    (store.diffData.diff.data_changes.values_modified && store.diffData.diff.data_changes.values_modified.length > 0)
  )
})

// Get columns from the first dataset (assuming both datasets have same/similar structure)
const columns = computed(() => {
  if (!store.diffData || !store.diffData.dataset_1 || !store.diffData.dataset_1[0] || !store.diffData.dataset_1[0].data_model) return []
  return store.diffData.dataset_1[0].data_model.columns.map(col => col[0]) || []
})

// Computed property to get column names from both datasets including added/removed columns
const columnNames = computed(() => {
  if (!store.diffData) return []
  
  let allColumns = []
  
  // Get columns from both datasets
  const columnsAdded = store.diffData.diff?.schema_changes?.columns_added || []
  const columnsRemoved = store.diffData.diff?.schema_changes?.columns_removed || []
  
  // Standard case: Get columns from dataset_1
  if (store.diffData.dataset_1 && store.diffData.dataset_1[0] && store.diffData.dataset_1[0].data_model) {
    const columns = store.diffData.dataset_1[0].data_model.columns || []
    
    if (columns.length > 0) {
      if (Array.isArray(columns[0])) {
        // Format: [["column_name", "column_type"], ...]
        allColumns = columns.map(col => col[0])
      } else if (typeof columns[0] === 'object') {
        // Format: [{name: "column_name", dataType: "column_type"}, ...]
        allColumns = columns.map(col => col.name)
      }
    }
  }
  
  // If we have a complete column replacement scenario, we need to make sure
  // removed columns are still included
  if (columnsRemoved.length > 0) {
    // Add any removed columns that aren't already in the list
    const missingRemovedColumns = columnsRemoved.filter(col => !allColumns.includes(col))
    if (missingRemovedColumns.length > 0) {
      allColumns = [...allColumns, ...missingRemovedColumns]
    }
  }
  
  // Add columns that are marked as added (from dataset_2) but aren't already in the list
  if (columnsAdded.length > 0) {
    const newColumns = columnsAdded.filter(col => !allColumns.includes(col))
    allColumns = [...allColumns, ...newColumns]
  }
  
  return allColumns
})

// Helper function to get formatted rows from dataset_1 and added rows from dataset_2
const getFormattedRows = () => {
  if (!store.diffData) return []
  
  // Combined array for all rows
  let allRows = []
  const dataset1EntryIds = new Set()
  
  // Pre-process removed rows if available
  const removedRowsSet = new Set()
  if (store.diffData.diff?.data_changes?.rows_removed) {
    store.diffData.diff.data_changes.rows_removed.forEach(row => {
      if (row._entry_id) {
        removedRowsSet.add(row._entry_id)
      } else if (row.entry_id) {
        removedRowsSet.add(row.entry_id)
      }
    })
  }
  
  // Create a pre-processed map of removed rows for faster lookup
  const removedRows = new Map()
  if (store.diffData.diff && store.diffData.diff.data_changes?.rows_removed) {
    // For each removed row, create a unique signature for lookup
    store.diffData.diff.data_changes.rows_removed.forEach((removedRow, index) => {
      // Store by entry_id if available
      if (removedRow._entry_id) {
        removedRows.set(removedRow._entry_id, removedRow)
      } else if (removedRow.entry_id) {
        removedRows.set(removedRow.entry_id, removedRow)
      }
    })
  }
  
  // Pre-process added rows if available
  const addedRowsSet = new Set()
  if (store.diffData.diff?.data_changes?.rows_added) {
    store.diffData.diff.data_changes.rows_added.forEach(row => {
      if (row._entry_id) {
        addedRowsSet.add(row._entry_id)
      } else if (row.entry_id) {
        addedRowsSet.add(row.entry_id)
      }
    })
  }
  
  // Get info about added columns (if any)
  const addedColumns = store.diffData.diff && store.diffData.diff?.schema_changes?.columns_added ? 
                       store.diffData.diff.schema_changes.columns_added : []
                       
  // Create maps for column name mappings between datasets
  const dataset1ColumnMap = new Map()
  const dataset2ColumnMap = new Map()
  
  // Pre-process column mappings if we have dataset_1 and dataset_2
  if (store.diffData.dataset_1 && store.diffData.dataset_1[0] && 
      store.diffData.dataset_1[0].data_model && store.diffData.dataset_1[0].data_model.columns) {
    // Map column indices to column names for dataset_1
    const columns = store.diffData.dataset_1[0].data_model.columns
    if (columns.length > 0) {
      if (Array.isArray(columns[0])) {
        columns.forEach((col, idx) => dataset1ColumnMap.set(idx, col[0]))
      } else if (typeof columns[0] === 'object') {
        columns.forEach((col, idx) => dataset1ColumnMap.set(idx, col.name))
      }
    }
  }
  
  if (store.diffData.dataset_2 && store.diffData.dataset_2[0] && 
      store.diffData.dataset_2[0].data_model && store.diffData.dataset_2[0].data_model.columns) {
    // Map column indices to column names for dataset_2
    const columns = store.diffData.dataset_2[0].data_model.columns
    if (columns.length > 0) {
      if (Array.isArray(columns[0])) {
        columns.forEach((col, idx) => dataset2ColumnMap.set(idx, col[0]))
      } else if (typeof columns[0] === 'object') {
        columns.forEach((col, idx) => dataset2ColumnMap.set(idx, col.name))
      }
    }
  }
  
  // Create a map to store dataset_2 rows for later lookup (using entry_id or similar identifier)
  const dataset2RowsMap = new Map()
  
  // Pre-process dataset_2 rows
  if (store.diffData.dataset_2 && store.diffData.dataset_2[0]) {
    const dataset = store.diffData.dataset_2[0]
    if (dataset.data && dataset.data.rows) {
      // Process each row from dataset_2
      dataset.data.rows.forEach(rowArray => {
        const rowObj = {}
        
        // Map array values to column names using dataset2ColumnMap
        rowArray.forEach((value, idx) => {
          const colName = dataset2ColumnMap.get(idx)
          if (colName) {
            rowObj[colName] = value
          }
        })
        
        // Find the index of entry_id equivalent in dataset 2
        // We're assuming the first column is some kind of identifier like entry_id
        // If not, we'll need a more robust way to map rows between datasets
        const idColumnName = dataset2ColumnMap.get(0)
        if (idColumnName && rowObj[idColumnName] !== null && rowObj[idColumnName] !== undefined) {
          // Store using the ID value as key
          dataset2RowsMap.set(String(rowObj[idColumnName]), rowObj)
        }
      })
    }
  }
  
  // First, process all rows from dataset_1 (base dataset)
  if (store.diffData.dataset_1 && store.diffData.dataset_1[0]) {
    const dataset = store.diffData.dataset_1[0]
    if (dataset.data && dataset.data.rows) {
      dataset.data.rows.forEach(rowArray => {
        const rowObj = {}
        
        // Map array values to column names using dataset1ColumnMap
        rowArray.forEach((value, idx) => {
          const colName = dataset1ColumnMap.get(idx)
          if (colName) {
            rowObj[colName] = value
          }
        })
        
        // Make sure removed columns from the diff are included in the row object
        // This ensures they'll be displayed in the table
        if (store.diffData.diff && store.diffData.diff.schema_changes?.columns_removed) {
          store.diffData.diff.schema_changes.columns_removed.forEach(removedCol => {
            // Only add if not already present
            if (!(removedCol in rowObj)) {
              // Get the value from removedRow if possible, otherwise use empty string
              let value = ''
              if (store.diffData.diff.data_changes.rows_removed && rowObj._entry_id) {
                // Try to find a matching removed row by entry_id
                const removedRow = store.diffData.diff.data_changes.rows_removed.find(r => 
                  (r._entry_id && r._entry_id === rowObj._entry_id) || 
                  (r.entry_id && r.entry_id === rowObj._entry_id)
                )
                
                if (removedRow && removedCol in removedRow) {
                  value = removedRow[removedCol]
                }
              }
              
              rowObj[removedCol] = value
            }
          })
        }
        
        // Mark as coming from dataset 1
        rowObj._dataset = 'dataset_1'
        
        // Get the identifier (assuming it's in the first column)
        const idColumnName = dataset1ColumnMap.get(0)
        let entryId = null
        
        if (idColumnName && rowObj[idColumnName] !== null && rowObj[idColumnName] !== undefined) {
          entryId = rowObj[idColumnName]
          rowObj._entry_id = entryId
          dataset1EntryIds.add(entryId)
          
          // If we have added columns and this row exists in dataset_2,
          // add the values for the added columns from dataset_2
          if (addedColumns.length > 0) {
            const dataset2Row = dataset2RowsMap.get(String(entryId))
            
            if (dataset2Row) {
              // For each added column, copy the value from dataset_2 if available
              addedColumns.forEach(addedCol => {
                if (addedCol in dataset2Row) {
                  rowObj[addedCol] = dataset2Row[addedCol]
                } else {
                  // Set a default empty value to ensure the column shows up in the table
                  rowObj[addedCol] = ''
                }
              })
            } else {
              // If the row doesn't exist in dataset_2, still add empty values for added columns
              addedColumns.forEach(addedCol => {
                rowObj[addedCol] = ''
              })
            }
          }
        }
        
        // Check if this row is explicitly in the rows_removed list
        if (entryId) {
          // Use the removedRows map for faster lookup
          if (removedRows.has(entryId)) {
            rowObj._removed = true
          }
        }
        
        allRows.push(rowObj)
      })
    }
  }
  
  // Add rows that are marked as added in the diff
  if (store.diffData.diff?.data_changes?.rows_added) {
    // Create a map of new column names to old column names
    const columnNameMap = {}
    if (store.diffData.diff?.schema_changes?.columns_changed) {
      store.diffData.diff.schema_changes.columns_changed.forEach(change => {
        columnNameMap[change.new] = change.old
      })
    }

    store.diffData.diff.data_changes.rows_added.forEach(row => {
      const rowObj = { _added: true, _dataset: 'dataset_2' }
      
      // Set entry_id properly
      if (row._entry_id) {
        rowObj._entry_id = row._entry_id
      } else if (row.entry_id) {
        rowObj._entry_id = row.entry_id
      }
      
      // Map values from new column names to old column names
      Object.entries(row).forEach(([key, value]) => {
        // If this is a renamed column, use the old name
        const oldColumnName = columnNameMap[key] || key
        rowObj[oldColumnName] = value
      })
      
      // Make sure the row has values (even if empty) for removed columns
      if (store.diffData.diff?.schema_changes?.columns_removed) {
        store.diffData.diff.schema_changes.columns_removed.forEach(removedCol => {
          if (!(removedCol in rowObj)) {
            rowObj[removedCol] = ''
          }
        })
      }
      
      allRows.push(rowObj)
    })
  }
  
  return allRows
}

// Helper function to create a signature for a row based on its values
const createRowSignature = (row) => {
  // Create a stable signature that can be used for comparing rows
  // Include only data fields (not metadata like _dataset)
  const dataFields = Object.entries(row)
    .filter(([key]) => !key.startsWith('_'))
    .map(([key, value]) => {
      // Normalize the value: convert null to empty string, trim, convert to string
      const normalizedValue = value === null || value === undefined ? "" : String(value).trim()
      return [key, normalizedValue]
    })
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
  
  // Create a string signature from the fields
  const signature = dataFields.map(([key, value]) => `${key}:${value}`).join('|')
  return signature
}

// Helper function specifically for identifying removed rows based on the sample data pattern
const isRowMatchingRemoved = (row, removedRow) => {
  // Get potential matching fields - we need to check the actual available fields
  // in each row instead of hardcoding column names
  const rowFields = Object.keys(row).filter(key => !key.startsWith('_'))
  const removedFields = Object.keys(removedRow)
  
  // Get intersection of fields present in both objects
  const keysToCheck = rowFields.filter(key => removedFields.includes(key))
  
  // Required minimum number of matching fields to consider it a match
  const minMatchingFields = 2
  
  // Count the number of matching fields
  let matchCount = 0
  
  for (const key of keysToCheck) {
    // Normalize values for comparison - treat null and empty string as equivalent
    const rowValue = row[key] === null || row[key] === undefined ? "" : String(row[key]).trim()
    const removedValue = removedRow[key] === null || removedRow[key] === undefined ? "" : String(removedRow[key]).trim()
    
    if (rowValue === removedValue) {
      matchCount++
    }
  }
  
  // Consider it a match if we have enough matching fields
  const isMatch = matchCount >= Math.min(minMatchingFields, keysToCheck.length)
  
  return isMatch
}

// Computed property for combined rows from both datasets
const combinedRows = computed(() => {
  return getFormattedRows()
})

// Helper function to determine row status class
const getRowStatusClass = (row) => {
  if (!store.diffData || !store.diffData.diff) return ''
  
  // If row is marked as added (from dataset_2)
  if (row._added) {
    return 'row-added'
  }
  
  // If row is marked as removed (directly from getFormattedRows)
  if (row._removed) {
    return 'row-removed'
  }
  
  // Check if this row was removed using the row-comparison approach
  if (isRowRemoved(row)) {
    return 'row-removed'
  }
  
  return ''
}

// Helper function to get combined cell classes
const getCellClasses = (row, columnName) => {
  const classes = []
  
  // Add column-specific classes first (these take precedence)
  if (isColumnAdded(columnName)) {
    classes.push('column-added')
    
    // For added columns in rows that aren't new, highlight the value
    if (!row._added && row[columnName] !== undefined && row[columnName] !== null && row[columnName] !== '') {
      classes.push('cell-added-value')
    } 
    // For added columns with no value
    else if (!row._added && (row[columnName] === undefined || row[columnName] === null || row[columnName] === '')) {
      classes.push('empty-cell')
    }
    
    return classes // Added columns always have green background, no need for other classes
  }
  
  if (isColumnRemoved(columnName)) {
    classes.push('column-removed')
    return classes // Removed columns always have red background, no need for other classes
  }
  
  // If row is added or removed, don't add cell-specific classes
  if (row._added || isRowRemoved(row)) {
    return classes
  }
  
  // Add cell-specific classes for changed fields
  if (isSpecificFieldChanged(row, columnName)) {
    classes.push('cell-changed')
  }
  
  return classes
}

// Get schema changes safely
const getSchemaChanges = () => {
  return store.diffData?.diff?.schema_changes || { columns_added: [], columns_removed: [], columns_changed: [] }
}

// Check if a column was added
const isColumnAdded = (columnName) => {
  const { columns_added } = getSchemaChanges()
  return columns_added?.includes(columnName) || false
}

// Check if a column was removed
const isColumnRemoved = (columnName) => {
  const { columns_removed } = getSchemaChanges()
  return columns_removed?.includes(columnName) || false
}

// Check if a column has been renamed
const isColumnRenamed = (columnName) => {
  const { columns_changed } = getSchemaChanges()
  // Only consider old column names as renamed for display purposes
  return columns_changed?.some(change => change.old === columnName) || false
}

// Get the new name for a renamed column
const getNewColumnName = (columnName) => {
  const { columns_changed } = getSchemaChanges()
  const change = columns_changed?.find(change => change.old === columnName)
  return change ? change.new : columnName
}

// Helper function for column headers to determine if added, removed, or renamed
const isColumnAddedOrRemoved = (columnName) => {
  // Check for added/removed columns
  if (isColumnAdded(columnName)) return 'column-added-header'
  if (isColumnRemoved(columnName)) return 'column-removed-header'
  if (isColumnRenamed(columnName)) return 'column-renamed-header'
  
  return ''
}

// Check if a row was removed
const isRowRemoved = (row) => {
  // Check if we already marked it as removed during initialization
  if (row._removed) return true
  
  if (!store.diffData?.diff?.data_changes?.rows_removed) return false
  
  // Only rows from dataset_1 can be "removed"
  if (row._dataset !== 'dataset_1') return false
  
  const removedRows = store.diffData.diff.data_changes.rows_removed
  
  // Try direct match first if row has an entry_id
  if (row._entry_id) {
    // Check if any removed row has a matching entry_id
    const hasDirectMatch = removedRows.some(removedRow => 
      (removedRow._entry_id && removedRow._entry_id === row._entry_id) || 
      (removedRow.entry_id && removedRow.entry_id === row._entry_id)
    )
    
    if (hasDirectMatch) return true
  }
  
  // Fall back to deeper comparison for all cases
  return removedRows.some(removedRow => isRowMatchingRemoved(row, removedRow))
}

// Check if a row was changed
// TODO: isRowChanged is probably not correct. not values_modifed, but rows changed
const isRowChanged = (row) => {
  if (!store.diffData || !store.diffData.diff || !store.diffData.diff.data_changes?.values_modified) return false
  
  // For changed rows, must ensure it's not identified as added or removed
  if (row._added || row._removed || isRowRemoved(row)) {
    return false
  }
  
  // For changed rows, match by entry_id against the 'key' property in changed rows
  if (row._entry_id && store.diffData.diff.changed.length > 0) {
    const isChanged = store.diffData.diff.changed.some(changedRow => {
      return changedRow.key == row._entry_id // Using == to handle string vs number comparison
    })
    
    return isChanged
  }
  
  return false
}

// Get row identifier for comparison
const getRowId = (row) => {
  return row._entry_id || row.entry_id
}

// Check if a specific field in a row was modified
const isSpecificFieldChanged = (row, columnName) => {
  const rowId = getRowId(row)
  if (!rowId) return false
  
  // Check in values_modified format
  const valuesModified = store.diffData?.diff?.data_changes?.values_modified
  if (valuesModified?.length) {
    return valuesModified.some(mod => 
      String(mod.row) === String(rowId) && 
      (mod.old_column === columnName || mod.new_column === columnName)
    )
  }

  // Fallback to changed format
  const changedRows = store.diffData?.diff?.data_changes?.changed
  if (changedRows?.length) {
    const changedEntry = changedRows.find(change => String(change.key) === String(rowId))
    return !!changedEntry?.changes?.[columnName]
  }
  
  return false
}

// Helper to format values, showing placeholders for empty values
const formatValue = (value) => {
  return (value === '' || value === null || value === undefined) ? '(empty)' : value
}

// Function to get the old and new values for a changed cell
const getChangedCellValues = (row, columnName) => {
  // First check in values_modified format
  if (store.diffData?.diff?.data_changes?.values_modified) {
    const modifiedValue = store.diffData.diff.data_changes.values_modified.find(mod => 
      (String(mod.row) === String(row._entry_id) || String(mod.row) === String(row.entry_id)) && 
      (mod.old_column === columnName || mod.new_column === columnName)
    )
    
    if (modifiedValue) {
      return [formatValue(modifiedValue.old_value), formatValue(modifiedValue.new_value)]
    }
  }
  
  // Fallback to changed format
  if (store.diffData?.diff?.changed) {
    const changedEntry = store.diffData.diff.changed.find(change => 
      String(change.key) === String(row._entry_id) || String(change.key) === String(row.entry_id)
    )
    
    if (changedEntry?.changes?.[columnName]) {
      const [oldValue, newValue] = changedEntry.changes[columnName]
      return [formatValue(oldValue), formatValue(newValue)]
    }
  }
  
  return ['(unknown)', '(unknown)']
}

// Additional helper to get value for a removed column in a row
// Helper function to get value for added rows
const getAddedRowValue = (row, column) => {
  // For added rows, the values are already in the correct format in the row object
  return row[column] !== undefined ? row[column] : ''
}

const getValueForRemovedColumn = (row, columnName) => {
  if (!store.diffData || !store.diffData.diff || !store.diffData.diff.data_changes?.rows_removed || !isColumnRemoved(columnName)) {
    return null
  }
  
  // If the row already has a value for this column, return it
  if (row[columnName] !== undefined && row[columnName] !== null) {
    return row[columnName]
  }
  
  // Try to find a matching removed row in rows_removed
  if (row._entry_id) {
    const removedRow = store.diffData.diff.data_changes?.rows_removed.find(r => 
      (r._entry_id && r._entry_id === row._entry_id) || 
      (r.entry_id && r.entry_id === row._entry_id)
    )
    
    if (removedRow && columnName in removedRow) {
      return removedRow[columnName]
    }
  }
  
  return ''
}

// Function to trigger comparison
const compareVersions = async () => {
  if (store.selectedDiff.length !== 2) return

  try {
    // Use the correct function name from the store
    if (typeof store.fetchDatasetDiff === 'function') {
      await store.fetchDatasetDiff()
    } else {
      return
    }
  } catch (error) {
    // Error will be handled by the store
  }
}

// Automatically trigger comparison when two nodes are selected
watch(() => store.selectedDiff, (newVal) => {
  if (newVal.length === 2) {
    isComparing.value = true
    compareVersions()
  } else {
    // Reset comparison state if selection changes
    isComparing.value = false
  }
}, { deep: true })

// Also trigger comparison when component is mounted if two nodes are already selected
onMounted(() => {
  if (store.selectedDiff.length === 2) {
    isComparing.value = true
    compareVersions()
  }
})

// Computed property to determine if data is ready for display
const ready = computed(() => {
  return isComparing.value && store.diffData && !store.isLoadingDiff && !store.diffError
})

// Helper function to create a row object from an array based on column mappings
const createRowObjectFromArray = (rowArray, columnMappings, entryId = null) => {
  const rowObj = {}
  
  // Map array values to column names
  if (columnMappings.length > 0) {
    // If we have column mappings, use them
    columnMappings.forEach((colName, idx) => {
      if (idx < rowArray.length) {
        rowObj[colName] = rowArray[idx]
      }
    })
  } else {
    // Fallback: if no column mappings, use index-based keys
    rowArray.forEach((value, idx) => {
      rowObj[`column_${idx}`] = value
    })
  }
  
  if (entryId !== null) {
    rowObj._entry_id = entryId
  }
  
  return rowObj
}

// Helper function to get column type
const getColumnType = (columnName, datasetKey) => {
  if (!store.diffData) return null
  
  const dataset = datasetKey === 'dataset_1' ? 
    (store.diffData.dataset_1 && store.diffData.dataset_1[0]) : 
    (store.diffData.dataset_2 && store.diffData.dataset_2[0])
    
  if (!dataset || !dataset.data_model || !dataset.data_model.columns) return null
  
  const columns = dataset.data_model.columns || []
  
  // Handle different column formats
  if (columns.length > 0) {
    if (Array.isArray(columns[0])) {
      // Format: [["column_name", "column_type"], ...]
      const column = columns.find(c => c[0] === columnName)
      if (column) {
        return column[1]
      }
    } else if (typeof columns[0] === 'object') {
      // Format: [{name: "column_name", dataType: "column_type"}, ...]
      const column = columns.find(c => c.name === columnName)
      if (column) {
        return column.dataType || column.type
      }
    }
  }
  
  return null
}
</script>

<style scoped>
.compare-container {
  width: 100%;
  padding: 15px;
}

/* Custom alert styling to match dataset node hover color */
.alert-orange {
  background-color: #ffe0b2;
  border-color: #ffb74d;
  color: #6d4c41;
}

/* Custom spinner color to match orange theme */
.spinner-pistis {
  color: #ffb74d;
}

.compare-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 20px;
}

.instructions-panel {
  max-width: 800px;
  margin: 0 auto;
}

.comparison-panel {
  width: 100%;
  margin-top: 20px;
}

.btn-primary {
  background: #5632d0;
  border-color: #4320b0;
}

.btn-primary:hover {
  background: #4320b0;
}

/* Integrated comparison styling */
.integrated-comparison-section {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.comparison-summary {
  padding-bottom: 10px;
  position: relative;
}

.comparison-summary .d-flex {
  padding: 8px 0 0 0;
}

.summary-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 16px;
  border-radius: 6px;
  min-width: 120px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.summary-item.added,
.summary-item.removed,
.summary-item.changed,
.summary-item.columns-added,
.summary-item.columns-removed {
  background-color: #f8f9fa;
  border-color: #e9ecef;
}

/* Badge styling to match table highlighting colors */
.badge.bg-success {
  background-color: rgba(50, 220, 103, 0.4) !important;
  color: #000 !important;
}

.badge.bg-danger {
  background-color: rgba(255, 87, 74, 0.4) !important;
  color: #000 !important;
}

.badge.bg-info {
  background-color: rgba(33, 182, 204, 0.4) !important;
  color: #000 !important;
}

.summary-item .count {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 8px;
}

.table-responsive {
  overflow-x: auto;
}

.comparison-container {
  overflow-x: auto;
  max-width: 100%;
  margin-top: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.07);
  border-radius: 6px;
}

.comparison-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: none;
  margin: 0;
  font-size: 0.95rem;
}

.comparison-table th, 
.comparison-table td {
  padding: 10px 14px;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
  vertical-align: middle;
  border-right: 1px solid #e0e0e0;
}

.comparison-table th:last-child,
.comparison-table td:last-child {
  border-right: none;
}

.comparison-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #495057;
  position: sticky;
  top: 0;
  z-index: 1;
  border-bottom: 2px solid #ddd;
  white-space: nowrap;
}

.comparison-table tbody tr:last-child td {
  border-bottom: none;
}

.comparison-table tbody tr:hover td:not(.cell-changed) {
  background-color: rgba(0, 0, 0, 0.02);
}

/* Cell styling for changed fields */
.comparison-table tbody td.cell-changed {
  background-color: rgba(33, 182, 204, 0.4) !important;
  font-weight: 600;
}

.comparison-table tbody td.cell-changed + td.cell-changed {
  border-left: none;
}

/* Cell styling for added column values */
.comparison-table tbody td.cell-added-value {
  background-color: rgba(50, 220, 103, 0.4) !important;
  font-weight: 600;
}

/* Row styling for added/removed rows */
.comparison-table tbody tr.row-added td {
  background-color: rgba(50, 220, 103, 0.3) !important;
  font-weight: 600;
}

.comparison-table tbody tr.row-added:hover td {
  background-color: rgba(50, 220, 103, 0.4) !important;
}

.comparison-table tbody tr.row-added td + td {
  border-left: none;
}

.comparison-table tbody tr.row-removed td {
  background-color: rgba(255, 87, 74, 0.3) !important;
  font-weight: 600;
}

.comparison-table tbody tr.row-removed:hover td {
  background-color: rgba(255, 87, 74, 0.4) !important;
}

.comparison-table tbody tr.row-removed td + td {
  border-left: none;
}

/* Column status styling */
td.column-added {
  background-color: rgba(50, 220, 103, 0.4) !important;
}

/* Move this after row-added to increase specificity and ensure it overrides */
.comparison-table tbody tr td.column-removed,
td.column-removed {
  background-color: rgba(255, 87, 74, 0.4) !important;
  font-weight: 600;
}

/* Empty cell in removed column */
.comparison-table tbody tr td.column-removed:empty,
.comparison-table tbody tr td.column-removed:blank,
.comparison-table tbody tr td.column-removed:has-text("") {
  background-color: rgba(244, 67, 54, 0.2) !important;
}

/* Column header styling */
.column-added-header {
  background-color: rgba(50, 220, 103, 0.4) !important;
  position: relative;
}

.added-column {
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.added-column .added-name {
  font-weight: 600;
}

.column-removed-header {
  background-color: rgba(255, 87, 74, 0.4) !important;
  position: relative;
}

/* Column renamed styling */
.column-renamed-header {
  background-color: rgba(33, 182, 204, 0.4) !important;
  position: relative;
}

.renamed-column {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  white-space: nowrap;
}

.renamed-column .old-name {
  text-decoration: line-through;
  color: #d32f2f;
  opacity: 0.75;
}

.renamed-column .arrow {
  font-size: 0.9em;
  opacity: 0.7;
}

.renamed-column .new-name {
  font-weight: 600;
}

/* Styling for the changed values display */
.changed-value {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 0;
}

.old-value {
  text-decoration: line-through;
  color: #d32f2f;
  opacity: 0.75;
  font-size: 0.9em;
  font-weight: 600;
}

.arrow {
  color: #666;
  font-weight: bold;
  font-size: 0.9em;
}

.new-value {
  color: #000000;
  font-weight: 600;
}

.data-comparison {
  padding-top: 0;
}

.schema-changes {
  padding: 0 16px 4px 16px;
}

.schema-changes h6 {
  margin: 16px 0;
  font-weight: 600;
}

/* Empty cell styling for added columns with no value */
.empty-cell {
  background-color: rgba(0, 200, 83, 0.1) !important;
}
</style>
