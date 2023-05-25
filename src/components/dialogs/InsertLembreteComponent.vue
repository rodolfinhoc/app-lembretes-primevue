<template>
  <div>
    <h3>{{ header }}</h3>
    <div class="p-fluid">
      <div class="p-field">
        <label for="titulo">Título:</label>
        <InputText v-model="titulo"/>
      </div>
      <div class="p-field">
        <label for="descricao">Descrição:</label>
        <Textarea v-model="descricao"/>
      </div>
      <div class="p-field">
        <label for="data">Data:</label>
        <Calendar v-model="data" dateFormat="dd/mm/yy" touchUI />
      </div>
    </div>
    <div class="p-d-flex p-jc-between">
      <Button label="Salvar" @click="salvarLembrete" :disabled="isSalvarDisabled" />
    </div>
  </div>
  <Toast :position="'bottom-center'" />
</template>

  <script lang="ts">
  import ApiService from '@/services/ApiService';
import { computed, defineComponent, inject, ref } from 'vue';

  export default defineComponent({
    name: 'InsertLembreteComponent',
    props: {
      header: String,
    },
    setup(){
      const dialogRef = inject('dialogRef') as any;
      const titulo = ref('');
      const descricao = ref('');
      const data = ref('');
      const apiService = new ApiService();

      const isSalvarDisabled = computed(() => {
        return !titulo.value || !descricao.value || !data.value;
      });
      
      const closeDialog = (data?: any) => {
        dialogRef.value.close(data);
      };

      const salvarLembrete = async () => {
      const codigoUsuario = localStorage.getItem('codigoUsuario');
      const lembreteForm = {
        codigoUsuario,
        titulo: titulo.value,
        descricao: descricao.value,
        data: data.value,
      };

      // Faz o post na API      
      await apiService.postLembretes(lembreteForm)
        .then((response: any) => {
          // Lembrete salvo com sucesso
          if(response.status === 200){
            closeDialog(response.data);
          }
        })
        .catch((error: any) => {
          console.error('Erro ao salvar lembrete:', error);
        });
    };

      const responsiveOptions = ref([
          {
              breakpoint: '991px',
              numVisible: 4
          },
          {
              breakpoint: '767px',
              numVisible: 3
          },
          {
              breakpoint: '575px',
              numVisible: 1
          }
      ]);
      return {
        responsiveOptions,
        titulo,
        descricao,
        data,
        isSalvarDisabled,
        closeDialog,
        salvarLembrete,
      }
    },
  });
  </script>
  
  <style scoped lang="scss">
  .p-d-flex{
    margin-top: 18px;
  }
  .p-button{
    width: 100%;
  }
  .p-field {
    padding: 5px;
  }
  </style>

  