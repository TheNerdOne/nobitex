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
          <Table :items="this.coinsData" v-if="!showTable" :key="tableKey" />
        </div>
      </div>
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
      tableKey: 0,
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
    getEachCoinData(payload, sliceCount) {
      this.showTable = true;
      priceDataProvider
        .getCoinDetail(payload)
        .then((res) => {
          this.seprateKeyValue(res.data.stats, sliceCount);
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
    seprateKeyValue(payload, count) {
      this.coinsData = Object.values(payload);
      for (let i = 0; i < this.coinsData.length; i++) {
        this.coinsData[i].symbol = Object.keys(payload)[i].slice(0, count);
      }
    },
    mostChangeInDay(payload) {
      let temp = [];
      let maximum = 0;
      temp = payload.map((item) => Number(item.dayChange));
      maximum = Math.max(...temp);
      payload.find((e) => Number(e.dayChange) === maximum).higherChange = true;
    },
    changeDstCurrency(payload) {
      // if (payload == "rls") {
      this.dstCurrency = payload;
      // } else {
      //   this.dstCurrency = 0;
      // }
      let temp = {
        srcCurrency: this.currencies.toString(),
        dstCurrency: this.currentDstCurrency,
      };
      this.getEachCoinData(temp, payload == 1 ? -4 : -5);
      clearInterval(this.killGetPrice);
      setTimeout(() => {
        this.keepUpdate();
      }, 250);
    },
    keepUpdate() {
      let temp = this.dstCurrency === 1 ? -4 : -5;
      this.killGetPrice = setInterval(() => {
        this.getEachCoinData(
          {
            srcCurrency: this.currencies.toString(),
            dstCurrency: this.currentDstCurrency,
          },
          temp
        );
      }, 30000);
    },
  },
  beforeMount() {
    this.showTable = true;
    this.getEachCoinData(
      {
        srcCurrency: this.currencies.toString(),
        dstCurrency: "rls",
      },
      -4
    );
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
