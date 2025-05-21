<template>
    <div class="form-input">
        <div class="icon-box">
            <Icon :name="iconName" :size="computedIconSize" style="color: black" />
        </div>
        <input
            v-model="modelValue"
            :type="computedFieldType"
            :placeholder="placeholder"
            required
        >
    </div>
</template>

<script lang="ts" setup>
import { InputFieldType } from '@/types/InputFieldType'

const props = defineProps<{
    fieldType?: InputFieldType
    placeholder: string
    iconName: string
    iconSize?: string
}>()

const computedIconSize = props.iconSize ?? '2em'
const computedFieldType = props.fieldType ?? InputFieldType.Text

const modelValue = defineModel<string>()
</script>

<style scoped lang="scss">
.form-input {
    display: flex;
    flex-direction: row;
    justify-content: center;
    
    margin-bottom: 0.5rem;
    gap: 0.5rem;

    width: 100%;
    height: 3rem;

    .icon-box {
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        aspect-ratio: 1;
    }

    input {
        width: 100%;
        border-radius: 0.5rem;
        border: none;
        background-color: white;
        color: $primary-color;
        padding: 1rem;
    }
}
</style>
