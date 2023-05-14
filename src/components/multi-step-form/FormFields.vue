<script lang="ts">
export default {
  name: 'FormFields',
}
</script>

<template>
  <div>
    <div class="py-10 fields-grid">
      <label 
        v-for="field in fields" 
        :key="field.key" 
        class="d-flex pa-2 rounded-lg position-relative" 
        :class="{'border-error': field.hasError}"
        >
        <small class="bg-info pa-1 rounded-sm position-absolute tooltip">{{ field.helpText }}</small>
        <span class="px-2 font-weight-bold">
          {{ field.label }}
          <sup v-if="field.required" class="text-error">*</sup>
          :
        </span>
        <FormInput
          :field="field"
          @updateField="(update) => emit('updateField', update)"
          ></FormInput>
          <v-spacer></v-spacer>
          <v-icon v-if="field.hasError" color="error">mdi-alert-circle-outline</v-icon>
      </label>
    </div>

    <div class="my-10 py-10"></div>

    <v-expand-transition>
      <ol v-if="!!errors?.length" class="bg-error pa-4 my-4 rounded-lg elevation-4">
        <h3 class="no-user-select no-pointer-events">Errors: </h3>
        <hr class="mb-1">
        <TransitionGroup name="list">
          <li v-for="error in errors" :key="error" class="mx-4">{{ error }}</li>
        </TransitionGroup>
      </ol>
    </v-expand-transition>
  </div>
</template>

<script setup lang="ts">
import { toRefs} from 'vue'
import { InputField } from '../../types/InputField.type'
import FormInput from './FormInput.vue'

type Props = {
  fields: InputField[],
  errors: string[]
}

const props = defineProps<Props>()

const { fields, errors } = toRefs(props)

const emit = defineEmits<{
  (event: 'updateField', update: { key: string; value: any }): void
}>()

</script>

<style scoped>
.tooltip{
  top: 0;
  left: 0;
  opacity: 0;
  transform: translate(0, -50%);
  transition: transform 0.2s ease-in-out;
}

label:hover .tooltip{
  opacity: 0.8;
  transform: translate(0, -120%);
}

.fields-grid{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
}
</style>