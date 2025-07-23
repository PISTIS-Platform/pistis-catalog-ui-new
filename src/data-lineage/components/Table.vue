<template>
  <div>
    <!-- Global Search Input -->
    <input 
      v-model="searchQuery" 
      type="text" 
      class="global-search" 
      placeholder="Search lineage table..."
    />

    <table class="table">
      <thead>
        <tr>
          <th 
            v-for="(header, index) in props.headers" 
            :key="index" 
            class="table_head sortable" 
            scope="col"
            @click="!isResizeOperation && sortTable(header.key)"
            :class="getColumnClass(header.key)"
            :style="{ width: columnWidths[header.key] || null }"
            ref="headerRefs"
          >
            <div class="header-content">
              <span class="header-label"><strong>{{ header.label }}</strong></span>
              <span v-if="sortKey === header.key" class="sort-icon">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </span>
            </div>
            <!-- Resizable handle -->
            <div 
              class="resize-handle" 
              @mousedown.stop.prevent="startResize($event, header.key, index)"
              @touchstart.stop.prevent="startResize($event, header.key, index)"
              @click.stop.prevent=""
            ></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- Show "No records found" when search returns empty results -->
        <tr v-if="filteredTableData.length === 0">
          <td :colspan="props.headers.length" class="no-results">
            No records match your search
          </td>
        </tr>

        <!-- Render Table Rows -->
        <tr 
          v-for="(row, rowIndex) in filteredTableData" 
          :key="rowIndex"
          :class="{ 
              'highlighted': String(row.id) === String(hoveredRow) && !props.useRedHighlight,
              'highlighted-parent': hoveredParents.map(String).includes(String(row.id)) && !props.useRedHighlight,
              'highlighted-red': (String(row.id) === String(hoveredRow) && props.useRedHighlight) || 
                               props.selectedDiff.map(String).includes(String(row.id))
          }"
        >
          <td class="text-center align-middle version-column"> {{ row.version }} </td>
          <td class="align-middle id-column copyable-cell" 
              :title="row.id + '\nClick to copy'" 
              @click="copyToClipboard(row.id, rowIndex, 'id')"
              :class="{ 'copied': lastCopied === `${rowIndex}-id` }">
            <div class="copy-content">
              <span class="cell-text">{{ row.id }}</span>
            </div>
            <span v-if="lastCopied === `${rowIndex}-id`" class="copy-indicator">Copied</span>
          </td>
          <td class="align-middle operation-column copyable-cell"
              :title="formatActivityTooltip(row) + '\nClick to copy'" 
              @click="copyToClipboard(formatActivityForCopy(row), rowIndex, 'activity')"
              :class="{ 'copied': lastCopied === `${rowIndex}-activity` }">
            <div class="copy-content">
              <div class="activity-with-details">
                <span class="cell-text activity-type">{{ row.activity.toUpperCase() }}</span>
                <div v-if="row.operation_description" class="update-details">
                  <!-- Data Enrichment -->
                  <div v-if="row.operation_description.data_enrichment" class="detail-item">
                    <div class="detail-header">
                      <span class="detail-intro">
                        <strong>Data Enrichment:</strong> {{ parseDataEnrichment(row.operation_description.data_enrichment).intro }}
                      </span>
                    </div>
                    <ul class="section-items-list">
                      <li v-for="(change, index) in parseDataEnrichment(row.operation_description.data_enrichment).changes" 
                          :key="'enrich-' + index" 
                          class="section-item">
                        <span class="item-enrichment">
                          {{ change.oldName }} → {{ change.newName }}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <!-- Data Transformations -->
                  <div v-if="row.operation_description.data_transformations" class="detail-item">
                    <div class="detail-header">
                      <span class="detail-intro">
                        <strong>Data Transformations:</strong> {{ parseDataTransformations(row.operation_description.data_transformations).intro }}
                      </span>
                    </div>
                    <ul class="section-items-list">
                      <li v-for="(change, index) in parseDataTransformations(row.operation_description.data_transformations).changes" 
                          :key="'transform-' + index" 
                          class="section-item">
                        <span class="item-transformation">
                          {{ change.description }}: {{ change.details }}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <!-- Schema Changes -->
                  <div v-if="row.operation_description.schema_changes && !row.operation_description.data_enrichment" class="detail-item">
                    <div class="detail-header">
                      <span class="detail-intro">
                        <strong>Schema Changes:</strong> {{ parseSchemaChanges(row.operation_description.schema_changes).intro }}
                      </span>
                    </div>
                    <ul class="section-items-list">
                      <li v-for="(change, index) in parseSchemaChanges(row.operation_description.schema_changes).changes" 
                          :key="'schema-' + index" 
                          class="section-item"
                          :class="change.type">
                        <template v-if="change.type === 'renamed'">
                          <span class="item-renamed">{{ change.oldName }} → {{ change.newName }}</span>
                        </template>
                        <template v-else>
                          <span :class="'item-' + change.type">{{ change.text }}</span>
                        </template>
                      </li>
                    </ul>
                  </div>

                  <!-- Data Changes -->
                  <div v-if="row.operation_description.data_changes" class="detail-item">
                    <div class="detail-header">
                      <span class="detail-intro">
                        <strong>Data Changes:</strong> {{ parseDataChanges(row.operation_description.data_changes).intro }}
                      </span>
                    </div>
                    <ul class="section-items-list">
                      <li v-for="(change, index) in parseDataChanges(row.operation_description.data_changes).changes" 
                          :key="'data-' + index" 
                          class="section-item">
                        <span :class="'item-' + change.type">
                          {{ change.count }} value(s) {{ change.type }} in column '{{ change.column }}'
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <span v-if="lastCopied === `${rowIndex}-activity`" class="copy-indicator">Copied</span>
          </td>
          <td class="align-middle username-column copyable-cell" 
              :title="row.username + '\nClick to copy'" 
              @click="copyToClipboard(row.username, rowIndex, 'username')"
              :class="{ 'copied': lastCopied === `${rowIndex}-username` }">
            <div class="copy-content">
              <span class="cell-text">{{ row.username }}</span>
            </div>
            <span v-if="lastCopied === `${rowIndex}-username`" class="copy-indicator">Copied</span>
          </td>
          <td class="align-middle timestamp-column copyable-cell"
              :title="row.timestamp + '\nClick to copy'" 
              @click="copyToClipboard(row.timestamp, rowIndex, 'timestamp')"
              :class="{ 'timestamp-copied': lastCopied === `${rowIndex}-timestamp` }">
            <div class="copy-content">
              <span class="cell-text">{{ row.timestamp }}</span>
            </div>
            <span v-if="lastCopied === `${rowIndex}-timestamp`" class="copy-indicator timestamp-indicator">Copied</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>  

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

// Accept hoveredRow with a default value
const props = defineProps({
  headers: Array,
  tableData: {
      type: Array,
      default: () => [],
  },
  hoveredRow: {
      type: [String, Number], 
      default: null, 
  },
  hoveredParents: {
      type: Array,
      default: () => [],
  },
  useRedHighlight: {
      type: Boolean,
      default: false
  },
  selectedDiff: {
      type: Array,
      default: () => []
  }
});

// Track which cell was last copied
const lastCopied = ref(null);

// Add a flag to track if we're completing a resize operation
const isResizeOperation = ref(false);

// Track column widths - initialize with default values
const columnWidths = ref({});
const headerRefs = ref([]);
const isResizing = ref(false);
const currentResizingColumn = ref(null);
const startX = ref(0);
const startWidth = ref(0);

// Format activity for copy to clipboard
const formatActivityForCopy = (row) => {
  if (row.activity !== 'Update' || !row.operation_description) {
    return row.activity;
  }

  let result = 'Update';
  
  if (row.operation_description.schema_changes) {
    result += `\nSchema Changes: ${row.operation_description.schema_changes}`;
  }
  
  if (row.operation_description.data_changes) {
    result += `\nData Changes: ${row.operation_description.data_changes}`;
  }
  
  if (row.operation_description.data_transformations) {
    result += `\nData Transformations: ${row.operation_description.data_transformations}`;
  }
  
  if (row.operation_description.data_enrichment) {
    result += `\nData Enrichment: ${row.operation_description.data_enrichment}`;
  }
  
  return result;
};

// Format tooltip text for activity cell
const formatActivityTooltip = (row) => {
  return formatActivityForCopy(row);
};

// Function to start column resizing
const startResize = (event, key, index) => {
  // Since we're using .stop.prevent in the template, we don't need these here
  // But keeping them for robustness in case the template modifiers are removed
  event.stopPropagation(); 
  event.preventDefault();
  
  // Set the resize operation flag
  isResizeOperation.value = true;
  
  // Handle both mouse and touch events
  const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  
  isResizing.value = true;
  currentResizingColumn.value = key;
  startX.value = clientX;
  
  // Get current width of the column
  const headerEl = headerRefs.value[index];
  startWidth.value = headerEl.offsetWidth;
  
  // Add event listeners for resize
  document.addEventListener('mousemove', handleResize);
  document.addEventListener('touchmove', handleResize);
  document.addEventListener('mouseup', stopResize);
  document.addEventListener('touchend', stopResize);
  
  // Add a resizing class to the body to disable text selection
  document.body.classList.add('resizing');
};

// Function to handle column resizing
const handleResize = (event) => {
  if (!isResizing.value) return;
  
  // Handle both mouse and touch events
  const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  
  const delta = clientX - startX.value;
  const newWidth = Math.max(50, startWidth.value + delta) + 'px'; // Minimum width of 50px
  
  // Update column width
  columnWidths.value[currentResizingColumn.value] = newWidth;
};

// Function to stop column resizing
const stopResize = (event) => {
  if (event) {
    event.stopPropagation(); // Prevent the click event from triggering the sort
    event.preventDefault();
  }
  
  isResizing.value = false;
  document.removeEventListener('mousemove', handleResize);
  document.removeEventListener('touchmove', handleResize);
  document.removeEventListener('mouseup', stopResize);
  document.removeEventListener('touchend', stopResize);
  
  // Remove the resizing class from the body
  document.body.classList.remove('resizing');
  
  // Reset the resize operation flag after a brief delay
  // This ensures the flag is still active when the click event fires
  setTimeout(() => {
    isResizeOperation.value = false;
  }, 100);
};

// Function to copy text to clipboard with visual feedback
const copyToClipboard = (text, rowIndex, columnType) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      // Set the last copied cell identifier
      lastCopied.value = `${rowIndex}-${columnType}`;
      // Provide haptic feedback if available (mobile devices)
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(50); // Short vibration for tactile feedback
      }
      // Clear the indicator after a short delay
      setTimeout(() => {
        lastCopied.value = null;
      }, 1500); // Extended from 1000ms to 1500ms for better visibility
    })
    .catch(err => {
      console.error('Error copying text: ', err);
    });
};

// Function to determine column classes based on column key
const getColumnClass = (key) => {
  return {
    'version-column': key === 'version',
    'id-column': key === 'id',
    'operation-column': key === 'activity',
    'username-column': key === 'username',
    'timestamp-column': key === 'timestamp',
    'operation-description-column': key === 'operation_description'
  };
};

// Watch hoveredRow and log updates from the parent
watch(() => props.hoveredRow, (newValue) => {
});

const sortKey = ref("version");
const sortOrder = ref("desc");
const searchQuery = ref("");

// Sorting Function
const sortTable = (key) => {
  if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
      sortKey.value = key;
      sortOrder.value = "asc";
  }
};

// Computed: Filtered & Sorted Table Data
const filteredTableData = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();

  if (!query) return sortedTableData.value;

  return sortedTableData.value.filter(row => {
    return props.headers.some(header => {
      const value = row[header.key];
      if (value === null || value === undefined) return false;
      
      // Special handling for operation_description
      if (header.key === 'activity' && row.activity === 'Update' && row.operation_description) {
        // Check in operation_description fields
        const opDesc = row.operation_description;
        if ((opDesc.schema_changes && String(opDesc.schema_changes).toLowerCase().includes(query)) ||
            (opDesc.data_changes && String(opDesc.data_changes).toLowerCase().includes(query)) ||
            (opDesc.data_transformations && String(opDesc.data_transformations).toLowerCase().includes(query)) ||
            (opDesc.data_enrichment && String(opDesc.data_enrichment).toLowerCase().includes(query))) {
          return true;
        }
      }
      
      return String(value).toLowerCase().includes(query);
    });
  });
});

// Computed: Sorted Table Data
const sortedTableData = computed(() => {
  return [...props.tableData].sort((a, b) => {
      const valueA = a[sortKey.value] ?? "";
      const valueB = b[sortKey.value] ?? "";

      if (typeof valueA === "string" && typeof valueB === "string") {
          return sortOrder.value === "asc"
              ? valueA.localeCompare(valueB, undefined, { numeric: true })
              : valueB.localeCompare(valueA, undefined, { numeric: true });
      } else {
          return sortOrder.value === "asc" ? valueA - valueB : valueB - valueA;
      }
  });
});

// Ensure the table is sorted on mount
onMounted(() => {
  sortTable("version");
  
  // Initialize default column widths based on CSS class settings
  props.headers.forEach(header => {
    // Set initial widths based on column type
    switch(header.key) {
      case 'version':
        columnWidths.value[header.key] = '12%';
        break;
      case 'id':
        columnWidths.value[header.key] = '13%';
        break;
      case 'activity':
        columnWidths.value[header.key] = '46%';
        break;
      case 'username':
        columnWidths.value[header.key] = '13%';
        break;
      case 'timestamp':
        columnWidths.value[header.key] = '16%';
        break;
      default:
        columnWidths.value[header.key] = 'auto';
    }
  });
});

// Function to highlight added and removed items
const highlightAddedRemovedItems = (text) => {
  if (!text || typeof text !== 'string') return text;

  // Define patterns for addition and removal
  const columnAddedPattern = /(\d+)\s+columns?\s+added\s*\(([^)]+)\)/gi;
  const columnRemovedPattern = /(\d+)\s+columns?\s+removed\s*\(([^)]+)\)/gi;
  const recordAddedPattern = /(\d+)\s+records?\s+added/gi;
  const recordRemovedPattern = /(\d+)\s+records?\s+removed/gi;
  const recordModifiedPattern = /(\d+)\s+records?\s+modified/gi;
  const removedRecordsPattern = /Removed\s+(\d+)\s+records?\s+with\s+missing\s+values/gi;
  const missingValuesPattern = /Missing\s+values\s+replaced\s+with.*?(\([^)]+\))/gi;
  
  // Replace patterns with highlighted versions
  let result = text
    // Handle column additions
    .replace(columnAddedPattern, '<span class="item-added">$&</span>')
    // Handle column removals
    .replace(columnRemovedPattern, '<span class="item-removed">$&</span>')
    // Handle record additions
    .replace(recordAddedPattern, '<span class="item-added">$&</span>')
    // Handle record removals
    .replace(recordRemovedPattern, '<span class="item-removed">$&</span>')
    // Handle removed records with missing values
    .replace(removedRecordsPattern, '<span class="item-removed">$&</span>')
    // Handle record modifications (normal styling)
    .replace(recordModifiedPattern, '<span>$&</span>')
    // Handle missing values replacement (highlight the columns in parentheses)
    .replace(missingValuesPattern, function(match, columns) {
      return match.replace(columns, '<span class="item-added">' + columns + '</span>');
    });

  return result;
};

// Check if the row has no changes
const isNoChanges = (row) => {
  // Check if operation description contains the "no changes" message
  if (typeof row.activity === 'string' && 
      row.activity.includes("No changes detected in the dataset")) {
    return true;
  }
  
  // Check if JSON is empty or all sections are empty
  if (row.operation_description) {
    const sections = ['schema_changes', 'data_changes', 'data_transformations'];
    const allEmpty = sections.every(section => 
      !row.operation_description[section] || 
      row.operation_description[section] === "None" ||
      String(row.operation_description[section]).trim() === ""
    );
    return allEmpty && !hasDataEnrichment(row);
  }
  
  return false;
};

// Check if a specific section has content
const hasSection = (row, sectionName) => {
  if (!row || !row.operation_description) return false;
  
  // Get the content for this section
  const content = row.operation_description[sectionName];
  
  // Check if content exists and is not empty
  return content !== null && 
         content !== undefined && 
         String(content).trim() !== "" && 
         content !== "None";
};

// Check if the row has data enrichment information
const hasDataEnrichment = (row) => {
  // Check for operation_description JSON format
  if (row.operation_description && typeof row.operation_description === 'object') {
    return row.operation_description.data_enrichment !== null && 
           row.operation_description.data_enrichment !== undefined;
  }
  
  // Legacy format check (string)
  if (typeof row.activity === 'string') {
    return row.activity.includes("Data Enrichment:") || 
           row.activity.includes("Format Change:");
  }
  
  return false;
};

// Extract data enrichment information
const extractDataEnrichment = (row) => {
  // First try to get from JSON
  if (row.operation_description && row.operation_description.data_enrichment) {
    return row.operation_description.data_enrichment;
  }
  
  // Fallback to parsing from string
  if (typeof row.activity === 'string') {
    // Try to extract Data Enrichment section
    const enrichMatch = row.activity.match(/[-\s]*(Data\s*Enrichment)[:;]([^-]*?)(?=\n-|\n\n|$)/i);
    if (enrichMatch) {
      return enrichMatch[2].trim();
    }
    
    // Try to extract Format Change section
    const formatMatch = row.activity.match(/[-\s]*(Format\s*Change)[:;]([^-]*?)(?=\n-|\n\n|$)/i);
    if (formatMatch) {
      return formatMatch[2].trim();
    }
  }
  
  return "None";
};

// Helper function to parse schema changes
const parseSchemaChanges = (schemaChanges) => {
  if (!schemaChanges) return { intro: '', changes: [] };
  
  const changes = [];
  let intro = '';
  
  // First, try to extract the intro sentence that describes the total changes
  const totalChangesMatch = schemaChanges.match(/^(.*?)(?=\.\s*(?:Added|Removed|Renamed))/);
  if (totalChangesMatch) {
    intro = totalChangesMatch[1].trim();
  }
  
  // Parse added columns
  const addedMatch = schemaChanges.match(/Added (\d+) column\(s\): (.*?)\./);
  if (addedMatch) {
    const addedColumns = addedMatch[2].split(', ').map(col => col.trim());
    changes.push(...addedColumns.map(col => ({ type: 'added', text: col })));
  }
  
  // Parse removed columns
  const removedMatch = schemaChanges.match(/Removed (\d+) column\(s\): (.*?)\./);
  if (removedMatch) {
    const removedColumns = removedMatch[2].split(', ').map(col => col.trim());
    changes.push(...removedColumns.map(col => ({ type: 'removed', text: col })));
  }
  
  // Parse renamed columns
  const renamedMatch = schemaChanges.match(/Renamed (\d+) column\(s\): (.*?)\./);
  if (renamedMatch) {
    const renamedPairs = renamedMatch[2].split(', ').map(pair => {
      const [oldName, newName] = pair.split(' → ').map(name => name.trim().replace(/['"]/g, ''));
      return { type: 'renamed', oldName, newName };
    });
    changes.push(...renamedPairs);
  }
  
  // If no intro was found but we have changes, create a summary intro
  if (!intro && changes.length > 0) {
    const addedCount = changes.filter(c => c.type === 'added').length;
    const removedCount = changes.filter(c => c.type === 'removed').length;
    const renamedCount = changes.filter(c => c.type === 'renamed').length;
    
    const parts = [];
    if (addedCount > 0) parts.push(`Added ${addedCount} column${addedCount > 1 ? 's' : ''}`);
    if (removedCount > 0) parts.push(`Removed ${removedCount} column${removedCount > 1 ? 's' : ''}`);
    if (renamedCount > 0) parts.push(`Renamed ${renamedCount} column${renamedCount > 1 ? 's' : ''}`);
    
    intro = parts.join(', ') + '.';
  }
  
  return { intro, changes };
};

// Helper function to parse data changes
const parseDataChanges = (dataChanges) => {
  if (!dataChanges) return { intro: '', changes: [] };
  
  const changes = [];
  let intro = '';
  
  // Extract intro sentence
  const introMatch = dataChanges.match(/^(.*?)(?=- Column|$)/);
  if (introMatch) {
    intro = introMatch[1].trim();
  }
  
  const columnMatches = dataChanges.matchAll(/- Column '([^']+)': (\d+) value\(s\) (modified|added|removed)\./g);
  
  for (const match of columnMatches) {
    const [_, column, count, action] = match;
    changes.push({
      type: action,
      column,
      count: parseInt(count)
    });
  }
  
  return { intro, changes };
};

// Helper function to parse data transformations
const parseDataTransformations = (transformations) => {
  if (!transformations) return { intro: '', changes: [] };
  
  const changes = [];
  let intro = '';
  
  // Extract intro sentence - everything before the first dash
  const introMatch = transformations.match(/^(.*?)(?=\s*-\s+|$)/);
  if (introMatch) {
    intro = introMatch[1].trim();
  }
  
  // Split the transformations by looking for lines that start with a dash
  // This captures the entire transformation item even if it contains colons or commas
  const transformationItems = transformations.split(/\n\s*-\s+/).slice(1);
  
  // If no items were found using newlines, try splitting on dash with space directly
  if (transformationItems.length === 0 && transformations.includes('- ')) {
    const dashIndex = transformations.indexOf('- ');
    if (dashIndex > -1) {
      const item = transformations.substring(dashIndex + 2).trim();
      transformationItems.push(item);
    }
  }
  
  // Process each transformation item
  for (const item of transformationItems) {
    // Try to extract the description (before the colon) and details (after the colon)
    const colonIndex = item.indexOf(':');
    
    if (colonIndex > -1) {
      const description = item.substring(0, colonIndex).trim();
      // Get everything after the colon until the end or until a period at the end
      let details = item.substring(colonIndex + 1).trim();
      if (details.endsWith('.')) {
        details = details.substring(0, details.length - 1);
      }
      
      changes.push({
        type: 'transformation',
        description,
        details
      });
    } else {
      // If no colon is found, use the whole item as the description
      changes.push({
        type: 'transformation',
        description: item,
        details: ''
      });
    }
  }
  
  return { intro, changes };
};

// Helper function to parse data enrichment
const parseDataEnrichment = (enrichment) => {
  if (!enrichment) return { intro: '', changes: [] };
  
  const changes = [];
  let intro = '';
  
  // Extract intro sentence
  const introMatch = enrichment.match(/^(.*?)(?='[^']+' → |$)/);
  if (introMatch) {
    intro = introMatch[1].trim();
  }
  
  const enrichmentMatches = enrichment.matchAll(/'([^']+)' → '([^']+)'/g);
  
  for (const match of enrichmentMatches) {
    const [_, oldName, newName] = match;
    changes.push({
      type: 'enrichment',
      oldName,
      newName
    });
  }
  
  return { intro, changes };
};

</script>  

<style scoped>  
/* Remove alternating row colors and set consistent background for all cells */
tbody tr td {
  background-color: #ffffff !important; /* White background for all cells */
  border-left: 3px solid transparent; /* Consistent transparent border */
  transition: all 0.15s ease-in-out; /* Consistent transition timing */
}

/* Modify hover effect to apply consistently across the entire row */
tbody tr:hover {
  transform: scale(1.005);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1) !important; /* Add !important to ensure shadow is always visible */
  cursor: pointer;
  z-index: 2 !important; /* Increase z-index to ensure the shadow appears above other elements */
  position: relative; /* Ensure proper stacking context for the shadow */
}

/* Ensure the hover effect is not canceled for specific cells */
tbody tr:hover td {
  /* Apply z-index to make sure the shadow is visible */
  position: relative;
  z-index: 1;
}

/* 🔍 Styled Search Input */
.global-search {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;
}

.global-search:focus {
  border-color: #5632d0;
  box-shadow: 0px 0px 8px rgba(86, 50, 208, 0.3);
}

/* 📌 Table Styling */
.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  table-layout: fixed; /* Force the browser to respect column widths */
}

/* 📌 Table Header - Less bold styling */
thead th {
  font-weight: 400; /* Reduced from 500 */
  font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; /* Removed Bold variants */
  background-color: #5632d0;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  padding: 16px 14px;
  text-align: left;
  transition: background 0.3s ease;
  white-space: nowrap; /* Prevent line breaks in headers */
  border-bottom: 2px solid #4528a0; /* Reduced from 3px */
  letter-spacing: 0.3px; /* Reduced from 0.5px */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Reduced shadow */
  text-shadow: none; /* Removed text shadow */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Styling for header content container */
.header-content {
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-size: 1.05em; /* Reduced from 1.2em */
}

/* Styling for header label */
.header-label {
  margin-right: 6px;
  font-weight: 400; /* Changed from 200 to 400 */
  display: inline-block; /* To ensure proper rendering */
}

/* Styling for sort icon */
.sort-icon {
  display: inline-block;
  font-size: 0.9em;
  line-height: 1;
  vertical-align: middle;
  margin-left: 6px;
}

thead th.sortable:hover {
  background-color: #4528a0;
  box-shadow: inset 0 -2px 0 rgba(255, 255, 255, 0.3);
}

/* Column width specifications */
.version-column {
  width: 12%;
  min-width: 120px;
}

.id-column {
  width: 13%;
  min-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.operation-column {
  width: 46%;
  min-width: 300px;
  max-width: none; /* Allow column to grow wider if needed */
}

.username-column {
  width: 13%;
  min-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.timestamp-column {
  width: 16%;
  min-width: 140px;
}

/* Add this new style to preserve newlines */
.operation-description {
  white-space: normal; /* Changed from pre-line to work with our new formatting */
  text-align: left;
  word-break: normal;
  overflow-wrap: break-word; /* Allow long words to break */
  line-height: 1.4;
}

/* Enhanced styling for all table cells to match activity styling */
td {
  word-break: normal;
  overflow-wrap: break-word;
  padding: 14px 12px;
  border-bottom: 1px solid #eaeaea;
  transition: all 0.2s ease; /* Standardized transition timing to match other elements */
}

/* Special styling for version cell with increased specificity */
.table tbody tr td.version-column,
.table tbody tr:nth-child(even) td.version-column,
.table tbody tr:nth-child(odd) td.version-column,
.table tbody tr:hover td.version-column {
  font-weight: 600;
  color: #000000;
  text-align: center;
  font-size: 1.05em;
  border-left: 3px solid transparent;
  background-color: #ffffff; /* Removed !important flag to allow highlighted backgrounds */
  transition: all 0.2s ease; /* Standardized transition timing to 0.2s ease */
}

/* Update the hover rule for version column - don't override the row hover effect */
tbody tr:hover td.version-column {
  background-color: #ffffff;
  /* Don't override the row's box shadow */
}

/* Ensure highlighted rows don't change version column background */
tbody tr.highlighted td.version-column {
  background-color: #ffe0b2 !important; /* Match the highlighted row orange background */
  transition: all 0.2s ease !important; /* Standardized transition timing */
  border-left: 3px solid transparent !important;
}

tbody tr.highlighted-parent td.version-column {
  background-color: #fff3e0 !important; /* Match the highlighted parent row light orange background */
  transition: all 0.2s ease !important; /* Standardized transition timing */
  border-left: 3px solid transparent !important; /* Keep transparent border during transitions */
}

/* Special styling for ID cell - keeping consistent background */
td.id-column {
  font-weight: 500;
  color: #333;
  border-left: 3px solid transparent;
  transition: all 0.2s ease; /* Standardized transition timing */
  /* background-color is already set globally */
}

td.id-column:hover {
  border-left: 3px solid #5632d0;
  background-color: #ffffff !important; /* Keep white background on hover */
  /* Don't override the row's box shadow */
}

/* Special styling for username cell */
td.username-column {
  font-weight: 500;
  color: #333;
  border-left: 3px solid transparent;
  transition: all 0.2s ease; /* Standardized transition timing */
}

td.username-column:hover {
  border-left: 3px solid #5632d0;
  background-color: #ffffff !important; /* Keep white background on hover */
  /* Don't override the row's box shadow */
}

/* Special styling for timestamp cell - with no visual feedback */
td.timestamp-column {
  font-weight: 500;
  color: #333;
  border-left: 3px solid transparent !important; /* Always maintain transparent border */
  transition: all 0.2s ease; /* Standardized transition timing */
  /* background-color is already set globally */
}

td.timestamp-column:hover {
  border-left: 3px solid transparent !important; /* Force transparent border on hover */
  background-color: transparent !important; /* Keep transparent background on hover */
  cursor: pointer; /* Show pointer cursor only */
}

/* Override the hover highlight for timestamp column */
td.timestamp-column.copyable-cell:hover {
  background-color: transparent !important;
  border-left: 3px solid transparent !important;
  /* Remove any other hover styling */
}

/* Override the copyable-cell styling for timestamp */
td.timestamp-column.copyable-cell {
  cursor: pointer !important; /* Use pointer cursor */
}

/* Override timestamp column when in copied state */
td.timestamp-column.copied,
td.timestamp-column.timestamp-copied {
  animation: none !important; /* Disable pulse animation */
  background-color: transparent !important; /* Keep transparent background */
  border-left: 3px solid transparent !important; /* Keep transparent border */
}

/* Special style for timestamp copy indicator */
.timestamp-indicator {
  background-color: rgba(86, 50, 208, 0.9) !important; /* Slightly more transparent */
  top: -40px !important; /* Position it a bit higher */
  font-size: 12px !important;
}

/* Base styles for all table cells */
.table td {
  border-left: 3px solid transparent; /* Consistent transparent border for all cells */
}

/* Update highlighting styles to restore orange background */
tbody tr.highlighted td {
  background-color: #ffe0b2 !important; /* Orange background */
  transition: all 0.2s ease !important; /* Standardized transition timing */
  border-left: 3px solid transparent !important; /* Keep transparent border during transitions */
}

tbody tr.highlighted-parent td {
  background-color: #fff3e0 !important; /* Light orange background */
  transition: all 0.2s ease !important; /* Standardized transition timing */
  border-left: 3px solid transparent !important; /* Keep transparent border during transitions */
}

/* Update highlighted-red style to use orange instead of red */
tbody tr.highlighted-red td {
  background-color: #ffe0b2 !important; /* Orange background (changed from red #ff6b6b) */
  color: #333 !important; /* Black text for better contrast (changed from white) */
  transition: all 0.2s ease !important; /* Standardized transition timing */
  border-left: 3px solid transparent !important; /* Keep transparent border during transitions */
}

/* Add no-results styling */
.no-results {
  text-align: center;
  padding: 20px;
  color: #666;
  font-style: italic;
  background-color: rgba(240, 240, 250, 0.3);
  border-radius: 4px;
}

/* Updated copy cell styling for better affordance */
.copyable-cell {
  user-select: none; /* Prevent text selection on click */
  position: relative; /* For positioning the copy indicator */
  cursor: pointer !important; /* Always show copy cursor */
  transition: all 0.15s ease-in-out; /* Match transition with row highlights */
}

/* Add a subtle background to indicate it's interactive, but don't override row effects */
.copyable-cell:hover {
  background-color: rgba(86, 50, 208, 0.05); /* Light purple background */
  border-left: 3px solid #5632d0;
  /* DO NOT add position or z-index here - they would create a new stacking context */
}

/* Override specific hover styles for ID, username and timestamp columns */
td.id-column:hover,
td.username-column:hover {
  border-left: 3px solid #5632d0;
  background-color: #ffffff !important; /* Keep white background on hover */
  /* DO NOT add position or z-index that would create a new stacking context */
}

td.timestamp-column:hover {
  border-left: 3px solid transparent !important; /* Force transparent border on hover */
  background-color: transparent !important; /* Keep transparent background on hover */
  cursor: pointer; /* Show pointer cursor only */
}

/* Ensure highlighted rows take precedence over hover states */
tbody tr.highlighted td.copyable-cell:hover,
tbody tr.highlighted-parent td.copyable-cell:hover,
tbody tr.highlighted-red td.copyable-cell:hover {
  background-color: inherit !important; /* Inherit the row's background color */
  border-left: 3px solid transparent !important; /* Use transparent border instead of none */
}

/* Copy content layout */
.copy-content {
  display: flex;
  align-items: center;
  position: relative;
}

.cell-text {
  flex: 1;
}

/* Copy indicator tooltip */
.copy-indicator {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #5632d0;
  color: white;
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  pointer-events: none;
  z-index: 10;
  white-space: nowrap; /* Prevent text wrapping */
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  animation: fadeInDown 0.3s ease-out;
  letter-spacing: 0.3px;
}

/* Add a small arrow/triangle to the tooltip */
.copy-indicator::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -6px;
  border-width: 6px;
  border-style: solid;
  border-color: #5632d0 transparent transparent transparent;
}

/* Enhanced animation for tooltip */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate(-50%, -10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

/* Enhanced copy feedback animation */
.copied {
  animation: clickPulse 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes clickPulse {
  0% { background-color: transparent; transform: scale(1); }
  30% { background-color: rgba(86, 50, 208, 0.15); transform: scale(0.98); }
  60% { background-color: rgba(86, 50, 208, 0.1); transform: scale(1.01); }
  100% { background-color: transparent; transform: scale(1); }
}

/* Resizable columns */
.table_head {
  position: relative;
}

.resize-handle {
  position: absolute;
  top: 0;
  right: 0;
  width: 6px;
  height: 100%;
  cursor: col-resize;
  z-index: 1;
}

.resize-handle:hover, 
.resize-handle:active {
  background-color: rgba(255, 255, 255, 0.4);
}

/* Prevent text selection during resize */
body.resizing {
  cursor: col-resize !important;
  user-select: none;
}

body.resizing * {
  cursor: col-resize !important;
}

/* Ensure all columns can be resized properly */
.table th, .table td {
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Add enhanced styling for operation descriptions */
.activity-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.activity-header {
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
  font-size: 1em;
  text-transform: uppercase; /* Keep uppercase for CREATE, UPDATE, DELETE */
  letter-spacing: normal;
}

.activity-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.activity-section {
  display: flex;
  flex-direction: column;
  gap: 2px;
  background-color: rgba(240, 240, 250, 0.5);
  padding: 6px 8px;
  border-radius: 4px;
  border-left: 3px solid #5632d0;
  margin-top: 3px;
}

.section-title {
  font-weight: 500;
  margin-bottom: 4px;
  color: #333;
}

/* Styling for the bullet point list */
.section-items-list {
  list-style-type: none;
  padding-left: 16px;
  margin: 0;
}

.section-item {
  padding: 2px 0;
  position: relative;
}

/* Default bullet styling - only for transformations */
.section-item:has(.item-transformation)::before {
  content: '•';
  position: absolute;
  left: -12px;
  color: #9e9e9e;
  font-size: 14px;
}

/* Remove bullet for items with custom symbols */
.section-item:has(.item-added, .item-removed, .item-renamed, .item-enrichment, .item-modified)::before {
  content: none;
}

/* Custom symbols */
.item-added::before {
  content: '+';
  position: absolute;
  left: -12px;
  color: #333333;
  font-size: 16px;
}

.item-removed::before {
  content: '-';
  position: absolute;
  left: -12px;
  color: #333333;
  font-size: 16px;
}

.item-renamed::before,
.item-modified::before {
  content: '•';
  position: absolute;
  left: -12px;
  color: #333333;
  font-size: 14px;
}

.item-enrichment::before {
  content: '•';
  position: absolute;
  left: -12px;
  color: #333333;
  font-size: 14px;
}

.item-added {
  color: #333333;
  font-weight: 500;
  position: relative;
}

.item-removed {
  color: #333333;
  font-weight: 500;
  position: relative;
}

.item-renamed,
.item-modified {
  color: #333333;
  font-weight: 500;
  position: relative;
}

.item-transformation {
  color: #333333;
  font-weight: 500;
}

.item-enrichment {
  color: #333333;
  font-weight: 500;
  position: relative;
}

/* Ensure text color matches symbol color for data changes */
.section-item .item-added,
.section-item .item-removed,
.section-item .item-renamed,
.section-item .item-modified,
.section-item .item-enrichment {
  color: #333333;
}

.section-item .item-added {
  color: #333333;
}

.section-item .item-removed {
  color: #333333;
}

.section-item .item-renamed,
.section-item .item-modified {
  color: #333333;
}

.section-item .item-enrichment {
  color: #333333;
}

/* Override version column style to ensure it gets highlighted at the same time */
tbody tr.highlighted td.version-column {
  background-color: #ffe0b2 !important; /* Match the highlighted row orange background */
  transition: all 0.2s ease !important; /* Standardized transition timing */
  border-left: 3px solid transparent !important; /* Keep transparent border during transitions */
}

tbody tr.highlighted-parent td.version-column {
  background-color: #fff3e0 !important; /* Match the highlighted parent row light orange background */
  transition: all 0.2s ease !important; /* Standardized transition timing */
  border-left: 3px solid transparent !important; /* Keep transparent border during transitions */
}

tbody tr.highlighted-red td.version-column {
  background-color: #ffe0b2 !important; /* Match the highlighted row orange background (changed from red) */
  color: #333 !important; /* Black text for better contrast (changed from white) */
  transition: all 0.2s ease !important; /* Standardized transition timing */
  border-left: 3px solid transparent !important; /* Keep transparent border during transitions */
}

/* Styling for "No changes" message */
.no-changes-message {
  padding: 8px 10px;
  background-color: rgba(240, 240, 250, 0.6);
  border-radius: 4px;
  color: #555;
  font-style: italic;
  text-align: center;
  border-left: 3px solid #aaa;
  margin: 4px 0;
}

/* Operation Description Column */
.operation-description-column {
  display: none;
}

.operation-details {
  white-space: normal;
  overflow: visible;
}

.detail-section {
  margin-bottom: 8px;
}

.detail-header {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
}

.detail-content {
  padding-left: 8px;
}

/* New styles for activity column with enhanced details */
.activity-with-details {
  display: flex;
  flex-direction: column;
  gap: 6px; /* Increased from 4px */
}

.activity-type {
  font-weight: 500;
  color: #333333;
  font-size: 1.1em;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-family: inherit;
  margin-bottom: 0;
  display: inline-block;
}

.update-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
}

.detail-item {
  font-size: 0.95em;
  line-height: 1.4;
  padding: 12px 16px;
  border-left: 2px solid #5632d0;
  margin: 8px 0;
  background-color: rgba(86, 50, 208, 0.03);
  border-radius: 0 6px 6px 0;
}

.detail-label {
  font-weight: 600;
  color: #333333;
  display: block;
  margin-bottom: 4px;
  white-space: nowrap;
  padding-top: 2px;
}

.detail-intro {
  color: #444444;  /* Changed from #666666 to a darker gray */
  font-size: 0.95em;
  line-height: 1.5;
  margin-bottom: 12px;
  font-style: italic;
}

.detail-intro strong {
  color: #5632d0;
  font-weight: 600;
  font-size: 1.1em;
  margin-right: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
  padding-bottom: 2px;
  border-bottom: 2px solid rgba(86, 50, 208, 0.2);
}

/* Column width adjustment for activity column to accommodate more content */
.operation-column {
  width: 46%;
  min-width: 300px;
  max-width: none; /* Allow column to grow wider if needed */
}

/* Ensure operation-description column is removed from view */
.operation-description-column {
  display: none;
}

/* Ensure that when hovering over the activity cell, the details remain visible */
.copyable-cell:hover .update-details {
  visibility: visible;
  opacity: 1;
}

/* When a row is highlighted, ensure the details have proper contrast */
tbody tr.highlighted .detail-item,
tbody tr.highlighted-parent .detail-item,
tbody tr.highlighted-red .detail-item {
  background-color: rgba(255, 255, 255, 0.5);
}

/* Adjust spacing in operation column to better display details */
td.operation-column {
  padding: 16px 18px;
}

/* Update detail label styling */
.detail-label {
  font-weight: 600;
  color: #333333;
  display: block;
  margin-bottom: 4px;
  white-space: nowrap;
  padding-top: 2px;
}

</style>
