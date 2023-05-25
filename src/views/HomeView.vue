<template>
  <div>
    <HeaderComponent />
    <ProgressBar v-if="isLoading" mode="indeterminate" style="height: 6px; margin: 12px;" />
    <div class="grid p-grid" v-if="!isLoading">
      <div v-for="lembrete in lembretes" :key="lembrete.codigo" class="sm:col-12 md:col-6 lg:col-4 xl:col-4">
        <div class="p-card">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import axios from 'axios';

export default defineComponent({
  name: 'HomeView',
  components: {
    HeaderComponent,
  },
  setup() {
    const isLoading = ref(false);
    const searchTerm = ref("");
    const lembretes = ref<any[]>([]);

    // Função para buscar os lembretes do usuário
    const fetchLembretes = async () => {
      isLoading.value = true;
      const codigoUsuario = localStorage.getItem('codigoUsuario');
      const access_token = localStorage.getItem('access_token');

      try {
        const response = await axios.get(`http://127.0.0.1:5000/lembretes/${codigoUsuario}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        lembretes.value = response.data.lembretes;
      } catch (error) {
        console.error('Erro ao obter lembretes:', error);
      }

      isLoading.value = false;
    };

    onMounted(() => {
      fetchLembretes();
    });

    return {
      isLoading,
      lembretes,
      searchTerm
    };
  },
});
</script>

<style scoped lang="scss">
.grid {
  padding: 12px;
}

.p-card {
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.p-card-header {
  padding: 1rem;
  font-weight: bold;
  background-color: #f1f1f1;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.p-card-body {
  padding: 1rem;
  text-align: center;
}

.p-card-footer {
  padding: 1rem;
  background-color: #f1f1f1;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

</style>
