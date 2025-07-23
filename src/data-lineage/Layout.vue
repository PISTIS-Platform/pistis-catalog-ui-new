<template>
    <div class="layout-container">

    <main class="main">
        <slot></slot>
    </main>

    </div>
</template>
<script>

export default {
    name: 'Layout',
    setup() {

    },
}
</script>

<style>
    .layout-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        margin: 0;
        padding: 0;
    }
    
    .main{
        background-color: #F8F9FA;
        flex: 1;
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
        min-height: calc(100vh - 200px); /* Adjust for header and footer */
        padding-bottom: 30px; /* Add padding at the bottom */
        width: 100%; /* Ensure full width */
    }
</style>