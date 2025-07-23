import { defineStore } from 'pinia'
import config from '../data-lineage/config';
import axios from 'axios'
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import mockData from './mock-lineage.json'
import mockCompare from './mock-compare.json'

export const useStore = defineStore('store', () => {
    const selectedOption = ref('dataset-history')
    const isCompareVisible = ref(false)
    const navigation = ref(config.navigation)
    const subNav = ref(config.subNav)
    const keycloak = ref(config.keycloak)
    const familyTreeData = ref(null)
    const treeObject = ref(null)
    const displayState = ref('tracker')

    // Dataset comparison related state
    const diffData = ref(null)
    const isLoadingDiff = ref(false)
    const diffError = ref(null)

    const authStore = useAuthStore()
    const tableData = ref(null)
    const selectedDiff = ref([])

    const addtoDiff = (diffID) =>{
        if(selectedDiff.value.length===2){
            // Instead of showing an alert, replace both previous selections with just this new node
            selectedDiff.value = [diffID];
        } else {
            // Add the node to selectedDiff
            selectedDiff.value.push(diffID);
            
            if(selectedDiff.value.length===2){
                isCompareVisible.value = true;
                displayState.value = 'diff';
                // Auto-fetch diff data when two datasets are selected
                fetchDatasetDiff();
            }
        }
    }

    const resetDiff = () => {
        selectedDiff.value = []
        // Also reset the diff data state
        diffData.value = null
        diffError.value = null
    }

    const openCompare = (() => {
        isCompareVisible.value = !isCompareVisible
    })

    // Fetch dataset differences
    const fetchDatasetDiff = async () => {
        // Use the IDs from selectedDiff if provided, otherwise expect explicit IDs
        const id1 = selectedDiff.value[0];
        const id2 = selectedDiff.value[1];
        
        if (!id1 || !id2) {
            console.error('Two valid dataset IDs must be selected for comparison');
            diffError.value = 'Two datasets must be selected for comparison';
            return;
        }

        isLoadingDiff.value = true;
        diffError.value = null;
        
        try {
            // commented out for dev with mock data
            // const backendUrl = keycloak.value.backendBaseApiHost || '';
            // const url = `${backendUrl}srv/lineage-tracker/get_datasets_diff`;
            
            // const response = await axios.get(url, {
            //     params: {
            //         uuid_1: id1,
            //         uuid_2: id2
            //     },
            //     headers: {
            //         'Authorization': `Bearer ${authStore.token}`,
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json'
            //     }
            // });
            
            // Store the response data in diffData
            // diffData.value = response.data;

            // working with mockdata
            const response = mockCompare;
            diffData.value = response;
            
            
            console.log('Dataset comparison data received:', diffData.value);
        } catch (err) {
            console.error('Error fetching dataset comparison data:', err);
            diffError.value = err.response?.data?.message || 'Failed to fetch comparison data';
        } finally {
            isLoadingDiff.value = false;
        }
    };

    const parseTableData = (apiData) => {
        let data = apiData;
        let tempVersionedObject = {};
    
        for (let lineageId in data) {
            const lineageGroup = data[lineageId];
    
            for (const recordId in lineageGroup) {
                const record = lineageGroup[recordId];
    
                // Combine user_group and username into one field
                const userDisplay = record.user_group ? `${record.user_group} ${record.username}` : record.username;

                tempVersionedObject[recordId] = {
                    id: recordId, 
                    version: record.version,  
                    activity: record.operation || "Unknown",
                    operation_description: record.operation_description, // This will be JSON for updates, null for others
                    username: userDisplay,  
                    timestamp: formatDate(record.timestamp), 
                };
            }
        }
    
        // Sort by version (assuming versions are numbers)
        const sortedKeys = Object.keys(tempVersionedObject).sort((a, b) => {
            return tempVersionedObject[b].version - tempVersionedObject[a].version;
        });
    
        // Create sorted object
        const sortedTableData = {};
        sortedKeys.forEach(key => {
            sortedTableData[key] = tempVersionedObject[key];
        });

        tableData.value = sortedTableData;
    };
    
    // Helper Functions
    const capitalizeFirstLetter = (str) => {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
  
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });
    };

    const selectTableFilter = ((option) => {
        selectedOption.value = option
    })

    const fetchData = async (lineageID) => {
        try {
            const response = await axios.get(`${keycloak.value.backendBaseApiHost}srv/lineage-tracker/get_dataset_family_tree?uuid=${lineageID}`, {
                headers: {
                    'Authorization': `Bearer ${authStore.token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            treeObject.value = await response.data
            familyTreeData.value = await response.data
            parseTableData(treeObject.value)
            console.log('API response:', response.data);
        } catch (error) {
            console.error('API request failed:', error);
        }
    }

    //Mock Data
    const loadMockData = async () => {
        try {
            const response = mockData;
            treeObject.value = response;
            familyTreeData.value = response;
            parseTableData(treeObject.value)
            console.log('Mock Data used:', response);
        } catch (error) {
            console.error('Loading mock data failed:', error);
        }
    }

    // A convenience method to explicitly compare two datasets by ID
    const compareDatasets = async (id1, id2) => {
        if (!id1 || !id2) {
            console.error('Two valid dataset IDs must be provided for comparison');
            return;
        }
        
        // Update selectedDiff with the provided IDs
        selectedDiff.value = [id1, id2];
        
        // Set UI state for comparison
        isCompareVisible.value = true;
        displayState.value = 'diff';
        
        // Fetch the diff data
        return fetchDatasetDiff();
    };

    return { 
        selectedOption, 
        isCompareVisible, 
        navigation, 
        subNav, 
        keycloak, 
        familyTreeData,
        treeObject, 
        selectedDiff, 
        addtoDiff, 
        resetDiff, 
        openCompare,
        diffData,
        isLoadingDiff,
        diffError,
        displayState,
        tableData,
        parseTableData,
        fetchData,
        loadMockData,
        fetchDatasetDiff,
        compareDatasets // Renamed and simplified function
    }
})
