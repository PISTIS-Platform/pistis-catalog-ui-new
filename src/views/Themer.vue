<template>
    <div class="container relative mx-auto grid max-w-content-max mt-10">
        <div class="config space-y-6 mb-20">
            <h1 class="font-bold text-[1.375rem] mb-5">Theme Generator</h1>

            <!-- Font Family -->
            <div class="bg-white p-5 rounded-lg">
                <div class="input-group-2">
                    <label class="block font-medium mb-2">Font</label>
                    <select v-model="fontFamily" @change="updateExample" class="p-2 border rounded w-50 mb-5">
                        <option v-for="font in fonts" :key="font" :value="font">{{ font }}</option>
                    </select>
                    <p :style="{ fontFamily }" class="text-lg">piveau is an open source metadata catalogue solution</p>
                </div>
            </div>

            <!-- Colors -->
            <div class="bg-white p-5 rounded-lg mt-10">
                <div class="input-group">
                    <label class="block font-medium mb-2">Primary Color</label>
                    <input type="color" v-model="colors.primary" @input="updateExample"
                        class="w-12 h-8 p-0 border rounded" />
                    <span class="ml-2">{{ colors.primary }}</span>
                </div>

                <div class="input-group">
                    <label class="block font-medium mb-2">Primary Variant Color</label>
                    <input type="color" v-model="colors.primaryVariant" @input="updateExample"
                        class="w-12 h-8 p-0 border rounded" />
                    <span class="ml-2">{{ colors.primaryVariant }}</span>
                </div>

                <div class="input-group">
                    <label class="block font-medium mb-2">Secondary Color</label>
                    <input type="color" v-model="colors.secondary" @input="updateExample"
                        class="w-12 h-8 p-0 border rounded" />
                    <span class="ml-2">{{ colors.secondary }}</span>
                </div>

                <div class="input-group">
                    <label class="block font-medium mb-2">Error Color</label>
                    <input type="color" v-model="colors.error" @input="updateExample"
                        class="w-12 h-8 p-0 border rounded" />
                    <span class="ml-2">{{ colors.error }}</span>
                </div>

                <hr class="mb-5">

                <div class="input-group">
                    <label class="block font-medium mb-2">Background Color</label>
                    <input type="color" v-model="colors.background" @input="updateExample"
                        class="w-12 h-8 p-0 border rounded" />
                    <span class="ml-2">{{ colors.background }}</span>
                </div>

                <div class="input-group">
                    <label class="block font-medium mb-2">Surface Color</label>
                    <input type="color" v-model="colors.surface" @input="updateExample"
                        class="w-12 h-8 p-0 border rounded" />
                    <span class="ml-2">{{ colors.surface }}</span>
                </div>

                <hr class="mb-5">

                <div class="input-group">
                    <label class="block font-medium mb-2">Text on Primary</label>
                    <input type="color" v-model="colors.textOnPrimary" @input="updateExample"
                        class="w-12 h-8 p-0 border rounded" />
                    <span class="ml-2">{{ colors.textOnPrimary }}</span>
                </div>

                <div class="input-group">
                    <label class="block font-medium mb-2">Text on Secondary</label>
                    <input type="color" v-model="colors.textOnSecondary" @input="updateExample"
                        class="w-12 h-8 p-0 border rounded" />
                    <span class="ml-2">{{ colors.textOnSecondary }}</span>
                </div>

                <div class="input-group">
                    <label class="block font-medium mb-2">Text on Background</label>
                    <input type="color" v-model="colors.textOnBg" @input="updateExample"
                        class="w-12 h-8 p-0 border rounded" />
                    <span class="ml-2">{{ colors.textOnBg }}</span>
                </div>

                <div class="input-group">
                <label class="block font-medium mb-2">Text on Surface</label>
            <input type="color" v-model="colors.textOnSurface" @input="updateExample"
                class="w-12 h-8 p-0 border rounded" />
            <span class="ml-2">{{ colors.textOnSurface }}</span>
            </div>

                <hr class="mb-5">

                <div class="input-group">
                    <label class="block font-medium mb-2">Header Background</label>
                    <input type="color" v-model="colors.headerBg" @input="updateExample"
                        class="w-12 h-8 p-0 border rounded" />
                    <span class="ml-2">{{ colors.headerBg }}</span>
                </div>

                <div class="input-group">
                    <label class="block font-medium mb-2">Header Text</label>
                    <input type="color" v-model="colors.headerText" @input="updateExample"
                        class="w-12 h-8 p-0 border rounded" />
                    <span class="ml-2">{{ colors.headerText }}</span>
                </div>

                <hr class="mb-5">

                <div class="input-group">
                    <label class="block font-medium mb-2">Footer Background</label>
                    <input type="color" v-model="colors.footerBg" @input="updateExample"
                        class="w-12 h-8 p-0 border rounded" />
                    <span class="ml-2">{{ colors.footerBg }}</span>
                </div>

                <div class="input-group">
                    <label class="block font-medium mb-2">Footer Text</label>
                    <input type="color" v-model="colors.footerText" @input="updateExample"
                        class="w-12 h-8 p-0 border rounded" />
                    <span class="ml-2">{{ colors.footerText }}</span>
                </div>
            </div>

            <!-- Border Radius -->
            <div class="bg-white p-5 rounded-lg">
                <div class="input-group-2">
                    <label class="block font-medium mb-2">Border Radius</label>
                    <select v-model="borderRadius" @change="updateExample" class="p-2 border rounded w-50">
                        <option value="0">Square</option>
                        <option value="10">Middle Round</option>
                        <option value="25">Round</option>
                    </select>
                    <button :style="{
                        borderRadius: `${borderRadius}px`,
                        backgroundColor: colors.primary,
                        color: colors.textOnPrimary

                    }" class="mt-2 px-4 py-2 text-white w-50">
                        Example Button
                    </button>
                </div>
            </div>

        </div>

        <!-- Code Area -->
        <div class="code-area">
            <h2 class="font-bold text-[1.375rem] mb-5">Generated CSS</h2>
            <div class="relative">
                <textarea v-model="cssOutput" rows="20" cols="50"
                    class="w-full p-4 rounded-lg bg-white font-mono text-sm"></textarea>
                <button @click="copyConfig" class="absolute top-2 right-2 p-2 bg-gray-200 rounded hover:bg-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-copy" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                    </svg>
                </button>
            </div>
            <button @click="resetConfig" class="mt-4 px-4 py-2 bg-gray text-black rounded mr-5 rounded-3xl">
                Reset Config
            </button>

            <button @click="saveCssConfig" :style="{
                borderRadius: `${borderRadius}px`,
                backgroundColor: colors.primary,
                color: colors.textOnPrimary
            }" class="mt-2 px-4 py-2 text-white">
                Save CSS Config
            </button>

        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
    setup() {
        const fontFamily = ref('Inter');
        const borderRadius = ref('25');
        const fonts = ['Arial', 'Courier New', 'Georgia', 'Century Gothic', 'Times New Roman', 'Verdana', 'Inter'];

        const colors = ref({
            primary: '#7B61FF',
            primaryVariant: '#3B2F79',
            primaryLight: '#ece8ff',
            primaryDisabled: '#8d8d8d',
            secondary: '#B5D0D7',
            secondaryVariant: '#2f6f88',
            secondaryDisabled: '#8d8d8d',
            background: '#F4F4F4',
            surface: '#FFFFFF',
            error: '#D15353',
            gray: '#dbdbdb',
            black: '#000000',
            textOnPrimary: '#ffffff',
            textOnSecondary: '#262626',
            textOnBg: '#262626',
            textOnSurface: '#262626',
            textOnError: '#ffffff',
            headerBg: '#ffffff',
            headerText: '#262626',
            footerBg: '#424242',
            footerText: '#ffffff',
        });

        const cssOutput = ref('');

        const generateCss = () => {
            cssOutput.value = `
    /************************/
    /***** Piveau Fonts *****/
    /************************/
    --font-sans: "${fontFamily.value}", sans-serif;
    --font-display: "${fontFamily.value}", sans-serif;

    /********************************/
    /***** Piveau Border-radius *****/
    /*******************************/
    --border-radius-custom: ${borderRadius.value}px;
    --border-radius-search: 100px;

    /*****************************/
    /* Piveau Background Colors */
    /*****************************/
    --piveau-primary: ${colors.value.primary};
    --piveau-primary-variant: ${colors.value.primaryVariant};
    --piveau-primary-light: ${colors.value.primaryLight};
    --piveau-primary-disabled: ${colors.value.primaryDisabled};
    --piveau-secondary: ${colors.value.secondary};
    --piveau-secondary-variant: ${colors.value.secondaryVariant};
    --piveau-secondary-disabled: ${colors.value.secondaryDisabled};
    --piveau-background: ${colors.value.background};
    --piveau-surface: ${colors.value.surface};
    --piveau-error: ${colors.value.error};
    --piveau-gray: ${colors.value.gray};
    --piveau-black: ${colors.value.black};

    /**********************/
    /* Piveau Text colors */
    /**********************/
    --piveau-text-on-primary: ${colors.value.textOnPrimary};
    --piveau-text-on-secondary: ${colors.value.textOnSecondary};
    --piveau-text-on-bg: ${colors.value.textOnBg};
    --piveau-text-on-surface: ${colors.value.textOnSurface};
    --piveau-text-on-error: ${colors.value.textOnError};

    /*************************/
    /* Header and Footer */
    /*************************/
    --piveau-header-bg: ${colors.value.headerBg};
    --piveau-header-text: ${colors.value.headerText};
    --piveau-footer-bg: ${colors.value.footerBg};
    --piveau-footer-text: ${colors.value.footerText};
    `;
        };

        const updateExample = () => {
            generateCss();
        };

        const saveCssConfig = () => {
            const blob = new Blob([cssOutput.value], { type: 'text/css' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'piveau-theme.css';
            link.click();
        };

        const copyConfig = async () => {
            try {
                await navigator.clipboard.writeText(cssOutput.value);
                alert('Configuration copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        };

        const resetConfig = () => {
            fontFamily.value = 'Inter';
            borderRadius.value = '25';
            colors.value = {
                primary: '#7B61FF',
                primaryVariant: '#3B2F79',
                primaryLight: '#ece8ff',
                primaryDisabled: '#8d8d8d',
                secondary: '#B5D0D7',
                secondaryVariant: '#2f6f88',
                secondaryDisabled: '#8d8d8d',
                background: '#F4F4F4',
                surface: '#FFFFFF',
                error: '#D15353',
                gray: '#dbdbdb',
                black: '#000000',
                textOnPrimary: '#ffffff',
                textOnSecondary: '#262626',
                textOnBg: '#262626',
                textOnSurface: '#262626',
                textOnError: '#ffffff',
                headerBg: '#ffffff',
                headerText: '#262626',
                footerBg: '#424242',
                footerText: '#ffffff',
            };
            generateCss();
        };

        watch(
            [fontFamily, borderRadius, colors],
            () => {
                generateCss();
            },
            { deep: true }
        );

        generateCss();

        return {
            fontFamily,
            borderRadius,
            fonts,
            colors,
            cssOutput,
            saveCssConfig,
            resetConfig,
            copyConfig,
        };
    },
};
</script>

<style scoped>
.container {
    display: flex;
    gap: 20px;
}

.config {
    width: 50%;
}

.code-area {
    flex: 1;
}

.input-group {
    display: flex;
    gap: 5px;
    /* Fügt gleichmäßigen Abstand zwischen Label und Eingabeelement hinzu */
    margin-bottom: 1rem;
    /* Fügt Abstand zwischen den Gruppen hinzu */
}

.input-group-2 {
    display: flex;
    flex-direction: column;
    /* Richtet die Elemente vertikal aus */
    gap: 5px;
    /* Fügt gleichmäßigen Abstand zwischen den Elementen hinzu */
    margin-bottom: 1rem;
    /* Fügt Abstand zwischen den Gruppen hinzu */
}

.input-group label {
    font-weight: 500;
    /* Optional: Einheitliche Schriftstärke für Labels */
}
</style>