<template>
  <Navbar>
    <b-overlay :show="showTable" rounded="sm">
      <Table :items="this.coinsData" v-if="!showTable" :key="tableKey" />
    </b-overlay>
  </Navbar>
</template>

<script>
import Table from "@/components/common/Table.vue";
import priceDataProvider from "@/services/prices";
import Navbar from "../../components/layout/Navbar.vue";
export default {
  components: { Table, Navbar },
  data() {
    return {
      coinsData: [],
      currencies: ["btc", "eth", "bnb", "doge"],
      dstCurrency: 1, //1 => rls 0 => usdt
      showTable: false,
      killGetPrice: null,
      tableKey:0
    };
  },
  computed: {
    currentDstCurrency() {
      if (this.dstCurrency === 1) {
        return "rls";
      } else {
        return "usdt";
      }
    },
  },
  methods: {
    getEachCoinData(payload) {
      this.showTable = true;
      priceDataProvider
        .getCoinDetail(payload)
        .then((res) => {
          this.seprateKeyValue(res.data.stats);
        })
        .then(() => {
            this.mostChangeInDay(this.coinsData);
        })
        .then(() => {
          setTimeout(() => {
            this.showTable = false;
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    seprateKeyValue(payload) {
      this.coinsData = Object.values(payload);
      for (let i = 0; i < this.coinsData.length; i++) {
        this.coinsData[i].symbol = Object.keys(payload)[i].slice(0, -4);
      }
    },
    mostChangeInDay(payload) {
      let temp = [];
      let maximum = 0;
      temp = payload.map((item) => Number(item.dayChange));
      maximum = Math.max(...temp);
      payload.find((e) => Number(e.dayChange) === maximum).higherChange = true;
    },
  },
  beforeMount() {
    this.showTable = true;
    this.getEachCoinData({
      srcCurrency: this.currencies.toString(),
      dstCurrency: "rls",
    });
  },
  mounted() {
    this.killGetPrice = setInterval(() => {
      this.getEachCoinData({
        srcCurrency: this.currencies.toString(),
        dstCurrency: this.currentDstCurrency,
      });
    }, 30000);
  },
  beforeDestroy() {
    clearInterval(this.killGetPrice);
  },
};
</script>

<style></style>
