<script lang="ts">
export default {
  name: "PrintTable",
}
</script>

<template>
  <v-btn density="compact" :disabled="!pageTable" class="d-inline mx-2" color="primary" @click="printTable">
    <v-icon>mdi-printer</v-icon>
    {{ t('components.DataTable.print') }}
  </v-btn>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  pageTable: HTMLElement | null,
}>();

function printTable(){
  if(!props.pageTable) return;
  const printContents = props.pageTable.outerHTML;
  const originalHead = document.head.innerHTML;
  const srcDoc = `
    <html>
      <head>
        ${originalHead}
        <style>
          @page {
            size: A4;
            margin: 0;
          }
          @media print {
            html, body {
              width: 210mm;
              height: 297mm;
            }
          }
        </style>
      </head>
      <body>
        ${printContents}
      </body>
    </html>
  `;
  const hiddenFrame = document.createElement('iframe');
  hiddenFrame.style.display = 'none';
  hiddenFrame.srcdoc = srcDoc;
  hiddenFrame.onload = () => {
    hiddenFrame.contentWindow?.print();
  };
  hiddenFrame.style.position = "fixed";
  hiddenFrame.style.right = "0";
  hiddenFrame.style.bottom = "0";
  hiddenFrame.style.width = "0";
  hiddenFrame.style.height = "0";
  hiddenFrame.style.border = "none";
  document.body.appendChild(hiddenFrame);
}
</script>