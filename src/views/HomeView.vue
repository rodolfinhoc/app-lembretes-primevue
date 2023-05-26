<template>
  <div>
    <HeaderComponent />
    <ProgressBar v-if="isLoading" mode="indeterminate" style="height: 6px; margin: 12px;" />
    <div class="grid">
        <div class="sm:col-12 md:col-12 lg:col-12 xl:col-12 w-100">
          <InputText type="text" v-model="searchTerm" placeholder="🔍 Filtrar por título ou descrição" />
        </div>
      </div>
    <div class="grid p-grid" v-if="!isLoading && filteredLembretes.length > 0">
      <div v-for="lembrete in filteredLembretes" :key="lembrete.codigo" class="sm:col-12 md:col-4 lg:col-4 xl:col-4">
        <div class="custom-card p-card">
          <div class="p-card-header">
            <div class="card-title">
              {{ lembrete.titulo }}
            </div>
            <Button icon="pi pi-trash" class="p-button-icon-only" @click="confirmarExcluir(lembrete.codigo)" />
          </div>
          <div class="p-card-body">
            <p>{{ lembrete.descricao }}</p>
          </div>
          <div class="p-card-footer">
            <p>Data: {{ lembrete.data }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="!isLoading && filteredLembretes.length == 0" class="no-lembretes-message">
      <p>Nenhum lembrete cadastrado.</p>
    </div>
    <div class="fab-button">
      <Button icon="pi pi-plus" class="p-button-rounded p-button-primary" @click="openDialogLembrete()" />
    </div>
  </div>

  <DynamicDialog />
  <ConfirmDialog />
  <Toast :position="'bottom-center'" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import ApiService from '@/services/ApiService';
import { useDialog } from 'primevue/usedialog';
import InsertLembreteComponent from '@/components/dialogs/InsertLembreteComponent.vue';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from "primevue/useconfirm";

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
    const toast = useToast();
    const confirm = useConfirm();
    const lembretes = ref<any[]>([]);
    const codigoUsuario = localStorage.getItem('codigoUsuario') ?? '';
    const apiService = new ApiService();

    const openDialogLembrete = async () => {
      dialog.open(InsertLembreteComponent, {
        props: {
          header: 'Inserir Lembrete',
          modal: true,
          dismissableMask: false,
          draggable: false,
          maximizable: true,
          style: {
            width: '70vw',
          },
        },
        onClose(options: any) {
          if(options.data === 200) {
            toast.add({ severity: 'success', summary: 'Sucesso!', detail: 'Lembrete inserido com sucesso', life: 3000 });
            fetchLembretes();
          }
        }
      });
    };

    const confirmarExcluir = async (codigoLembrete: number) => {
      confirm.require({
          message: 'Deseja excluir o lembrete?',
          header: 'Confirmar Exclusão',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            excluirLembrete(codigoLembrete)
          },
          reject: () => {
          }
      });
    };

    //Função para filtrar lembretes
    const filteredLembretes = computed(() => {
      if (searchTerm.value.trim() === '') {
        return lembretes.value;
      } else {
        const term = searchTerm.value.trim().toLowerCase();
        return lembretes.value.filter(lembrete =>
          lembrete.titulo.toLowerCase().includes(term) ||
          lembrete.descricao.toLowerCase().includes(term)
        );
      }
    });
    
    // Função para buscar os lembretes do usuário
    const fetchLembretes = async () => {
      isLoading.value = true;

        await apiService.getAllLembretes(codigoUsuario)
        .then((response: any) => {
          console.log(response);
          // Lembrete carregado com sucesso
          if(response.status === 200){
            lembretes.value = response.data.lembretes;
          }
        })
        .catch((error: any) => {
          toast.add({ severity: 'error', summary: 'Erro!', detail: 'Erro ao obter lembretes:' + error, life: 3000 });
        });
      isLoading.value = false;
    };

    const excluirLembrete = async (codigoLembrete: number) => {
      isLoadingModal.value = true;
      await apiService.deleteLembretes(codigoUsuario, codigoLembrete)
        .then((response: any) => {
          // Lembrete excluído com sucesso
          if (response.status === 200) {
            toast.add({ severity: 'success', summary: 'Sucesso!', detail: response.data.message, life: 3000 });
            fetchLembretes();
          }
        })
        .catch((error: any) => {
          toast.add({ severity: 'error', summary: 'Erro!', detail: 'Erro ao excluir lembretes:' + error, life: 3000 });
        });

      isLoadingModal.value = false;
    };

    onMounted(() => {
      fetchLembretes();
    });

    return {
      isLoading,
      lembretes,
      searchTerm,
      isLoadingModal,
      openDialogLembrete,
      filteredLembretes,
      excluirLembrete,
      confirmarExcluir
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

.p-inputtext {
  width: 100%;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #14b8a6;
  color: #ffffff;
}

.card-title {
  flex: auto;
  margin-left: 48px;
}

.p-card-body {
  padding: 1rem;
  text-align: center;
}

.p-card-footer {
  padding: 0px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #e2e2e2;
  color: #495057;
}

.fab-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
}
</style>
