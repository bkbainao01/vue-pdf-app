<template>
  <div class="p-4">
    <h2>Create PDF (Selectable Text)</h2>
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

function generatePdf() {
  var docDefinition = {
  content: [
    {
      layout: 'grid', // optional
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        widths: [ '*', 'auto', 100, '*' ],

        body: [
          [ 'First', 'Second', 'Third', 'The last one' ],
          [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
          [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
        ]
      }
    }
  ]
};


  pdfMake.createPdf(docDefinition).download();
}
</script>
