<template>
    <div class="register">
        <LittleCard>
            <template #title>
                <div class="card-title">
                    <h2>Définir un mot de passe</h2>
                </div>
            </template>

            <template #content>
                <div class="card-content">
                    <form id="form" @submit.prevent="handleSubmit">
                        <IconWithInput
                        v-model="password"
                        :field-type="InputFieldType.Password"
                        placeholder="Mot de passe"
                        icon-name="mingcute:lock-line"
                        />
                        <IconWithInput
                        v-model="confirm"
                        :field-type="InputFieldType.Password"
                        placeholder="Confirmation"
                        icon-name="mingcute:lock-line"
                        />
                    </form>
                </div>
            </template>

            <template #footer>
                <div class="card-footer">
                    <CTAButton form="form" label="Créer mon compte"/>
                </div>
            </template>
        </LittleCard>
    </div>
</template>

<script setup lang="ts">
import { InputFieldType } from '@/types/InputFieldType'

const emit = defineEmits(['submit-form'])

const password = ref('')
const confirm = ref('')

async function handleSubmit() {
    if (password.value !== confirm.value) {
        alert('Les mots de passe ne correspondent pas.')
        return
    }

    emit('submit-form', { password: password.value })
}
</script>

<style scoped lang="scss">

@use "@/components/register/register.scss";

</style>
