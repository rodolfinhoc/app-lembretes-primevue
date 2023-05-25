<template>
  <div>
    <HeaderComponent />
    <ProgressBar v-if="isLoading" mode="indeterminate" style="height: 6px; margin: 12px;" />
    <div class="grid p-grid" v-if="!isLoading">
      <div v-for="lembrete in lembretes" :key="lembrete.codigo" class="sm:col-12 md:col-4 lg:col-4 xl:col-4">
        <div class="custom-card p-card">
          <div class="p-card-header">
            {{ lembrete.titulo }}
          </div>
          <div class="p-card-body">
            <p>{{ lembrete.descricao }}</p>
            <p>Data: {{ lembrete.data }}</p>
          </div>
          <div class="p-card-footer">
            <p>Criado em: {{ lembrete.criadoEm }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="fab-button">
      <Button icon="pi pi-plus" class="p-button-rounded p-button-primary" @click="openModalInsertLembrete()" />
    </div>
  </div>

  <DynamicDialog/>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import ApiService from '@/services/ApiService';
import { useDialog } from 'primevue/usedialog';
import InsertLembreteComponent from '@/components/dialogs/InsertLembreteComponent.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    HeaderComponent,
    InsertLembreteComponent
  },
  setup() {
    const isLoading = ref(false);
    const isLoadingModal = ref(false);
    const searchTerm = ref("");
    const dialog = useDialog();
    const lembretes = ref<any[]>([]);
    const apiService = new ApiService();

    // Função para buscar os lembretes do usuário
    const fetchLembretes = async () => {
      isLoading.value = true;
      const codigoUsuario = localStorage.getItem('codigoUsuario') ?? '';

        await apiService.getAllLembretes(codigoUsuario)
        .then((response: any) => {
          // Lembrete carregado com sucesso
          if(response.data === 200){
            lembretes.value = response.data.lembretes;
          }
        })
        .catch((error: any) => {
        console.error('Erro ao obter lembretes:', error);
        });
      isLoading.value = false;
    };

    const openModalInsertLembrete = async () => {
      dialog.open(InsertLembreteComponent, {
        props: {
          header: 'Inserir Lembrete',
          contentClass: 'modal',
          modal: true,
          dismissableMask: false,
          draggable: false,
          // maximizable: true,
          style: {
            width: '70vw',
          },
        },
      });
    };
    
    onMounted(() => {
      fetchLembretes();
    });

    return {
      isLoading,
      lembretes,
      searchTerm,
      isLoadingModal,
      openModalInsertLembrete
    };
  },
});
</script>

<style scoped lang="scss">
@media only screen and (max-width: 600px) {
  .sm\:col-12,
  .md\:col-6,
  .lg\:col-4,
  .xl\:col-4 {
    width: 100%;
    margin-right: 0;
    margin: 8px;
  }
}
.grid {
  padding: 12px;
}

.custom-card {
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
  transition: background-color 0.3s ease;
}

.custom-card:hover {
  background-color: #f1f1f1;
}

.p-card-header {
  padding: 1rem;
  font-weight: bold;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #14B8A6;
  color: #ffffff;
}

.p-card-body {
  padding: 1rem;
  text-align: center;
}

.p-card-footer {
  padding: 0px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #14B8A6;
  color: #ffffff;
}

.fab-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
}

</style>
