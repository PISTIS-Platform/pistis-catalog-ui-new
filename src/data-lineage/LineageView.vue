<template>
    <Layout class="full-height-layout" style="padding-bottom: 0;">
        <div class="title-container">
            <h2 class="dataset-title">Dataset Lineage</h2>
        </div>
        
        <div class="content-wrapper tab-content-container">
            <!-- Tab Headers - Both tabs always visible regardless of environment -->
            <div class="tab-header">
                <button 
                    :class="`tab-btn ${store.displayState === 'tracker' ? 'active' : ''}`"
                    @click="setDisplayState('tracker')">
                    <span class="tab-icon">🔗</span> Lineage Table
                </button>
                <button 
                    :class="`tab-btn ${store.displayState === 'diff' ? 'active' : ''}`"
                    @click="setDisplayState('diff')">
                    <span class="tab-icon">🕒</span> Compare Versions
                </button>
            </div>

            <!-- Tab Content -->
            <div class="tab-content">
                <!-- Left Side: Tree Component -->
                <div class="tree-column">
                    <div class="component-container">
                        <CustomTreeComponent 
                            v-if="store.treeObject" 
                            :addToDiff="store.addtoDiff" 
                            :selectedDiff="store.selectedDiff" 
                            :data="store.treeObject"
                            :resetDiff="store.resetDiff"
                            @nodeHovered="highlightRow"
                        />
                    </div>
                </div>

                <!-- Right Side: Dynamic Content (Table or Compare) -->
                <div class="table-column">
                    <div class="component-container">
                        <Table 
                            v-if="store.displayState === 'tracker'"
                            :headers="[
                                { key: 'version', label: 'Version' },
                                { key: 'id', label: 'ID' },
                                { key: 'activity', label: 'Activity' },
                                { key: 'operation_description', label: 'Description' },
                                { key: 'username', label: 'Username' },
                                { key: 'timestamp', label: 'Timestamp' }
                            ]" 
                            :tableData="store.tableData ? Object.values(store.tableData) : []"
                            :hoveredRow="hoveredNode"
                            :hoveredParents="hoveredParents"
                            :useRedHighlight="useRedHighlight"
                            :selectedDiff="store.selectedDiff"
                        />
                        
                        <Compare v-if="store.displayState === 'diff'" :cloud-mode="!isFactory" />
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useStore } from '../data-lineage/store.js';
import { useRoute } from 'vue-router';
import Layout from '../data-lineage/Layout.vue';
import Table from '../data-lineage/Table.vue';
import Compare from '../data-lineage/Compare.vue';
import CustomTreeComponent from '../data-lineage/CustomTreeComponent.vue';
import config from '../data-lineage/config';

// Check environment configuration to determine deployment type
const isFactory = ref(config.keycloak.factory_or_cloud?.toLowerCase() === 'factory');
// This log is useful for understanding the deployment environment
console.log('Deployment Type:', isFactory.value ? 'Factory' : 'Cloud');

const route = useRoute();
const lineageID = route.params.id;
const store = useStore();
store.fetchData(lineageID);

// Set the default tab to 'tracker' (Lineage)
onMounted(() => {
    if (!store.displayState) {
        store.displayState = 'tracker';
    }
    
    // Add resize event listener to handle responsive layout
    window.addEventListener('resize', handleResize);
    
    // Initial call to ensure proper layout
    handleResize();
    
    // Ensure proper tree layout after data loads
    watch(() => store.treeObject, () => {
        if (store.treeObject) {
            // Allow time for the tree to render before resizing
            // Use a staggered approach to ensure proper rendering and scaling
            setTimeout(() => {
                handleResize();
                // Second resize after a bit more time to ensure everything is settled
                setTimeout(handleResize, 1000);
            }, 500);
        }
    }, { immediate: true });

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
});

// Clean up event listeners when component is destroyed
onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('scroll', handleScroll);
});

// Watch for changes in selectedDiff to clear parent highlights
watch(() => store.selectedDiff, (newValue, oldValue) => {
    // Selection state changed in any way - update highlight state
    if (newValue.length !== oldValue.length || 
        JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        
        // Clear parent node highlighting
        hoveredParents.value = [];
        
        // Use red highlighting if any nodes are selected
        useRedHighlight.value = newValue.length > 0;
    }
}, { deep: true });

// Handle window resize events to ensure tree component scales correctly
const handleResize = () => {
    // Simply dispatch a custom resize event that the tree component listens for
    window.dispatchEvent(new CustomEvent('app-resize'));
};

// Handle scroll events to ensure the tree stays visible when scrolling
const handleScroll = () => {
    // If we have a larger table that requires scrolling, this ensures
    // the tree stays in view as the user scrolls down the table
    const treeColumn = document.querySelector('.tree-column');
    if (!treeColumn) return;
    
    // Get the current scroll position
    const scrollY = window.scrollY;
    
    // Update the sticky tree's top position based on scroll
    // This ensures it follows the user as they scroll
    const containerTop = Math.max(20 - scrollY, 20);
    treeColumn.style.setProperty('--sticky-top', `${containerTop}px`);
};

// Track hovered node
const hoveredNode = ref(null);
const hoveredParents = ref([]);
// Initialize with true if there are already selected nodes
const useRedHighlight = ref(store.selectedDiff && store.selectedDiff.length > 0);
const setHoveredParents = (parentIds) => {
    // Only set parent IDs if we're not using red highlighting (no nodes selected)
    hoveredParents.value = useRedHighlight.value ? [] : [...parentIds];
};

// Track hovered node and log it
const highlightRow = (nodeId, parentIds = [], useRed = false) => {
    hoveredNode.value = nodeId;
    useRedHighlight.value = useRed;
    // Only set parent nodes when no nodes are selected
    setHoveredParents(useRed ? [] : parentIds);
};

// Set the active tab
const setDisplayState = (state) => {
    store.displayState = state;
    // When switching tabs, resize the tree after a short delay to ensure DOM has updated
    if (state === 'tracker') {
        setTimeout(handleResize, 300);
    }
};
</script>

<style>
/* Ensure full-page height */
html, body, #app {
    height: 100%;
    margin: 0;
    padding: 0;
}

.full-height-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.title-container {
    padding: 24px 30px;
    width: 100%;
    display: flex;
    align-items: center;
}

.dataset-title {
    font-size: 28px;
    font-weight: 600;
    color: #333;
    margin: 0;
    letter-spacing: -0.5px;
}

/* Content Wrapper */
.content-wrapper {
    display: flex;
    flex-direction: column;
    padding: 16px;
    padding-bottom: 20px; /* Increased bottom padding */
    background: #f9f9f9; /* Light gray background */
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    margin-top: 0px;
    height: auto; /* Allow natural height based on content */
    min-height: 600px;
    flex: 0 0 auto; /* Don't stretch to fill available space */
    overflow: visible; /* Ensure sticky elements can overflow */
}

/* Tree specific fixes */
.tree-container {
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden; /* Add overflow hidden to contain the tree */
}

/* Ensure tree component fills available space */
.component-container .tree-container {
    position: relative; /* Change from absolute to relative positioning */
    height: 100%;
    width: 100%;
    padding: 20px;
}

/* Ensure tree spacing is consistent */
.component-container .tree-container .chart-wrapper {
    padding-top: 20px; /* Change from 40px to 20px */
    overflow: hidden; /* Ensure overflow is hidden to contain the tree */
    max-height: calc(100% - 20px); /* Update from 40px to 20px to match the padding-top */
}

/* Force proper containment for the Treant component */
.Treant > .node {
    position: absolute;
}

.Treant .collapse-switch {
    width: 3px;
    height: 3px; 
}

/* Tab Header: Styled like real tabs */
.tab-header {
    margin-top: 0px;
    display: flex;
    justify-content: flex-start;
    width: 100%;
    background: #ffffff;
    border-bottom: 1px solid #e0e0e0;
    padding: 0 16px;
    gap: 24px;
    margin-bottom: 16px;
}

/* Tab Buttons */
.tab-btn {
    padding: 8px 16px;
    font-size: 15px;
    font-weight: 500;
    background: transparent;
    border: none;
    color: #444444;
    cursor: pointer;
    position: relative;
    transition: color 0.3s ease;
}

/* Add icons to tabs */
.tab-icon {
    margin-right: 8px;
}

/* Active Tab */
.tab-btn.active {
    color: #000000;
    font-weight: 600;
}

.tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: #000000;
}

/* Hover Effect */
.tab-btn:hover {
    color: #000000;
}

/* Tab Content Layout */
.tab-content {
    display: grid;
    grid-template-columns: minmax(250px, 1fr) 3fr;
    gap: 20px;
    padding: 0 20px;
    padding-bottom: 20px; /* Add padding at the bottom of tab content */
    width: 100%;
    height: auto; /* Allow natural height based on content */
    min-height: 600px; /* Increased from 500px for more content space */
    position: relative; /* Needed for sticky positioning */
}

/* Main element styling */
:deep(.main) {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    align-items: center; /* Center content horizontally */
    padding-bottom: 30px; /* Add padding at the bottom */
}

/* Adjust content wrapper to fill space */
:deep(.main) > .content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
}

/* Ensure the tab content container expands properly */
.tab-content-container {
    margin: 0 auto 30px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
    max-width: 1600px;
    width: calc(100% - 60px); /* 30px margin on each side */
    display: flex;
    flex-direction: column;
    overflow: visible; /* Allow sticky elements to "break out" of container */
}

/* Main Content Container */
.container.bg-body-tertiary {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}

.container.full-width {
    width: 100%;
    max-width: none;
    padding: 0 20px;
    margin: 0;
}

/* Flexbox Row */
.row {
    display: flex;
    flex-wrap: nowrap;
    height: 100%;
    width: 100%;
}

/* Enforce fixed percentage widths for columns */
.col-4 {
    flex: 0 0 33.33%;
    max-width: 33.33%;
    /* Prevent the column from shrinking below this percentage */
    min-width: 33.33%;
    display: flex;
    flex-direction: column;
    padding: 0;
}

.col-8 {
    flex: 0 0 66.66%;
    max-width: 66.66%;
    min-width: 66.66%;
    display: flex;
    flex-direction: column;
    padding: 0;
}

.tree-column {
    grid-column: 1;
    min-width: 0;
    width: 100%;
    max-width: 350px; /* Add maximum width for tree column */
    display: flex; /* Ensure flex display for proper sizing */
    position: relative; /* Needed for sticky positioning */
    --sticky-top: 20px; /* Initialize custom property */
}

.table-column {
    grid-column: 2;
    min-width: 0;
    width: 100%;
    flex-grow: 1; /* Allow table to grow and fill available space */
    min-width: 500px; /* Ensure minimum width for readability */
    overflow-y: auto; /* Allow vertical scrolling */
}

/* Component containers should also respect their parent container width */
.component-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    padding-bottom: 40px; /* Increased bottom padding */
    background: #FFFFFF;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    min-width: 0;
    position: relative;
    overflow: visible;
}

/* Add sticky tree column container */
.tree-column .component-container {
    overflow: hidden; /* Prevent tree from overflowing */
    padding: 10px; /* Less padding to maximize tree space */
    height: 500px; /* Set a fixed height for the tree container */
    min-height: 500px; /* Ensure minimum height */
    max-height: 500px; /* Ensure maximum height */
    display: flex; /* Use flexbox to ensure proper sizing */
    flex-direction: column; /* Stack children vertically */
    position: sticky; /* Make the tree sticky */
    top: var(--sticky-top, 20px); /* Use custom property with fallback */
    z-index: 1; /* Ensure the tree stays above other content */
}

/* Add specific styles for table container */
.table-column .component-container {
    overflow: auto; /* Allow scrolling if needed */
    padding: 20px; /* More comfortable padding for table */
}

/* Ensure the tree component fills the container */
.tree-column .component-container .tree-container {
    flex: 1; /* Take all available space */
    display: flex;
    flex-direction: column;
}

/* Ensure the tree component can scale properly */
.chart-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden; /* Change from visible to hidden */
    position: relative;
    flex: 1; /* Take remaining space */
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

/* Ensure the tree chart scales appropriately */
#tree-simple, .Treant {
    width: 100% !important;
    height: auto !important;
    max-height: 100% !important; /* Add max-height constraint */
    transform-origin: top left;
    position: relative;
}

/* Add a transition for smooth scaling */
.Treant {
    transition: transform 0.2s ease-in-out, margin-left 0.2s ease-in-out;
}

/* Remove these styles that are conflicting with the tree display */
.container.full-width,
.row,
.col-4,
.col-8,
.left-component,
.right-component {
    display: none;
}

/* Add responsive adjustments for smaller screens if needed */
@media (max-width: 768px) {
    .tab-content {
        grid-template-columns: 1fr; /* Stack components vertically on small screens */
        gap: 10px;
    }
    
    .tree-column, .table-column {
        grid-column: 1;
        max-width: 100%; /* Full width on small screens */
    }
    
    .tree-column .component-container {
        height: 400px; /* Smaller height on mobile */
        min-height: 400px;
        max-height: 400px;
    }
}

.diff-display-content {
    display: flex;
    justify-content: center;
}

.display-state-btn-container {
    display: flex;

    .tracker-btn {
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        border-right: none !important;
    }

    .diff-btn {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
        border-left: none !important;
    }

    .display-state-btn {
        font-weight: 500;
        color: #52525b;
        border: 1.4px solid #e4e4e7;
        outline: none;
        border-radius: .375rem;
        padding: .5rem .75rem !important;

        &.active {
            background-color: #462ba8;
            color: #fff;

        }
    }
}
</style>
