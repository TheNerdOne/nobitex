<template>
  <Navbar>
    <Table :items="this.coinsData" />
  </Navbar>
</template>

<script>
import Table from "@/components/common/Table.vue";
import priceDataProvider from "@/services/prices";
import Navbar from '../../components/layout/Navbar.vue';
export default {
  components: { Table,Navbar },
  data() {
    return {
      coinsData: [],
      currencies: ["btc", "eth", "bnb", "doge"],
      dstCurrency: 1, //1 => rls 0 => usdt
    };
  },
  methods: {
    getEachCoinData(payload) {
      priceDataProvider
        .getCoinDetail(payload)
        .then((res) => {
          this.seprateKeyValue(res.data.stats);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    seprateKeyValue(payload) {
      this.coinsData = Object.values(payload);
      for (let i = 0; i < this.coinsData.length; i++) {
        this.coinsData[i].symbol = Object.keys(payload)[i].slice(0,-4);
      }
    },
  },
  beforeMount() {
    let temp
    temp = this.dstCurrency === 1 ? 'rls' : 'usdt'
    this.getEachCoinData({
      srcCurrency: this.currencies.toString(),
      dstCurrency: temp,
    });
  },
};
</script>

<style></style>
