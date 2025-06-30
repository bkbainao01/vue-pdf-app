<template>
  <div class="p-4">
    <h2>Create PDF (Selectable Text)</h2>
    <div class="mb-4">
      <label>Name: <input v-model="form.name" class="border p-1" /></label><br />
      <label>Age: <input v-model="form.age" type="number" class="border p-1" /></label>
    </div>
    <button @click="generatePdf" class="bg-blue-500 text-white px-4 py-2 rounded">
      Download PDF
    </button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

// ✅ ใช้แบบนี้
pdfMake.vfs = pdfFonts.vfs
const form = reactive({
  name: '',
  age: ''
})

function generatePdf() {
  const longText = 'This is a very long text that should wrap properly so that the table does not break and all rows are displayed completely. It helps test the table rendering in pdfMake with proper line wrapping.';

  const docDefinition = {
    content: [
      {
        text: 'User Information',
        style: 'header',
        margin: [0, 0, 0, 0,  0]
      },
      {
        table: {
          headerRows: 1,
          widths: ['auto', '*'],
          body: [
            ['Field', 'Value'],
            ['Name', form.name],
            ['Age', form.age.toString()],
            ['Long Info', { text: longText, noWrap: false, margin: [0, 5, 0, 5] }]
            ['1+Long Info', { text: longText, noWrap: false, margin: [0, 5, 0, 5] }]
          ]
        },
        layout: 'lightHorizontalLines',
        dontBreakRows: true,
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true
      }
    }
  }

  pdfMake.createPdf(docDefinition).download();
}
</script>
