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
import priceDataProvider from "@/services/prices";
import Navbar from "@/components/layout/Navbar.vue";
export default {
  components: { Table, Navbar },
  data() {
    return {
      coinsData: [],
      rls: [],
      usdt: [],
      tableData: [],
      currencies: ["btc", "eth", "bnb", "doge"],
      dstCurrency: 1, //1 => rls 0 => usdt
      showTable: false,
      killGetPrice: null,
      tableKey: 0,
    };
  },
  methods: {
    getEachCoinData(payload) {
      this.showTable = true;
      priceDataProvider
        .getCoinDetail(payload)
        .then((res) => {
          this.seprateDst(res.data.stats);
        })
        .then(() => {
          this.dstCurrency === 1
            ? (this.tableData = this.rls)
            : (this.tableData = this.usdt);
          this.mostChangeInDay(this.tableData);
        })
        .then(() => {
          setTimeout(() => {
            this.showTable = false;
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    seprateKeyValue(payload, count) {
      for (let i = 0; i < this.coinsData.length; i++) {
        this.coinsData[i].symbol = Object.keys(payload)[i].slice(0, count);
      }
    },
    seprateDst(payload) {
      this.usdt = [];
      this.rls = [];
      let objLength = Object.keys(payload).length;
      for (let j = 0; j < objLength; j++) {
        if (this.evenOrOdd(j) === 0) {
          this.rls.push(Object.values(payload)[j]);
          this.rls[this.rls.length - 1].symbol = Object.keys(payload)[j].slice(
            0,
            -4
          );
        } else {
          this.usdt.push(Object.values(payload)[j]);
          this.usdt[this.usdt.length - 1].symbol = Object.keys(payload)[
            j
          ].slice(0, -5);
        }
      }
    },
    evenOrOdd(payload) {
      return payload % 2;
    },
    mostChangeInDay(payload) {
      let temp = [];
      let maximum = 0;
      temp = payload.map((item) => Number(item.dayChange));
      maximum = Math.max(...temp);
      payload.find((e) => Number(e.dayChange) === maximum).higherChange = true;
    },
    changeDstCurrency(payload) {
      this.dstCurrency = payload;
      this.showTable = true;
      this.dstCurrency == 1
        ? (this.tableData = this.rls)
        : (this.tableData = this.usdt);
      this.mostChangeInDay(this.tableData);
      setTimeout(() => {
        this.showTable = false;
      }, 250);
    },
    keepUpdate() {
      let temp = this.dstCurrency === 1 ? -4 : -5;
      this.killGetPrice = setInterval(() => {
        this.getEachCoinData(
          {
            srcCurrency: this.currencies.toString(),
            dstCurrency: "rls,usdt",
          },
          temp
        );
      }, 30000);
    },
  },
  beforeMount() {
    this.showTable = true;
    this.getEachCoinData({
      srcCurrency: this.currencies.toString(),
      dstCurrency: "rls,usdt",
    });
  },
  mounted() {
    this.keepUpdate();
  },
  beforeDestroy() {
    clearInterval(this.killGetPrice);
  },
};
</script>

<style></style>
