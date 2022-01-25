<template>
  <Navbar>
    <b-overlay :show="showTable" rounded="sm" class="mt-5">
      <div class="container">
        <div class="row">
          <div
            :class="`btn ${this.dstCurrency == 1 && 'btn-secondary '}rounded-0`"
            @click="changeDstCurrency(1)"
          >
            تومان IRT
          </div>
          <div
            :class="`btn ${this.dstCurrency == 0 && 'btn-secondary '}rounded-0`"
            @click="changeDstCurrency(0)"
          >
            تتر USDT
          </div>
        </div>
        <div class="row">
          <Table :items="this.tableData" v-if="!showTable" :key="tableKey" />
        </div>
      </div>
    </b-overlay>
  </Navbar>
</template>

<script>
import Table from "@/components/common/Table.vue";
import Navbar from "@/components/layout/Navbar.vue";
import {livePriceMixin} from '@/mixin/livePrice';

export default {
  components: { Table, Navbar },
  mixins:[livePriceMixin]
 
};
</script>

<style></style>
